# 🔧 SETUP AND DEPLOYMENT GUIDE - FIXED VERSION

## Problem Fixed
✅ **404 DEPLOYMENT_NOT_FOUND Error** - Resolved by adding proper React SPA routing and frontend serving

---

## Prerequisites
- Node.js v14+ and npm
- MySQL v5.7+
- Git

---

## STEP 1: Environment Setup

### Backend Configuration
```bash
cd frontend/backend
npm install
```

**Verify `.env` file** (frontend/backend/.env):
```dotenv
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=claynest
DB_PORT=3306
JWT_SECRET=claynest_secret_key_2026
FRONTEND_URL=http://localhost:3000
```

### Frontend Configuration
```bash
cd frontend
npm install
```

**Verify `.env` file** (frontend/.env):
```dotenv
REACT_APP_API_URL=http://localhost:5000/api
```

---

## STEP 2: Database Setup

### Create Database
```bash
cd frontend/backend
mysql -u root -p
```

```sql
CREATE DATABASE claynest;
USE claynest;
```

### Initialize Database
```bash
node src/scripts/initDatabase.js
```

### Seed Sample Data (Optional)
```bash
node src/scripts/seedDatabase.js
```

---

## STEP 3: Start Development Servers

### Terminal 1 - Start Backend Server
```bash
cd frontend/backend
npm run dev
```

**Expected Output:**
```
ClayNest Backend running on port 5000
Environment: development
```

### Terminal 2 - Start Frontend Dev Server
```bash
cd frontend
npm start
```

**Expected Output:**
```
Compiled successfully!
On Your Network: http://localhost:3000
```

---

## STEP 4: Production Build & Deployment

### Build Frontend
```bash
cd frontend
npm run build
```

This creates optimized build in `frontend/build/` directory.

### Update Backend for Production
```bash
cd frontend/backend
```

Update `.env`:
```dotenv
NODE_ENV=production
PORT=5000
```

### Start Production Server
```bash
NODE_ENV=production npm start
```

Server will:
1. Serve React build from `frontend/build/`
2. Serve API routes under `/api/`
3. Automatically redirect non-API routes to React (SPA routing)

---

## TEST CASES - VERIFY ALL WORKING

### ✅ Test 1: Backend Health Check
```
GET http://localhost:5000/api/health

Expected Response:
{
  "status": "Backend is running"
}
```

### ✅ Test 2: Get All Products
```
GET http://localhost:5000/api/products

Expected Response:
{
  "success": true,
  "data": [ ...product list... ],
  "total": 10
}
```

### ✅ Test 3: User Registration
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}

Expected Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

### ✅ Test 4: User Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Expected Response:
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { ...user data... }
}
```

### ✅ Test 5: Add to Cart
```
POST http://localhost:5000/api/cart/add
Content-Type: application/json
Authorization: Bearer [jwt_token]

{
  "productId": 1,
  "quantity": 2,
  "size": "medium"
}

Expected Response:
{
  "success": true,
  "message": "Product added to cart",
  "cart": { ...cart data... }
}
```

### ✅ Test 6: Get Cart
```
GET http://localhost:5000/api/cart
Authorization: Bearer [jwt_token]

Expected Response:
{
  "success": true,
  "data": [ ...cart items... ],
  "total": 150.50
}
```

### ✅ Test 7: Get Wishlist
```
GET http://localhost:5000/api/wishlist
Authorization: Bearer [jwt_token]

Expected Response:
{
  "success": true,
  "data": [ ...wishlist items... ],
  "count": 5
}
```

### ✅ Test 8: Add to Wishlist
```
POST http://localhost:5000/api/wishlist/add
Content-Type: application/json
Authorization: Bearer [jwt_token]

{
  "productId": 1
}

Expected Response:
{
  "success": true,
  "message": "Added to wishlist"
}
```

### ✅ Test 9: Create Order
```
POST http://localhost:5000/api/orders/create
Content-Type: application/json
Authorization: Bearer [jwt_token]

{
  "items": [{ "productId": 1, "quantity": 2 }],
  "shippingAddress": "123 Main St",
  "totalAmount": 150.50,
  "paymentMethod": "online"
}

Expected Response:
{
  "success": true,
  "message": "Order created successfully",
  "orderId": "ORD123456"
}
```

### ✅ Test 10: Get User Orders
```
GET http://localhost:5000/api/orders
Authorization: Bearer [jwt_token]

Expected Response:
{
  "success": true,
  "data": [ ...user orders... ],
  "count": 3
}
```

### ✅ Test 11: Frontend Routes (Development)
```
http://localhost:3000/           → Home Page
http://localhost:3000/products   → Products Page
http://localhost:3000/cart       → Cart Page
http://localhost:3000/wishlist   → Wishlist Page
http://localhost:3000/checkout   → Checkout Page
http://localhost:3000/login      → Login Page
http://localhost:3000/register   → Register Page
http://localhost:3000/orders     → Orders Page
```

### ✅ Test 12: Frontend Routes (Production)
```
Same routes work after running npm run build
Access via: http://localhost:5000/
(Backend serves React build + handles API routes)
```

### ✅ Test 13: Contact Form
```
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Great products!",
  "phone": "9876543210"
}

Expected Response:
{
  "success": true,
  "message": "Message sent successfully"
}
```

### ✅ Test 14: 404 Error Handling (API)
```
GET http://localhost:5000/api/nonexistent

Expected Response:
{
  "success": false,
  "message": "API endpoint not found",
  "path": "/api/nonexistent"
}
```

### ✅ Test 15: Frontend SPA Catch-all Route (Production)
```
GET http://localhost:5000/any/random/path
→ Serves index.html (React handles routing)

GET http://localhost:5000/products
→ Serves React app which handles /products route
```

---

## Troubleshooting

### 1. **CORS Error**
**Error:** "Access to XMLHttpRequest blocked by CORS policy"
**Solution:**
```bash
# Check FRONTEND_URL in backend/.env
FRONTEND_URL=http://localhost:3000
```

### 2. **Database Connection Error**
**Error:** "connect ECONNREFUSED 127.0.0.1:3306"
**Solution:**
```bash
# Start MySQL
# Windows: mysql -u root -p
# Mac: /usr/local/mysql/bin/mysql -u root -p
# Linux: sudo mysql -u root -p
```

### 3. **Port Already in Use**
**Error:** "Port 5000 already in use"
**Solution:**
```bash
# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### 4. **Module Not Found**
**Error:** "Cannot find module 'express'"
**Solution:**
```bash
cd frontend/backend
rm -rf node_modules package-lock.json
npm install
```

### 5. **404 Deployment Not Found (FIXED)**
**Cause:** Missing React SPA routing handler
**Solution:** ✅ Already fixed in updated server.js

---

## API Endpoints Summary

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/categories` - Get categories

### Cart Routes
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Wishlist Routes
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist/add` - Add to wishlist
- `DELETE /api/wishlist/:id` - Remove from wishlist

### Order Routes
- `GET /api/orders` - Get user orders
- `POST /api/orders/create` - Create order
- `GET /api/orders/:id` - Get order details

### Payment Routes
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify` - Verify payment

---

## File Structure
```
ClayNest/
├── frontend/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── server.js ✅ FIXED
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   └── ...
│   │   ├── .env ✅ Configured
│   │   └── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── pages/
│   │   ├── components/
│   │   └── ...
│   ├── .env ✅ Created
│   ├── .env.production ✅ Created
│   └── package.json
└── README.md
```

---

## Quick Start Commands

```bash
# Development Mode
# Terminal 1
cd frontend/backend && npm run dev

# Terminal 2
cd frontend && npm start

# Production Mode
cd frontend && npm run build
cd frontend/backend
NODE_ENV=production npm start

# Access Application
# Development: http://localhost:3000
# Production: http://localhost:5000
```

---

## Status: ✅ FULLY OPERATIONAL

All issues resolved:
- ✅ 404 DEPLOYMENT_NOT_FOUND fixed
- ✅ React SPA routing configured
- ✅ Frontend serving setup complete
- ✅ API error handling added
- ✅ Environment variables configured
- ✅ All 15 test cases provided
- ✅ Production deployment ready

**Last Updated:** January 21, 2026
