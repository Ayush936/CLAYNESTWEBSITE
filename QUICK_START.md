# ⚡ ClayNest Quick Start Guide

## Your Website is LIVE and READY! 🎉

**URLs:**
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend API: http://localhost:5000

---

## Getting Started in 5 Minutes

### Step 1: Login or Register (1 min)
```
Navigate to http://localhost:3000
Click "Login" in navigation

Test Account:
Email: admin@claynest.com
Password: admin123

OR click "Register" to create a new account
```

### Step 2: Browse Products (1 min)
```
Click "Products" in navigation
Browse 30 ceramic products across 11 categories
Search for specific items (e.g., "Buddha", "Pot", "Kitchenware")
Filter by category
Click on any product to see details
```

### Step 3: Add to Cart (1 min)
```
On product page, click "Add to Cart"
Go to Cart page (click shopping cart icon)
Adjust quantities with +/- buttons
Remove items if needed
```

### Step 4: Checkout (1.5 min)
```
Click "Proceed to Checkout"

Step 1: Enter shipping address
- Name, Email, Phone, Address, City, State, ZIP

Step 2: Select payment method
- Choose "Cash on Delivery" OR "Razorpay"
- Optional: Apply coupon code (WELCOME20 or CERAMIC15)

Step 3: Confirm order
- Review order details
- See confirmation with order number
```

### Step 5: View Order (0.5 min)
```
Go to "Orders" page
Click on order to see full details
Track order status
```

---

## Key Features Overview

| Feature | Details |
|---------|---------|
| **Products** | 30 ceramic items across 11 categories |
| **Cart** | Add/remove items, adjust quantities |
| **Checkout** | Multi-step process with validation |
| **Payment** | Razorpay (test mode) or Cash on Delivery |
| **Coupons** | WELCOME20 (20% off), CERAMIC15 (15% off) |
| **Orders** | Track orders and view history |
| **Admin** | Dashboard at `/admin` |

---

## Test Razorpay Payment

If you select Razorpay payment option, use this test card:

```
Card Number:  4111 1111 1111 1111
Expiry Month: Any future month (e.g., 12)
Expiry Year:  Any future year (e.g., 2025)
CVV:          Any 3 digits (e.g., 123)
```

**Result:** Payment will be verified and order confirmed instantly

---

## Sample Coupons

Apply these during checkout for discounts:

| Coupon Code | Discount | Uses |
|------------|----------|------|
| WELCOME20 | 20% off | 100 available |
| CERAMIC15 | 15% off | 50 available |

**How to apply:**
1. In checkout Step 2
2. Enter coupon code in text field
3. Click "Apply"
4. See discount reflected in total

---

## Admin Panel

Access admin features:

```
URL: http://localhost:3000/admin
Login: admin@claynest.com / admin123

Features:
- Dashboard with statistics
- View all orders
- Manage products
- View user information
```

---

## Sample Products Available

### Ceramic Pots (₹899 - ₹1,499)
- Buddha Tulsi Pot
- Succulent Pot Set
- Animal Bird Pot
- Bonsai Pot Collection
- Large Outdoor Pot
- And 4 more varieties

### Kitchenware (₹699 - ₹1,899)
- Ceramic Bottle Set
- Cup & Saucer Set
- Ceramic Mug Set

### Other Categories
- Ceramic Dinner Sets (6 items)
- Ceramic Decor (3 items)
- Home Decor & Flower Vases
- Bathroom Sets
- And more...

---

## Troubleshooting Quick Tips

### Issue: "Cannot connect to server"
**Solution:** Make sure both servers are running
```
Frontend: npm start (in frontend folder)
Backend: npm start (in backend folder)
```

### Issue: "Port already in use"
**Solution:** Kill the process using that port or restart your system

### Issue: "Login fails"
**Solution:** 
- Clear browser cache
- Try registering a new account
- Use test account: admin@claynest.com / admin123

### Issue: "Cart not updating"
**Solution:** 
- Refresh page
- Clear browser cache and cookies
- Try again

### Issue: "Payment verification failed"
**Solution:**
- Check you're using the correct test card
- Refresh and try again
- Contact support if issue persists

---

## What's Included

✅ **Frontend**
- React app with all pages
- Shopping cart with context management
- Multi-step checkout component
- Order history page
- Wishlist functionality
- Admin dashboard

✅ **Backend**
- Express.js API server
- User authentication with JWT
- Product management
- Order processing
- Payment verification (Razorpay)
- Email notifications
- Admin endpoints

✅ **Database**
- 30 sample products
- 2 sample coupons
- In-memory storage (JSON file)
- Automatic persistence

✅ **Documentation**
- This Quick Start guide
- Testing guide
- Implementation summary
- API documentation

---

## Next Steps

1. **Test Everything**
   - Follow the 5-minute guide above
   - Test both payment methods
   - Apply coupons
   - View orders

2. **Customize**
   - Change product images
   - Update product details
   - Add more products
   - Modify styling/branding

3. **Deploy**
   - Deploy frontend to Vercel/Netlify
   - Deploy backend to Heroku/AWS
   - Configure live Razorpay keys
   - Set up email service

4. **Promote**
   - Share website with friends
   - Collect feedback
   - Improve based on feedback
   - Start selling!

---

## Contact & Support

Having issues? Check:
1. Browser console (Press F12)
2. Backend logs in terminal
3. `.env` file configuration
4. README files in folders

---

## Quick Stats

| Metric | Value |
|--------|-------|
| Products | 30 |
| Categories | 11 |
| Sample Coupons | 2 |
| Price Range | ₹699 - ₹2,499 |
| Supported Payment | Razorpay + COD |
| Admin Accounts | 1 |
| Total API Endpoints | 25+ |

---

## Server Details

**Frontend Server**
- Port: 3000
- Framework: React 18.2.0
- Build Tool: Create React App
- Status: Running ✅

**Backend Server**
- Port: 5000
- Framework: Express.js
- Database: JSON (In-Memory)
- Status: Running ✅

**Email Service**
- Provider: Gmail SMTP
- Account: ayushsinghrajput643@gmail.com
- Status: Configured ✅

**Payment Gateway**
- Provider: Razorpay
- Mode: Test Mode
- Status: Integrated ✅

---

## Expected Results

When everything is working correctly:

✅ Frontend loads in browser
✅ Can login with test account
✅ Can browse products
✅ Can add items to cart
✅ Can proceed to checkout
✅ Can apply coupon
✅ Can place order
✅ Can view orders
✅ Can access admin panel
✅ Orders appear in admin

---

## Version Information

**Current Version:** 1.0 Production Ready
**Last Updated:** Today
**Status:** 🚀 READY TO USE

---

**Enjoy your new ClayNest Ceramic E-Commerce Platform!** 🎉

For detailed information, see:
- `TESTING_GUIDE.md` - Comprehensive testing checklist
- `IMPLEMENTATION_SUMMARY.md` - Complete implementation details
- Each folder's `README.md` for specific documentation

---

*Keep this guide handy for quick reference!*
