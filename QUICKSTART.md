# ClayNest - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Backend Setup

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and update with your database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=claynest
```

Seed the database:
```bash
npm run seed
```

Start backend:
```bash
npm run dev
```
✅ Backend running on `http://localhost:5000`

### Step 2: Frontend Setup

In a new terminal:
```bash
cd frontend
npm install
npm start
```
✅ Frontend running on `http://localhost:3000`

### Step 3: Test the Application

1. **Register**: Click "Register" and create an account
2. **Login**: Use your credentials to login
3. **Browse Products**: View the product catalog
4. **Add to Cart**: Add items to shopping cart
5. **Create Order**: Go to cart and checkout
6. **Admin Access**: Login as admin to manage products

## 📊 Database Setup

The database will be automatically created when you run:
```bash
npm run seed
```

This creates tables for:
- Users
- Products (with sample clay items)
- Cart items
- Wishlist
- Orders
- Coupons

## 🔑 Test Credentials

After seeding, you can test with:
- Email: test@example.com (if admin)
- Or register a new account

## 🛠 Configure External Services

### Razorpay (Payments)
1. Sign up at https://razorpay.com
2. Get your Key ID and Secret
3. Update `.env`:
   ```
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_secret
   ```

### Shiprocket (Shipping)
1. Sign up at https://www.shiprocket.in
2. Get your API credentials
3. Update `.env`:
   ```
   SHIPROCKET_EMAIL=your_email
   SHIPROCKET_PASSWORD=your_password
   ```

## 📁 Project Structure

```
ClayNest/
├── backend/           # Node.js/Express API
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   └── package.json
│
└── frontend/         # React App
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── api/
    │   ├── styles/
    │   └── App.js
    └── package.json
```

## ✨ Key Features Implemented

### Customer Features
✅ User Registration & Authentication
✅ Product Browsing & Search
✅ Category Filtering
✅ Shopping Cart
✅ Wishlist
✅ Order Placement
✅ Order Tracking
✅ Responsive Mobile Design

### Admin Features
✅ Dashboard with Statistics
✅ Product Management
✅ Order Management
✅ Coupon Management
✅ Order Status Updates

### Technical Features
✅ JWT Authentication
✅ MySQL Database
✅ RESTful API
✅ Payment Gateway Ready (Razorpay)
✅ Shipping API Ready (Shiprocket)
✅ Error Handling
✅ Role-based Access Control

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
# Or change PORT in .env
```

### Frontend won't connect to backend
```
# Ensure backend is running on port 5000
# Check API_BASE_URL in src/api/api.js
```

### Database connection error
```
# Verify MySQL is running
# Check .env credentials
# Run: npm run seed
```

### Missing dependencies
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

## 📚 Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [Main README](./README.md)

## 🎯 Next Steps

1. ✅ Set up local development environment
2. ✅ Test all features
3. Configure payment & shipping integrations
4. Deploy backend to cloud (Heroku/Railway)
5. Deploy frontend (Vercel/Netlify)
6. Set up CI/CD pipeline
7. Add email notifications

## 📞 Support

For issues or questions:
- Check the documentation in each folder
- Review inline code comments
- Check browser console for errors
- Check backend logs for API errors

## 🚀 Ready to Deploy?

### Backend Deployment (Heroku)
```bash
heroku create claynest-api
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
npm install -g vercel
vercel
```

---

**Start building with ClayNest! 🏺**
