# Deployment Guide: Render (Backend) + Vercel (Frontend)

## Table of Contents
1. [Backend Deployment on Render](#backend-deployment-on-render)
2. [Frontend Deployment on Vercel](#frontend-deployment-on-vercel)
3. [Environment Variables Setup](#environment-variables-setup)
4. [Post-Deployment Testing](#post-deployment-testing)

---

## Backend Deployment on Render

### Prerequisites
- [Render Account](https://render.com) (free tier available)
- GitHub repository with your code pushed
- PostgreSQL database (can use Render's PostgreSQL or Neon)

### Step 1: Prepare Your Backend

1. **Ensure your backend can start on a dynamic port:**
   ```bash
   # In your backend, make sure it reads PORT from environment
   # Currently set to default port 5000 in env.ts
   ```

2. **Make sure your `dist` folder is in `.gitignore` (it should be built during deployment)**

3. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2: Create a Render Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Fill in the following details:

   | Field | Value |
   |-------|-------|
   | **Name** | `hospeon-backend` (or your choice) |
   | **Environment** | `Node` |
   | **Region** | Choose closest to your users |
   | **Branch** | `main` (or your default branch) |
   | **Build Command** | `cd apps/backend && npm install && npm run build` |
   | **Start Command** | `cd apps/backend && npm start` |

5. Click **Advanced** and add the following:

   | Field | Value |
   |-------|-------|
   | **Auto-deploy** | Toggle ON |
   | **Instance Type** | Starter (free tier) or paid based on needs |

### Step 3: Set Environment Variables on Render

1. In the Render dashboard for your service, go to **Environment**
2. Add the following variables:

   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
   JWT_SECRET=[generate a strong random string]
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=https://your-vercel-frontend-url.vercel.app
   ```

   **How to generate JWT_SECRET:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Step 4: Set Up Database

**Option A: Use Neon PostgreSQL (Recommended)**
1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project
3. Copy the connection string and add it as `DATABASE_URL` on Render

**Option B: Use Render PostgreSQL**
1. In Render dashboard, click **New +** → **PostgreSQL**
2. Fill in details:
   - **Name**: `hospeon-db`
   - **Region**: Same as backend service
   - **PostgreSQL Version**: 15
3. Copy the connection string and add as `DATABASE_URL` on Render

### Step 5: Run Database Migrations

After deployment, run Prisma migrations:

1. Connect via SSH in Render dashboard, or
2. Run this command in your local terminal:
   ```bash
   DATABASE_URL="your_render_db_url" npx prisma migrate deploy
   ```

### Step 6: Verify Backend Deployment

Once deployed, visit: `https://hospeon-backend-xxxxx.onrender.com/api/v1/health` (adjust URL based on Render's assignment)

---

## Frontend Deployment on Vercel

### Prerequisites
- [Vercel Account](https://vercel.com) (free tier available)
- GitHub repository with your code pushed

### Step 1: Prepare Your Frontend

Your Vite config should already be set up correctly. Just ensure:

1. **Environment variables in frontend:**
   Create a `.env.production` file (or set in Vercel dashboard):
   ```
   VITE_API_BASE_URL=https://your-render-backend-url/api/v1
   VITE_SOCKET_URL=https://your-render-backend-url
   ```

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare frontend for Vercel deployment"
   git push origin main
   ```

### Step 2: Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Select the repository and click **Import**

### Step 3: Configure Build Settings

Vercel should auto-detect, but verify:

| Field | Value |
|-------|-------|
| **Framework** | `Vite` |
| **Root Directory** | `./apps/frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### Step 4: Add Environment Variables

In Vercel project settings → **Environment Variables**:

```
VITE_API_BASE_URL=https://your-render-backend-url/api/v1
VITE_SOCKET_URL=https://your-render-backend-url
```

These will be used during the build process.

### Step 5: Update Backend CORS

Once you have your Vercel frontend URL, update your backend:

1. On Render dashboard, go to Environment Variables
2. Update `CORS_ORIGIN` to your Vercel frontend URL:
   ```
   CORS_ORIGIN=https://your-project-name.vercel.app
   ```

### Step 6: Verify Frontend Deployment

Your frontend will be automatically deployed at: `https://your-project-name.vercel.app`

---

## Environment Variables Setup

### Backend Environment Variables (Render)

```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_generated_secret_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

### Frontend Environment Variables (Vercel)

```
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api/v1
VITE_SOCKET_URL=https://your-backend-url.onrender.com
```

---

## Post-Deployment Testing

### 1. Test Backend Health
```bash
curl https://your-render-backend-url/api/v1/health
```

### 2. Test Authentication Flow
- Register a new user from frontend
- Verify JWT token is generated
- Test login functionality

### 3. Test CORS
The frontend should be able to call backend APIs without CORS errors.

### 4. Test Database Connection
Try any API that queries the database from your frontend.

### 5. Monitor Logs
- **Render Backend**: Dashboard → Logs
- **Vercel Frontend**: Dashboard → Deployments → Logs

---

## Troubleshooting

### Backend won't deploy
- Check build logs on Render
- Ensure `npm run build` works locally
- Verify all environment variables are set

### CORS errors
- Update `CORS_ORIGIN` in backend environment variables
- Restart the Render service

### Database connection errors
- Verify `DATABASE_URL` is correct
- Ensure database is running
- Check database credentials

### Frontend shows API errors
- Verify `VITE_API_BASE_URL` points to correct backend
- Check browser console for actual error messages
- Test backend is accessible from browser

---

## Cost Estimate (Free Tier)

| Service | Cost |
|---------|------|
| Render Backend | Free (web service) + paid DB |
| Render PostgreSQL | $7-15/month (or use Neon instead) |
| Vercel Frontend | Free |
| Neon PostgreSQL | Free tier available |

**Recommendation**: Use Neon for database to keep costs minimal.

---

## Next Steps

1. Set up both services
2. Run database migrations
3. Test all authentication flows
4. Set up monitoring/alerts
5. Configure custom domain (optional)
6. Set up CI/CD pipeline (optional)
