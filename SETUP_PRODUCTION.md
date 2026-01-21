# ClayNest - Production Setup Guide

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 14+ installed
- MySQL 5.7+ running on localhost
- Git (optional)

### Step 1: Initialize Database

```bash
cd backend
npm install
npm run init-db
npm run seed
```

This will:
- Create `claynest` database
- Create all necessary tables
- Add 10 ceramic products
- Create admin account: `admin@claynest.com` / `admin123`

### Step 2: Configure SMTP (Email Service)

Update `backend/.env` with your Gmail credentials:

```env
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

**To get Gmail App Password:**
1. Enable 2-factor authentication on your Google account
2. Go to: https://myaccount.google.com/apppasswords
3. Generate app password for "Mail"
4. Copy the 16-character password to `.env`

### Step 3: Start Backend

```bash
cd backend
npm start
```

Backend will run on: `http://localhost:5000`

### Step 4: Start Frontend

```bash
cd frontend
npm install
npm start
```

Frontend will run on: `http://localhost:3000`

## 📦 Admin Panel - Ceramic Products

### Add New Product:
1. Login as admin: `admin@claynest.com` / `admin123`
2. Go to Admin > 🏺 Products
3. Fill in product details:
   - Name: e.g., "Large Ceramic Pot"
   - Description: Product details
   - Price: In INR (₹)
   - Category: Ceramic, Pottery, Terracotta, Sculpture
   - SKU: Unique identifier (e.g., POT-001)
   - Stock: Quantity available
   - Weight: In kg
   - Image: Upload product image (JPG/PNG/WebP)
4. Click "Add Product"

### Product Management Features:
- ✅ Add ceramic products with images
- ✅ Edit existing products
- ✅ Delete products
- ✅ Track stock quantities
- ✅ View all products in table format

## 💳 Payment Gateway Setup (Razorpay)

### Configure Razorpay:

1. Create account at: https://razorpay.com
2. Get your API keys from dashboard
3. Update `backend/.env`:

```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

## 📱 Shipping Integration (Shiprocket)

### Configure Shiprocket:

1. Sign up at: https://www.shiprocket.in
2. Get your API token
3. Update `backend/.env`:

```env
SHIPROCKET_EMAIL=your_email@shiprocket.com
SHIPROCKET_PASSWORD=your_password
SHIPROCKET_API_TOKEN=your_api_token
```

## 📞 Company Contact Information

**Phone:** +91 9369635323  
**Email:** support@claynest.com  
**Address:** ClayNest Studio, India

This information is displayed in:
- Admin Panel Header
- Footer of all pages
- Contact information on orders

## 🗄️ Database Schema

### Products Table
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  description LONGTEXT,
  price DECIMAL(10, 2),
  category VARCHAR(100),
  sku VARCHAR(100),
  stock INT,
  image VARCHAR(500),
  weight DECIMAL(5, 2),
  created_at TIMESTAMP
);
```

### Sample Ceramic Products Included:
1. Large Ceramic Pot - ₹2,500
2. Medium Decorative Vase - ₹1,800
3. Ceramic Planter Pot - ₹1,200
4. Handmade Ceramic Statue - ₹3,500
5. Ceramic Dinner Set (6 Pieces) - ₹4,500
6. Small Decorative Bowl - ₹650
7. Ceramic Wall Art Panel - ₹2,800
8. Handthrown Ceramic Lamp Base - ₹2,200
9. Ceramic Tea Set - ₹3,200
10. Artistic Ceramic Figurine - ₹1,500

## ✉️ Email Notifications

### Features:
- ✅ Welcome email on registration
- ✅ Order confirmation email
- ✅ Product inquiry notifications
- ✅ Customizable email templates

### Email Configuration:
- SMTP Host: smtp.gmail.com
- SMTP Port: 587
- Security: TLS

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Admin role-based access control
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ File upload restrictions (images only, 5MB max)

## 📊 Admin Dashboard

### Dashboard Stats:
- Total Orders
- Total Revenue
- Total Customers
- Total Products

### Admin Capabilities:
1. **Products:** Add, Edit, Delete ceramic products with images
2. **Orders:** View all orders, update status (Pending → Processing → Shipped → Delivered)
3. **Coupons:** Create discount coupons with expiry dates
4. **Analytics:** View sales statistics and metrics

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306

Solution:
- Start MySQL server: `mysql.server start` (Mac) or `net start MySQL80` (Windows)
- Check DB_HOST, DB_USER, DB_PASSWORD in .env
```

### Email Not Sending
```
Solution:
1. Verify SMTP credentials in .env
2. Use Google App Password (not regular password)
3. Enable "Less secure app access" if using regular Gmail
```

### File Upload Issues
```
Solution:
1. Ensure `/backend/public/uploads` directory exists
2. Check file size (max 5MB)
3. Use supported formats: JPG, PNG, WebP
```

### Port Already in Use
```
Solution:
- Backend: Change PORT in .env (default: 5000)
- Frontend: PORT=3001 npm start
```

## 📱 API Endpoints (Key)

### Admin Products
- `POST /api/admin/products` - Add product (with image upload)
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### Admin Orders
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status

### Admin Coupons
- `POST /api/admin/coupons` - Create coupon
- `GET /api/admin/coupons` - Get all coupons

## 🚀 Deployment Ready

The application is production-ready and can be deployed to:
- **Backend:** Heroku, Railway, AWS EC2, DigitalOcean
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Database:** AWS RDS, DigitalOcean, Google Cloud SQL

## ✅ Checklist Before Going Live

- [ ] Configure SMTP (Email)
- [ ] Configure Razorpay (Payments)
- [ ] Configure Shiprocket (Shipping)
- [ ] Add at least 5 ceramic products
- [ ] Test admin functionality
- [ ] Test product add/edit/delete
- [ ] Test order status updates
- [ ] Verify email notifications
- [ ] Check responsive design on mobile
- [ ] Set up SSL certificate
- [ ] Configure custom domain
- [ ] Set up backup strategy

## 📞 Support

**Phone:** +91 9369635323  
**Email:** support@claynest.com  
**Documentation:** See START_HERE.md for more guides
