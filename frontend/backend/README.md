# ClayNest Backend API Documentation

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file with the following variables:
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=claynest
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

### 3. Database Setup
```bash
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

## Project Structure

- `/src/config` - Database configuration
- `/src/controllers` - Business logic for each module
- `/src/routes` - API route definitions
- `/src/middleware` - Authentication and error handling
- `/src/models` - Database models (schema)
- `/src/scripts` - Database utilities

## Key Features

✅ User Authentication (JWT)
✅ Product Management
✅ Shopping Cart
✅ Wishlist
✅ Order Management
✅ Payment Integration (Razorpay)
✅ Shipping Tracking (Shiprocket)
✅ Admin Dashboard
✅ Coupon System

## API Routes Summary

### Auth Routes (`/api/auth`)
- POST `/register` - Register user
- POST `/login` - Login user

### Product Routes (`/api/products`)
- GET `/` - List products
- GET `/:id` - Get product
- GET `/categories` - List categories

### Cart Routes (`/api/cart`)
- GET `/` - Get cart
- POST `/add` - Add item
- DELETE `/:id` - Remove item

### Order Routes (`/api/orders`)
- POST `/create` - Create order
- GET `/` - Get orders
- GET `/:id` - Get order details

### Payment Routes (`/api/payments`)
- POST `/create-order` - Create payment
- POST `/verify` - Verify payment

### Admin Routes (`/api/admin`)
- POST `/products` - Add product
- PUT `/products/:id` - Update product
- GET `/dashboard/stats` - Dashboard stats

## Database Tables

- `users` - User accounts
- `products` - Product catalog
- `cart_items` - Shopping cart
- `wishlist` - User wishlist
- `orders` - Orders
- `order_items` - Order details
- `coupons` - Discount codes

## Security Notes

✅ Passwords hashed with bcryptjs
✅ JWT authentication on protected routes
✅ CORS enabled for frontend
✅ Role-based access control (admin/customer)
✅ Input validation

## Support

For issues or questions, check inline code comments or contact support@claynest.com
