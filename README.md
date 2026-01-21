# ClayNest - E-Commerce Platform for Handcrafted Clay Products

A fully functional e-commerce platform built with **Node.js/Express** backend and **React** frontend.

## 🎯 Features

### Customer Experience
- ✅ Mobile-responsive design
- ✅ Advanced product browsing with categories and search
- ✅ Wishlist & shopping cart features
- ✅ Secure checkout process
- ✅ Account & order management
- ✅ Real-time order tracking

### Admin Control Panel
- ✅ Product & inventory control
- ✅ Order & customer management
- ✅ Payment invoice tracking
- ✅ Shipping dashboard
- ✅ Promotions & coupons management

### Technical Excellence
- ✅ Integrated Razorpay payment gateway
- ✅ Real-time shipment tracking (Shiprocket API)
- ✅ SEO-optimized structure
- ✅ JWT-based authentication
- ✅ Scalable architecture

## 🛠 Technology Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Responsive styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **Razorpay** - Payment gateway
- **Shiprocket API** - Shipping & tracking

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MySQL (v5.7+)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=claynest
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

5. Seed the database:
```bash
npm run seed
```

6. Start the server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 📂 Project Structure

```
ClayNest/
├── backend/
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Authentication, error handling
│   │   ├── routes/        # API routes
│   │   ├── models/        # Database models
│   │   ├── scripts/       # Database seeding
│   │   └── server.js      # Main server file
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/         # Page components
    │   ├── context/       # Context API (Auth, Cart)
    │   ├── api/           # API calls
    │   ├── styles/        # CSS modules
    │   ├── App.js
    │   └── index.js
    ├── public/
    ├── package.json
    └── .env
```

## 🔑 Key API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/categories` - Get categories

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart/add` - Add to cart
- `DELETE /api/cart/:id` - Remove from cart
- `PUT /api/cart/:id` - Update cart quantity

### Wishlist
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist/add` - Add to wishlist
- `DELETE /api/wishlist/:id` - Remove from wishlist

### Orders
- `POST /api/orders/create` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

### Payments
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify` - Verify payment

### Admin
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `POST /api/admin/products` - Add product
- `PUT /api/admin/products/:id` - Update product
- `GET /api/admin/orders` - Get all orders
- `POST /api/admin/coupons` - Create coupon

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
```bash
npm start
```

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=claynest
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
SHIPROCKET_EMAIL=
SHIPROCKET_PASSWORD=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
FRONTEND_URL=http://localhost:3000
```

## 🔐 Security Features
- JWT authentication
- Password hashing with bcryptjs
- CORS enabled
- Helmet.js for HTTP headers
- Role-based access control
- Secure payment integration

## 📱 Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px+
- Touch-friendly UI
- Optimized images

## 🧪 Testing

To test the application:

1. **Register** a new user account
2. **Browse** products and use filters
3. **Add items** to cart and wishlist
4. **Create order** with shipping details
5. **Process payment** using Razorpay
6. **Track shipment** in real-time
7. **Admin login** to manage products and orders

## 📞 Support & Contact

- Email: support@claynest.com
- Documentation: See inline code comments
- Issue Tracking: Create issues in repository

## 📄 License

MIT License - feel free to use this project

## 🎉 Features Coming Soon

- User reviews & ratings
- Product recommendations
- Email notifications
- SMS notifications
- Live chat support
- Inventory alerts
- Analytics dashboard
- Multi-language support

---

**Happy shopping! 🏺**
