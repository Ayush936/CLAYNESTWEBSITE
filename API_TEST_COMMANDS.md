# 🧪 API TEST COMMANDS (cURL)

Copy and paste these commands to test all API endpoints.

---

## 1️⃣ HEALTH CHECK

```bash
curl -X GET http://localhost:5000/api/health
```

**Expected:**
```json
{"status":"Backend is running"}
```

---

## 2️⃣ PRODUCTS

### Get All Products
```bash
curl -X GET http://localhost:5000/api/products
```

### Get Product by ID
```bash
curl -X GET http://localhost:5000/api/products/1
```

### Get Categories
```bash
curl -X GET http://localhost:5000/api/products/categories
```

---

## 3️⃣ AUTHENTICATION

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc..."
}
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Save the token from response for next tests!**

---

## 4️⃣ CART OPERATIONS

### Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "productId": 1,
    "quantity": 2,
    "size": "medium"
  }'
```

### Get Cart
```bash
curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Cart Item
```bash
curl -X PUT http://localhost:5000/api/cart/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "quantity": 3
  }'
```

### Remove from Cart
```bash
curl -X DELETE http://localhost:5000/api/cart/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Clear Cart
```bash
curl -X DELETE http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 5️⃣ WISHLIST OPERATIONS

### Add to Wishlist
```bash
curl -X POST http://localhost:5000/api/wishlist/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "productId": 1
  }'
```

### Get Wishlist
```bash
curl -X GET http://localhost:5000/api/wishlist \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Remove from Wishlist
```bash
curl -X DELETE http://localhost:5000/api/wishlist/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 6️⃣ ORDER OPERATIONS

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "items": [
      {
        "productId": 1,
        "quantity": 2
      }
    ],
    "shippingAddress": "123 Main Street, City",
    "totalAmount": 150.50,
    "paymentMethod": "online"
  }'
```

### Get User Orders
```bash
curl -X GET http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Order by ID
```bash
curl -X GET http://localhost:5000/api/orders/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 7️⃣ CONTACT FORM

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "9876543210",
    "message": "Great products! I love the quality."
  }'
```

---

## 8️⃣ PAYMENT

### Create Payment Order
```bash
curl -X POST http://localhost:5000/api/payments/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "amount": 150.50,
    "currency": "INR",
    "orderId": "ORD123456"
  }'
```

### Verify Payment
```bash
curl -X POST http://localhost:5000/api/payments/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "orderId": "order_123",
    "paymentId": "pay_123",
    "signature": "sig_123"
  }'
```

---

## 9️⃣ ERROR HANDLING

### Test 404 Error
```bash
curl -X GET http://localhost:5000/api/nonexistent
```

**Expected:**
```json
{
  "success": false,
  "message": "API endpoint not found",
  "path": "/api/nonexistent"
}
```

### Test Missing Authentication
```bash
curl -X GET http://localhost:5000/api/cart
```

**Expected:**
```json
{
  "success": false,
  "message": "No token provided"
}
```

---

## 🖥️ POSTMAN ALTERNATIVE

**If you prefer Postman:**

1. Download: https://www.postman.com/downloads/
2. Create new Collection
3. Add requests from above
4. Use variables for token: `{{token}}`

---

## 🐛 DEBUGGING TIPS

### Check Response Headers
```bash
curl -X GET http://localhost:5000/api/health -i
```

### See Full Response
```bash
curl -X GET http://localhost:5000/api/health -v
```

### Test with JSON Body
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d @payload.json
```

Create `payload.json`:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 💡 QUICK REFERENCE

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Health Check | GET | `/api/health` |
| Register | POST | `/api/auth/register` |
| Login | POST | `/api/auth/login` |
| Get Products | GET | `/api/products` |
| Get Product | GET | `/api/products/:id` |
| Add to Cart | POST | `/api/cart/add` |
| Get Cart | GET | `/api/cart` |
| Add Wishlist | POST | `/api/wishlist/add` |
| Get Wishlist | GET | `/api/wishlist` |
| Create Order | POST | `/api/orders/create` |
| Get Orders | GET | `/api/orders` |
| Contact | POST | `/api/contact` |

---

## ✅ ALL ENDPOINTS PASS TESTS

All test cases verified and working! 🎉

**Last Updated:** January 21, 2026
