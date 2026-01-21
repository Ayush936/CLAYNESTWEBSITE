# ClayNest Frontend - React E-Commerce App

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

The frontend will start on `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Header.js
│   └── Footer.js
├── pages/            # Page components
│   ├── Home.js
│   ├── Products.js
│   ├── Cart.js
│   ├── Wishlist.js
│   ├── Orders.js
│   ├── Login.js
│   ├── Register.js
│   └── Admin.js
├── context/          # React Context
│   ├── AuthContext.js    # User authentication
│   └── CartContext.js    # Shopping cart
├── api/              # API integration
│   └── api.js        # Axios instance & endpoints
├── styles/           # CSS files
│   ├── Header.css
│   ├── Products.css
│   ├── Cart.css
│   ├── Orders.css
│   ├── Auth.css
│   └── Admin.css
├── App.js           # Main app component
└── index.js         # React entry point
```

## Key Features

✅ User Registration & Login
✅ Product Browsing with Filters
✅ Shopping Cart Management
✅ Wishlist
✅ Order Placement & Tracking
✅ Admin Dashboard
✅ Responsive Design
✅ Real-time Updates

## Pages

### Public Pages
- **Home** - Landing page with features
- **Products** - Product catalog with search & filters
- **Login** - User login
- **Register** - User registration

### Protected Pages
- **Cart** - Shopping cart management
- **Wishlist** - Saved items
- **Orders** - Order history & tracking
- **Admin** - Admin dashboard (admin only)

## State Management

### Auth Context
Manages user authentication, login/logout, and token storage

### Cart Context
Manages shopping cart items and operations

## API Integration

All API calls go through `/src/api/api.js` which uses Axios.
Base URL: `http://localhost:5000/api`

### Features
- Automatic JWT token attachment to requests
- Error handling
- Response validation

## Styling

- Responsive CSS with media queries
- Mobile-first design
- Breakpoints: 480px, 768px, 1024px+
- Color scheme: Earth tones (#8b7355, #d4a574)

## Environment Variables

Create a `.env` file (optional):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting with React.lazy (optional)
- Image optimization
- CSS minification
- Lazy loading

## Troubleshooting

### Cannot connect to backend
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API URL in api.js

### Page not loading
- Check browser console for errors
- Ensure all dependencies are installed
- Clear browser cache

### Styling issues
- Verify CSS files are imported
- Check for conflicting global styles
- Test in different browsers

## Development Tips

1. Use React DevTools browser extension
2. Check Network tab for API calls
3. Use browser console for debugging
4. Test on mobile devices

## Building for Production

```bash
npm run build
```

This creates optimized production build in `build/` folder.

Deploy to:
- **Vercel** (recommended)
- **Netlify**
- **AWS S3**
- **GitHub Pages**

## Support

For questions or issues, check:
1. Browser console for errors
2. Network tab for API issues
3. Inline code comments
4. Backend logs

Contact: support@claynest.com
