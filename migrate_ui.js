const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'scratch/magicpattern/src');
const destFrontendDir = path.join(process.cwd(), 'apps/frontend/src');

function fixImports(content) {
  return content
    // Replace imports from primitives
    .replace(/(?:['"])(?:\.\.\/)*components\/primitives\/(.*?)(?:['"])/g, "'@/components/ui/$1'")
    .replace(/(?:['"])(?:\.\/)*components\/primitives\/(.*?)(?:['"])/g, "'@/components/ui/$1'")
    // Replace imports from shell
    .replace(/(?:['"])(?:\.\.\/)*components\/shell\/(.*?)(?:['"])/g, "'@/components/layout/$1'")
    .replace(/(?:['"])(?:\.\/)*components\/shell\/(.*?)(?:['"])/g, "'@/components/layout/$1'")
    // Replace imports from charts
    .replace(/(?:['"])(?:\.\.\/)*components\/charts\/(.*?)(?:['"])/g, "'@/components/data-display/$1'")
    .replace(/(?:['"])(?:\.\/)*components\/charts\/(.*?)(?:['"])/g, "'@/components/data-display/$1'")
    // Replace imports from lib
    .replace(/(?:['"])(?:\.\.\/)*lib\/utils(?:['"])/g, "'@/lib/utils'")
    .replace(/(?:['"])(?:\.\/)*lib\/utils(?:['"])/g, "'@/lib/utils'");
}

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');
      content = fixImports(content);
      fs.writeFileSync(destPath, content);
    }
  }
}

// 1. Move primitives to ui
const primitivesSrc = path.join(srcDir, 'components/primitives');
if (fs.existsSync(primitivesSrc)) copyDirSync(primitivesSrc, path.join(destFrontendDir, 'components/ui'));

// 2. Move shell to layout
const shellSrc = path.join(srcDir, 'components/shell');
if (fs.existsSync(shellSrc)) copyDirSync(shellSrc, path.join(destFrontendDir, 'components/layout'));

// 3. Move charts to data-display
const chartsSrc = path.join(srcDir, 'components/charts');
if (fs.existsSync(chartsSrc)) copyDirSync(chartsSrc, path.join(destFrontendDir, 'components/data-display'));

// 4. Map pages to features
const pageMapping = {
  'AIAdminCopilot.tsx': 'dashboard',
  'AIAssistant.tsx': 'dashboard',
  'AIContentReview.tsx': 'dashboard',
  'AIPatientSummary.tsx': 'patients',
  'AIReportExplainer.tsx': 'reports',
  'AppointmentCalendar.tsx': 'appointments',
  'AppointmentReport.tsx': 'reports',
  'AuditLog.tsx': 'audit',
  'Auth.tsx': 'auth',
  'Billing.tsx': 'billing',
  'BranchesSettings.tsx': 'settings',
  'Consultation.tsx': 'consultations',
  'CreateInvoice.tsx': 'billing',
  'Dashboard.tsx': 'dashboard',
  'DayClosing.tsx': 'reports',
  'DischargeSummary.tsx': 'admissions',
  'DoctorDashboard.tsx': 'dashboard',
  'DoctorPerformanceReport.tsx': 'reports',
  'ExpiryAlerts.tsx': 'pharmacy',
  'FirstTimeSetup.tsx': 'auth',
  'FollowUps.tsx': 'consultations',
  'ForgotPassword.tsx': 'auth',
  'IPD.tsx': 'admissions',
  'Integrations.tsx': 'settings',
  'Lab.tsx': 'laboratory',
  'LabDashboard.tsx': 'dashboard',
  'MAR.tsx': 'admissions',
  'NewAdmission.tsx': 'admissions',
  'NewAppointment.tsx': 'appointments',
  'NursingStation.tsx': 'admissions',
  'OrganizationSettings.tsx': 'settings',
  'PatientNew.tsx': 'patients',
  'PatientProfile.tsx': 'patients',
  'Patients.tsx': 'patients',
  'Payments.tsx': 'billing',
  'Pharmacy.tsx': 'pharmacy',
  'PharmacyDashboard.tsx': 'dashboard',
  'PharmacyReport.tsx': 'reports',
  'PharmacySale.tsx': 'pharmacy',
  'Prescriptions.tsx': 'consultations',
  'PurchaseOrders.tsx': 'pharmacy',
  'Queue.tsx': 'queue',
  'QueueDisplay.tsx': 'queue',
  'Radiology.tsx': 'laboratory',
  'ReceptionDashboard.tsx': 'dashboard',
  'Refunds.tsx': 'billing',
  'Reports.tsx': 'reports',
  'ResultEntry.tsx': 'laboratory',
  'SampleCollection.tsx': 'laboratory',
  'Security.tsx': 'settings',
  'Settings.tsx': 'settings',
  'StockEntry.tsx': 'pharmacy',
  'Stub.tsx': 'dashboard',
  'Templates.tsx': 'consultations'
};

const pagesDir = path.join(srcDir, 'pages');
if (fs.existsSync(pagesDir)) {
  const pages = fs.readdirSync(pagesDir);
  for (let page of pages) {
    const feature = pageMapping[page] || 'dashboard';
    const featurePagesDir = path.join(destFrontendDir, 'features', feature, 'pages');
    if (!fs.existsSync(featurePagesDir)) fs.mkdirSync(featurePagesDir, { recursive: true });
    
    // Optional: Rename specific main pages to conform to Page suffix convention
    let newPageName = page;
    if (page === 'Auth.tsx') newPageName = 'AuthPage.tsx';
    if (page === 'Dashboard.tsx') newPageName = 'DashboardPage.tsx';
    if (page === 'Patients.tsx') newPageName = 'PatientsPage.tsx';
    if (page === 'Pharmacy.tsx') newPageName = 'PharmacyPage.tsx';
    if (page === 'Billing.tsx') newPageName = 'BillingPage.tsx';
    if (page === 'Lab.tsx') newPageName = 'LabPage.tsx';
    if (page === 'IPD.tsx') newPageName = 'IPDPage.tsx';
    
    let content = fs.readFileSync(path.join(pagesDir, page), 'utf8');
    content = fixImports(content);
    fs.writeFileSync(path.join(featurePagesDir, newPageName), content);
  }
}

// 5. Copy lib if exists
const libSrc = path.join(srcDir, 'lib');
const libDest = path.join(destFrontendDir, 'lib');
if (fs.existsSync(libSrc)) {
  if (!fs.existsSync(libDest)) fs.mkdirSync(libDest, { recursive: true });
  const entries = fs.readdirSync(libSrc, { withFileTypes: true });
  for (let entry of entries) {
    if (!entry.isDirectory()) {
      fs.copyFileSync(path.join(libSrc, entry.name), path.join(libDest, entry.name));
    }
  }
}

// 6. Copy Tailwind configuration
const tailwindSrc = path.join(process.cwd(), 'scratch/magicpattern/tailwind.config.js');
const tailwindDest = path.join(process.cwd(), 'apps/frontend/tailwind.config.js');
if (fs.existsSync(tailwindSrc)) {
  fs.copyFileSync(tailwindSrc, tailwindDest);
}

// 7. Update index.css
const cssSrc = path.join(srcDir, 'index.css');
const cssDest = path.join(destFrontendDir, 'assets/styles/index.css');
if (fs.existsSync(cssSrc)) {
  fs.copyFileSync(cssSrc, cssDest);
}

console.log('Migration complete!');
