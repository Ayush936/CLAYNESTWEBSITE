# 🚀 PRODUCTION DEPLOYMENT FIX - VERCEL & BACKEND

---

## 🔴 THE PROBLEM

Your website shows **404: NOT_FOUND** on Vercel because:

1. ❌ Backend API is not deployed
2. ❌ Frontend doesn't know where backend is
3. ❌ Environment variables not configured for production
4. ❌ CORS issues with cross-domain requests

---

## ✅ THE SOLUTION

### Step 1: Deploy Backend to Production

You need to deploy your backend to a server. Options:

#### **Option A: Heroku (Easiest & Free)**
1. Create account: https://www.heroku.com
2. Install Heroku CLI
3. Run these commands:
```bash
cd frontend/backend
heroku login
heroku create claynest-api
git push heroku main
```
4. Get your backend URL: `https://claynest-api.herokuapp.com`

#### **Option B: Railway (Recommended)**
1. Create account: https://railway.app
2. Connect GitHub repository
3. Select `frontend/backend` folder
4. Deploy
5. Get your backend URL from Railway dashboard

#### **Option C: DigitalOcean/AWS**
Deploy `frontend/backend` to any VPS:
- Configure server
- Install Node.js & MySQL
- Set environment variables
- Start with: `NODE_ENV=production npm start`

### Step 2: Update Environment Variables

Once you have your backend URL, update Vercel environment:

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   ```
   REACT_APP_API_URL=https://your-backend-url
   ```
   Example: `https://claynest-api.herokuapp.com/api`

5. Redeploy on Vercel

---

## 📋 COMPLETE SETUP

### For Vercel (Frontend)

#### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "env": {
    "REACT_APP_API_URL": "@react_app_api_url"
  }
}
```

#### Environment Variables on Vercel Dashboard
```
REACT_APP_API_URL = https://your-backend-domain.com/api
```

### For Backend Deployment

#### .env.production
```dotenv
NODE_ENV=production
PORT=5000
DB_HOST=your-database-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=claynest
DB_PORT=3306
JWT_SECRET=your-secret-key
FRONTEND_URL=https://claynestwebsite.vercel.app
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
```

---

## 🔧 FRONTEND FILES (Already Updated)

### `frontend/.env`
```dotenv
REACT_APP_API_URL=http://localhost:5000/api
```

### `frontend/.env.production`
```dotenv
REACT_APP_API_URL=/api
```

### `frontend/src/api/api.js`
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

---

## 📚 FULL DEPLOYMENT GUIDE

### Phase 1: Test Locally (Already Done ✅)
```bash
# Terminal 1
cd frontend/backend && npm run dev

# Terminal 2
cd frontend && npm start
```

### Phase 2: Build for Production

```bash
cd frontend
npm run build
```

This creates `frontend/build/` folder with optimized files.

### Phase 3: Deploy Backend

**Choose one:**
- Heroku: `git push heroku main`
- Railway: Connect GitHub → Deploy
- VPS: Upload files → `npm install` → `npm start`

### Phase 4: Deploy Frontend to Vercel

**Option 1: Via GitHub (Recommended)**
1. Your code is on GitHub
2. Vercel auto-deploys on every push
3. Just update environment variables

**Option 2: Via Vercel CLI**
```bash
npm i -g vercel
cd frontend
vercel --prod
```

---

## 🎯 WHAT TO DO NOW

### Immediate Steps:

1. **Choose backend hosting:**
   - Heroku (easiest)
   - Railway (recommended)
   - Your own server

2. **Deploy backend** to get URL like:
   ```
   https://claynest-api.herokuapp.com
   ```

3. **Update Vercel environment:**
   - Go to Vercel dashboard
   - Add: `REACT_APP_API_URL=https://your-backend-url/api`

4. **Trigger redeploy:**
   - Vercel auto-redeploys
   - Or click "Redeploy" button

5. **Test website:**
   - Visit: https://claynestwebsite.vercel.app
   - Should work now ✅

---

## 🆘 TROUBLESHOOTING

### Still Getting 404?
- ✅ Check backend is running
- ✅ Check REACT_APP_API_URL environment variable
- ✅ Check backend CORS is configured
- ✅ Check database is connected

### API Calls Failing?
- Check console (F12) for actual error
- Verify backend URL is correct
- Check CORS headers from backend

### Database Connection Error?
- Verify database credentials in `.env.production`
- Ensure database is accessible
- Check firewall/security groups

---

## 📊 DEPLOYMENT CHECKLIST

- [ ] Backend deployed (Heroku/Railway/VPS)
- [ ] Backend URL obtained
- [ ] Vercel environment updated with REACT_APP_API_URL
- [ ] Frontend redeployed on Vercel
- [ ] Website loads without 404
- [ ] API calls working
- [ ] Database connected
- [ ] All features functional

---

## 🌐 FINAL URLS

After deployment, you'll have:

```
Frontend: https://claynestwebsite.vercel.app
Backend: https://your-backend-url (e.g., Heroku)
API: https://your-backend-url/api
Health Check: https://your-backend-url/api/health
```

---

## 📞 QUICK REFERENCE

| Component | Development | Production |
|-----------|-------------|-----------|
| Frontend | localhost:3000 | vercel.app |
| Backend | localhost:5000 | your-backend-url |
| Database | local MySQL | managed DB |
| API URL | /api | /api or proxy |

---

## ✨ NEXT STEP

**Choose your backend hosting and deploy!**

Once you have your backend URL, send it and I'll update everything automatically.

---

**Status:** Ready for production deployment 🚀
