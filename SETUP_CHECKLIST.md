# ClayNest Setup Checklist

## ✅ Pre-Setup Requirements
- [ ] Node.js v14+ installed
- [ ] MySQL v5.7+ installed and running
- [ ] npm or yarn installed
- [ ] Git installed

---

## 🔧 Backend Setup

### Step 1: Navigate to Backend
```bash
cd d:\ClayNest\backend
```

### Step 2: Install Dependencies
```bash
npm install
```
- [ ] Dependencies installed successfully
- [ ] No error messages during installation

### Step 3: Create .env File
```bash
# Copy from .env.example
cp .env.example .env
```
- [ ] .env file created
- [ ] Database credentials updated:
  - [ ] DB_HOST=localhost
  - [ ] DB_USER=root
  - [ ] DB_PASSWORD=your_password
  - [ ] DB_NAME=claynest
  - [ ] JWT_SECRET (set any value)

### Step 4: Database Setup
```bash
npm run seed
```
- [ ] Database created successfully
- [ ] All tables created
- [ ] Sample products inserted

### Step 5: Start Backend
```bash
npm run dev
```
- [ ] Server started on port 5000
- [ ] Message: "ClayNest Backend running on port 5000"
- [ ] No connection errors

**✅ Backend Ready!** Test at: `http://localhost:5000/api/health`

---

## 🎨 Frontend Setup

### Step 1: Open New Terminal and Navigate
```bash
cd d:\ClayNest\frontend
```

### Step 2: Install Dependencies
```bash
npm install
```
- [ ] Dependencies installed successfully
- [ ] No error messages during installation

### Step 3: Start Frontend
```bash
npm start
```
- [ ] App starts on port 3000
- [ ] Browser opens automatically
- [ ] HomePage loads successfully

**✅ Frontend Ready!** Access at: `http://localhost:3000`

---

## 🧪 Testing Checklist

### Authentication
- [ ] Register new user with valid email
- [ ] Login with registered credentials
- [ ] Logout successfully
- [ ] Protected routes require login

### Products
- [ ] View all products on Products page
- [ ] Search for products
- [ ] Filter by category
- [ ] Product details display correctly
- [ ] Stock information shows correctly

### Shopping Cart
- [ ] Add product to cart
- [ ] View cart items
- [ ] Update item quantity
- [ ] Remove item from cart
- [ ] Clear cart
- [ ] Cart total calculates correctly

### Wishlist
- [ ] Add product to wishlist
- [ ] View wishlist items
- [ ] Remove from wishlist
- [ ] Wishlist persists after refresh

### Orders
- [ ] Create order from cart
- [ ] Order appears in order history
- [ ] Order details display correctly
- [ ] Order status shows properly

### Admin Panel (If admin user)
- [ ] Access admin dashboard
- [ ] View dashboard statistics
- [ ] See orders list
- [ ] Update order status
- [ ] Create coupon
- [ ] View all coupons

---

## 🚀 Deployment Checklist

### Before Deployment
- [ ] All tests pass
- [ ] No console errors
- [ ] Environment variables set
- [ ] Database backed up
- [ ] Code committed to git

### Backend Deployment
- [ ] Change NODE_ENV to production
- [ ] Update database credentials
- [ ] Update JWT_SECRET to strong value
- [ ] Add Razorpay credentials
- [ ] Add Shiprocket credentials
- [ ] Deploy to hosting service

### Frontend Deployment
- [ ] Update API_URL to production backend
- [ ] Run: npm run build
- [ ] Test build locally
- [ ] Deploy to hosting service
- [ ] Verify all routes work
- [ ] Test payment flow

---

## 🔐 Security Checklist

Before going to production:
- [ ] JWT_SECRET is strong and unique
- [ ] Database passwords are secure
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation in place
- [ ] SQL injection prevention checked
- [ ] HTTPS enabled on production
- [ ] Sensitive data not logged
- [ ] Environment variables not committed

---

## 🐛 Troubleshooting

### Backend Issues

**Port 5000 already in use**
```bash
# Change PORT in .env
# Or kill process on port 5000
```

**Database connection error**
```bash
# Check MySQL is running
# Verify .env credentials
# Run: npm run seed
```

**Module not found**
```bash
# Delete node_modules
# Run: npm install
```

### Frontend Issues

**Cannot connect to backend**
```bash
# Ensure backend is running
# Check API URL in src/api/api.js
# Check CORS in backend
```

**Styles not loading**
```bash
# Clear browser cache
# Restart npm start
# Check CSS imports
```

**Authentication error**
```bash
# Clear localStorage
# Login again
# Check JWT token in headers
```

---

## 📝 Configuration Files

### Backend (.env)
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=claynest
DB_PORT=3306
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env optional)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📊 Expected Output

### Backend Startup:
```
ClayNest Backend running on port 5000
```

### Frontend Startup:
```
Compiled successfully!
You can now view claynest-frontend in the browser.
Local: http://localhost:3000
```

---

## 🎯 Success Indicators

✅ Both servers running without errors
✅ Frontend loads at localhost:3000
✅ Backend responds at localhost:5000/api/health
✅ Can register and login
✅ Products display correctly
✅ Cart functionality works
✅ Admin dashboard accessible
✅ No console errors

---

## 📞 Quick Support

| Issue | Solution |
|-------|----------|
| Port in use | Change PORT in .env |
| DB error | Check MySQL, update .env |
| Module missing | npm install in correct directory |
| CORS error | Check backend CORS config |
| API not found | Verify backend is running |
| Styles broken | Clear cache, restart npm |

---

## ✨ You're All Set!

Once everything is checked off, you have a fully functional ClayNest e-commerce platform ready to use!

**Next Steps:**
1. Explore the admin dashboard
2. Create test products
3. Process test orders
4. Integrate payment gateway
5. Deploy to production

---

**Happy Coding! 🏺**
