# ⚡ QUICK START - 5 MINUTES TO RUNNING

## Prerequisites Installed?
- ✅ Node.js v14+
- ✅ npm v6+
- ✅ MySQL v5.7+

---

## 🚀 START NOW

### Step 1: Install Dependencies (2 min)

**Command Prompt 1:**
```bash
cd frontend\backend
npm install
```

**Command Prompt 2:**
```bash
cd frontend
npm install
```

### Step 2: Setup Database (1 min)

**Ensure MySQL is running, then:**
```bash
cd frontend\backend
node src\scripts\initDatabase.js
```

(Optional) Seed sample data:
```bash
node src\scripts\seedDatabase.js
```

### Step 3: Start Servers (1 min)

**Command Prompt 1:**
```bash
cd frontend\backend
npm run dev
```
✅ Wait for: `ClayNest Backend running on port 5000`

**Command Prompt 2:**
```bash
cd frontend
npm start
```
✅ Wait for: `Compiled successfully!`

---

## 🌐 OPEN IN BROWSER

```
http://localhost:3000
```

Done! 🎉

---

## 🧪 QUICK TEST

1. Click "Login" → Register new account
2. Browse products
3. Add item to cart
4. Go to cart
5. Proceed to checkout

---

## ⚙️ CONFIGURE (Optional)

### For Production Build:
```bash
cd frontend
npm run build

cd frontend\backend
set NODE_ENV=production
npm start

# Then visit: http://localhost:5000
```

### Database Settings:
Edit: `frontend\backend\.env`
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=claynest
```

### API Settings:
Edit: `frontend\.env`
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🆘 TROUBLESHOOTING

**Port 5000 in use?**
```bash
netstat -ano | findstr :5000
taskkill /PID [number] /F
```

**MySQL not running?**
```bash
# Start MySQL service
net start MySQL80
# Or start MySQL from installed location
```

**Dependencies error?**
```bash
cd frontend\backend
rm -r node_modules package-lock.json
npm install
```

**Still not working?**
→ See: `DEPLOYMENT_FIX_GUIDE.md` for full troubleshooting

---

## 📊 All Ready to Test!

**15 Test Cases:** See `DEPLOYMENT_FIX_GUIDE.md`

**Run Validation:**
```bash
validate-setup.bat
```

---

**Status:** ✅ READY TO RUN

**Time to First Load:** ~5 minutes
