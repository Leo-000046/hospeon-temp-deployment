$BASE = "http://localhost:5000/api/v1"
$pass = 0
$fail = 0

function Test-Case($name, $result, $expected, $body = $null) {
    if ($result -eq $expected) {
        Write-Host "  [PASS] $name" -ForegroundColor Green
        $script:pass++
    } else {
        Write-Host "  [FAIL] $name (got '$result', expected '$expected')" -ForegroundColor Red
        if ($body) { Write-Host "         Response: $(($body | ConvertTo-Json -Compress -Depth 2))" -ForegroundColor Yellow }
        $script:fail++
    }
}

function Invoke-API($method, $path, $body = $null, $token = $null, $timeoutSec = 20) {
    $headers = @{ "Content-Type" = "application/json" }
    if ($token) { $headers["Authorization"] = "Bearer $token" }
    try {
        $params = @{
            Uri        = "$BASE$path"
            Method     = $method
            Headers    = $headers
            TimeoutSec = $timeoutSec
        }
        if ($body) { $params["Body"] = ($body | ConvertTo-Json -Compress) }
        $r = Invoke-WebRequest @params -UseBasicParsing -ErrorAction Stop
        return @{ Status = [int]$r.StatusCode; Body = ($r.Content | ConvertFrom-Json) }
    }
    catch {
        $status = $null
        $content = $null
        if ($_.Exception.Response) {
            $status = [int]$_.Exception.Response.StatusCode
        }
        if ($_.ErrorDetails.Message) {
            try { $content = $_.ErrorDetails.Message | ConvertFrom-Json } catch {}
        }
        if (-not $content -and $_.Exception.Response) {
            try {
                $stream = $_.Exception.Response.GetResponseStream()
                $reader = New-Object System.IO.StreamReader($stream)
                $content = $reader.ReadToEnd() | ConvertFrom-Json
            } catch {}
        }
        return @{ Status = $status; Body = $content }
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  HOSPEON AUTH API TEST SUITE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# ── WARMUP ────────────────────────────────────────────────────────────────────
Write-Host "`n[WARMUP] Waking up Neon database..." -ForegroundColor DarkYellow
$warmup = Invoke-API "POST" "/auth/login" @{ email="admin@hospeon.com"; password="Admin@123" } $null 30
if ($warmup.Status -eq 200) {
    Write-Host "  [OK] Database is warm ($(($warmup.Body.data.user.email)))" -ForegroundColor DarkGreen
} elseif ($warmup.Status -eq 401) {
    Write-Host "  [OK] Database is warm (got expected 401)" -ForegroundColor DarkGreen
} else {
    Write-Host "  [WARN] Warmup returned status: $($warmup.Status) - retrying in 5s..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    $warmup = Invoke-API "POST" "/auth/login" @{ email="admin@hospeon.com"; password="Admin@123" } $null 30
}

# Unique timestamp for this test run
$ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$testEmail    = "qa_admin_$ts@hospeon.com"
$sqlEmail     = "qa_sql_$ts@hospeon.com"
$accessToken  = $null

# ── REGISTER ─────────────────────────────────────────────────────────────────
Write-Host "`n[POST] /auth/register" -ForegroundColor Magenta

$r = Invoke-API "POST" "/auth/register" @{ name="QA Admin"; email=$testEmail; password="Admin@123"; role="ADMIN" }
Test-Case "Register - Success (new user)" $r.Status 201 $r.Body

$r2 = Invoke-API "POST" "/auth/register" @{ name="Duplicate"; email="admin@hospeon.com"; password="Admin@123"; role="ADMIN" }
Test-Case "Register - Fail (duplicate email → 400)" $r2.Status 400 $r2.Body

$r3 = Invoke-API "POST" "/auth/register" @{ email="missing@hospeon.com" }
Test-Case "Register - Fail (missing name + password → 400)" $r3.Status 400 $r3.Body

$r4 = Invoke-API "POST" "/auth/register" @{ name="x"; email="not-an-email"; password="short"; role="ADMIN" }
Test-Case "Register - Fail (invalid email format → 400)" $r4.Status 400 $r4.Body

# SQL injection - uses unique email to avoid duplicate collision
$r5 = Invoke-API "POST" "/auth/register" @{ name="'; DROP TABLE users; --"; email=$sqlEmail; password="Admin@123"; role="ADMIN" }
Test-Case "Register - Security (SQL injection in name → stored safely, 201)" $r5.Status 201 $r5.Body

$r6 = Invoke-API "POST" "/auth/register" @{}
Test-Case "Register - Fail (empty body → 400)" $r6.Status 400 $r6.Body

# ── LOGIN ─────────────────────────────────────────────────────────────────────
Write-Host "`n[POST] /auth/login" -ForegroundColor Magenta

$rLogin = Invoke-API "POST" "/auth/login" @{ email="admin@hospeon.com"; password="Admin@123" }
Test-Case "Login - Success (200)" $rLogin.Status 200 $rLogin.Body

$accessToken = $rLogin.Body.data.accessToken
$jwtParts    = if ($accessToken) { ($accessToken -split "\.").Count } else { 0 }
Test-Case "Login - Token is valid JWT format (3 parts)" $jwtParts 3 $null

$rWrong = Invoke-API "POST" "/auth/login" @{ email="admin@hospeon.com"; password="WrongPassword!" }
Test-Case "Login - Fail (wrong password → 401)" $rWrong.Status 401 $rWrong.Body
Test-Case "Login - Generic error (prevents user enumeration)" $rWrong.Body.message "Invalid email or password" $null

$rGhost = Invoke-API "POST" "/auth/login" @{ email="ghost@hospeon.com"; password="Admin@123" }
Test-Case "Login - Fail (non-existent email → 401)" $rGhost.Status 401 $rGhost.Body

$rMissPwd = Invoke-API "POST" "/auth/login" @{ email="admin@hospeon.com" }
Test-Case "Login - Fail (missing password → 400)" $rMissPwd.Status 400 $rMissPwd.Body

$rEmpty = Invoke-API "POST" "/auth/login" @{}
Test-Case "Login - Fail (empty body → 400)" $rEmpty.Status 400 $rEmpty.Body

# ── GET ME ────────────────────────────────────────────────────────────────────
Write-Host "`n[GET] /auth/me" -ForegroundColor Magenta

$rMe = Invoke-API "GET" "/auth/me" $null $accessToken
Test-Case "Get Me - Success (valid token → 200)" $rMe.Status 200 $rMe.Body

$pwdExposed = $null -ne $rMe.Body.data.password
Test-Case "Get Me - Password NOT exposed in response" $pwdExposed $false $null

$rNoToken = Invoke-API "GET" "/auth/me"
Test-Case "Get Me - Fail (no token → 401)" $rNoToken.Status 401 $rNoToken.Body

$rBadToken = Invoke-API "GET" "/auth/me" $null "not.a.valid.token"
Test-Case "Get Me - Security (malformed token → 401)" $rBadToken.Status 401 $rBadToken.Body

$fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYWtlaWQiLCJyb2xlIjoiQURNSU4ifQ.FAKE_SIG"
$rFakeJwt  = Invoke-API "GET" "/auth/me" $null $fakeToken
Test-Case "Get Me - Security (forged JWT → 401)" $rFakeJwt.Status 401 $rFakeJwt.Body

# ── LOGOUT ────────────────────────────────────────────────────────────────────
Write-Host "`n[POST] /auth/logout" -ForegroundColor Magenta

$rLogout = Invoke-API "POST" "/auth/logout" $null $accessToken
Test-Case "Logout - Success (valid token → 200)" $rLogout.Status 200 $rLogout.Body

$rLogoutNoToken = Invoke-API "POST" "/auth/logout"
Test-Case "Logout - Fail (no token → 401)" $rLogoutNoToken.Status 401 $rLogoutNoToken.Body

# ── SUMMARY ───────────────────────────────────────────────────────────────────
$total = $pass + $fail
$color = if ($fail -eq 0) { "Green" } else { "Yellow" }
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  RESULTS: $pass/$total passed" -ForegroundColor $color
if ($fail -gt 0) { Write-Host "  $fail test(s) FAILED" -ForegroundColor Red }
Write-Host "========================================`n" -ForegroundColor Cyan
