// In-Memory Data Service - Acts as database
// This allows the website to run without requiring MySQL

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Data store
let data = {
  users: [],
  products: [],
  cartItems: [],
  wishlistItems: [],
  orders: [],
  orderItems: [],
  coupons: []
};

// Initialize with default data
const initializeData = () => {
  const dataFile = path.join(DATA_DIR, 'data.json');
  
  if (fs.existsSync(dataFile)) {
    try {
      data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    } catch (err) {
      console.log('Creating fresh data store...');
      seedDefaultData();
      saveData();
    }
  } else {
    seedDefaultData();
    saveData();
  }
};

const seedDefaultData = () => {
  const bcrypt = require('bcryptjs');
  const hashedPassword = bcrypt.hashSync('admin123', 10);

  // Admin user
  data.users = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@claynest.com',
      password: hashedPassword,
      phone: '9369635323',
      role: 'admin',
      created_at: new Date().toISOString()
    }
  ];

  // Ceramic products
  data.products = [
    {
      id: 1,
      name: 'Sage Bloom Dinner Set of 6',
      description: 'Elegant sage green ceramic dinner set for 6 people. Microwave and dishwasher safe. Features premium glazing and comfortable grip handles. Perfect for dining and special occasions.',
      price: 2999,
      category: 'Ceramic Dinner Sets',
      sku: 'SAGE-BLOOM-6',
      stock: 50,
      weight: 4.2,
      image: 'https://via.placeholder.com/400x400?text=Sage+Bloom+Dinner+Set+6',
      rating: 5.0,
      reviews: 12,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Ivory Whisper Dinner Set of 6',
      description: 'Beautiful ivory ceramic dinner set for 6 people featuring classic design. Each piece is hand-finished for durability and style. Includes dinner plates, side plates, and bowls.',
      price: 3699,
      category: 'Ceramic Dinner Sets',
      sku: 'IVORY-WHISPER-6',
      stock: 45,
      weight: 4.5,
      image: 'https://via.placeholder.com/400x400?text=Ivory+Whisper+Dinner+Set+6',
      rating: 4.8,
      reviews: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Vanilla Drift Dinner Set of 6',
      description: 'Sophisticated vanilla cream ceramic dinner set for 6 people. Premium quality ceramics with smooth finish. Perfect for both everyday use and special occasions.',
      price: 3699,
      category: 'Ceramic Dinner Sets',
      sku: 'VANILLA-DRIFT-6',
      stock: 40,
      weight: 4.3,
      image: 'https://via.placeholder.com/400x400?text=Vanilla+Drift+Dinner+Set+6',
      rating: 4.9,
      reviews: 10,
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      name: 'Desert Bloom Dinner Set of 6',
      description: 'Warm desert-inspired ceramic dinner set for 6 people with beautiful neutral tones. Perfect for creating an elegant dining experience with family and friends.',
      price: 3499,
      category: 'Ceramic Dinner Sets',
      sku: 'DESERT-BLOOM-6',
      stock: 48,
      weight: 4.1,
      image: 'https://via.placeholder.com/400x400?text=Desert+Bloom+Dinner+Set+6',
      rating: 5.0,
      reviews: 15,
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      name: 'Sienna Clay Dinner Set of 6',
      description: 'Handcrafted sienna-toned ceramic dinner set for 6 people featuring earthy aesthetics. Each piece showcases traditional ceramic artistry combined with modern functionality.',
      price: 3299,
      category: 'Ceramic Dinner Sets',
      sku: 'SIENNA-CLAY-6',
      stock: 52,
      weight: 4.4,
      image: 'https://via.placeholder.com/400x400?text=Sienna+Clay+Dinner+Set+6',
      rating: 4.7,
      reviews: 9,
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      name: 'Champagne Soleil Dinner Set of 6',
      description: 'Luxurious champagne-gold ceramic dinner set for 6 people with elegant finish. Features subtle metallic accents for a sophisticated dining experience.',
      price: 2499,
      category: 'Ceramic Dinner Sets',
      sku: 'CHAMPAGNE-SOLEIL-6',
      stock: 55,
      weight: 4.2,
      image: 'https://via.placeholder.com/400x400?text=Champagne+Soleil+Dinner+Set+6',
      rating: 4.6,
      reviews: 11,
      created_at: new Date().toISOString()
    },
    {
      id: 7,
      name: 'Sage Bloom Dinner Set of 4',
      description: 'Perfect for small households and couples. Sage green ceramic dinner set for 4 people with the same premium quality as the 6-piece set. Compact and stylish.',
      price: 2199,
      category: 'Ceramic Dinner Sets',
      sku: 'SAGE-BLOOM-4',
      stock: 60,
      weight: 2.8,
      image: 'https://via.placeholder.com/400x400?text=Sage+Bloom+Dinner+Set+4',
      rating: 4.9,
      reviews: 14,
      created_at: new Date().toISOString()
    },
    {
      id: 8,
      name: 'Ivory Whisper Dinner Set of 4',
      description: 'Classic ivory ceramic dinner set for 4 people. Ideal for small families and intimate gatherings. Features the same hand-finished quality as larger sets.',
      price: 2499,
      category: 'Ceramic Dinner Sets',
      sku: 'IVORY-WHISPER-4',
      stock: 58,
      weight: 3.0,
      image: 'https://via.placeholder.com/400x400?text=Ivory+Whisper+Dinner+Set+4',
      rating: 4.8,
      reviews: 7,
      created_at: new Date().toISOString()
    },
    {
      id: 9,
      name: 'Ceramic Decorative Vase Collection',
      description: 'Set of 3 handcrafted ceramic vases with intricate patterns. Perfect for flower arrangements or standalone decoration. Each vase has unique artistic details.',
      price: 1899,
      category: 'Ceramic Decor',
      sku: 'VASE-COLLECTION',
      stock: 70,
      weight: 2.5,
      image: 'https://via.placeholder.com/400x400?text=Ceramic+Vase+Collection',
      rating: 4.7,
      reviews: 6,
      created_at: new Date().toISOString()
    },
    {
      id: 10,
      name: 'Hand-painted Ceramic Planter Set',
      description: 'Beautiful set of 4 hand-painted ceramic planters with drainage holes. Perfect for small plants, succulents, and indoor gardening. Made from premium clay.',
      price: 1599,
      category: 'Ceramic Planters',
      sku: 'PLANTER-SET-4',
      stock: 65,
      weight: 2.2,
      image: 'https://via.placeholder.com/400x400?text=Ceramic+Planter+Set',
      rating: 4.8,
      reviews: 9,
      created_at: new Date().toISOString()
    },
    {
      id: 11,
      name: 'Premium Ceramic Serving Platter',
      description: 'Large handcrafted ceramic serving platter perfect for entertaining. Features beautiful glaze and sturdy construction. Ideal for cheese, appetizers, or desserts.',
      price: 1299,
      category: 'Ceramic Serveware',
      sku: 'PLATTER-PREMIUM',
      stock: 75,
      weight: 1.8,
      image: 'https://via.placeholder.com/400x400?text=Ceramic+Serving+Platter',
      rating: 5.0,
      reviews: 13,
      created_at: new Date().toISOString()
    },
    {
      id: 12,
      name: 'Artisan Ceramic Tea Set',
      description: 'Traditional ceramic tea set including teapot, 4 cups, and saucer. Perfect for tea enthusiasts who appreciate fine craftsmanship. Each piece is individually designed.',
      price: 2899,
      category: 'Ceramic Tableware',
      sku: 'TEA-SET-ARTISAN',
      stock: 35,
      weight: 3.5,
      image: 'https://via.placeholder.com/400x400?text=Ceramic+Tea+Set',
      rating: 4.9,
      reviews: 11,
      created_at: new Date().toISOString()
    },
    {
      id: 13,
      name: 'Ceramic Wall Art Panel Set',
      description: 'Modern ceramic wall art panel set of 3 with geometric designs. Perfect for adding contemporary style to any room. Each panel is individually crafted and glazed.',
      price: 2199,
      category: 'Ceramic Art',
      sku: 'WALL-ART-SET',
      stock: 40,
      weight: 2.0,
      image: 'https://via.placeholder.com/400x400?text=Ceramic+Wall+Art+Panel',
      rating: 4.7,
      reviews: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 14,
      name: 'Handcrafted Ceramic Bowl Set',
      description: 'Set of 5 handcrafted ceramic bowls in various sizes. Perfect for serving, storage, or decoration. Features beautiful glazing and comfortable design.',
      price: 1799,
      category: 'Ceramic Serveware',
      sku: 'BOWL-SET-5',
      stock: 50,
      weight: 2.3,
      image: 'https://via.placeholder.com/400x400?text=Ceramic+Bowl+Set',
      rating: 4.8,
      reviews: 10,
      created_at: new Date().toISOString()
    },
    {
      id: 15,
      name: 'Artisan Ceramic Figurine Collection',
      description: 'Exclusive collection of ceramic figurines with hand-painted details. Each piece is unique and showcases traditional ceramic artistry. Perfect for collectors.',
      price: 1999,
      category: 'Ceramic Art',
      sku: 'FIGURINE-COLLECTION',
      stock: 25,
      weight: 1.5,
      image: 'https://via.placeholder.com/400x400?text=Ceramic+Figurine+Collection',
      rating: 5.0,
      reviews: 12,
      created_at: new Date().toISOString()
    },
    {
      id: 16,
      name: 'Buddha Tulsi Ceramic Pot',
      description: 'Beautiful Buddha-shaped ceramic pot perfect for tulsi plants. Handcrafted with intricate details. No MOQ required.',
      price: 899,
      category: 'Ceramic Pots',
      sku: 'BUDDHA-POT',
      stock: 80,
      weight: 1.2,
      image: 'https://via.placeholder.com/400x400?text=Buddha+Tulsi+Pot',
      rating: 4.8,
      reviews: 15,
      created_at: new Date().toISOString()
    },
    {
      id: 17,
      name: 'Succulent Ceramic Pot Set',
      description: 'Set of 5 small ceramic pots perfect for succulents and small plants. Beautiful glazed finish. MOQ 5 pieces.',
      price: 1299,
      category: 'Ceramic Pots',
      sku: 'SUCCULENT-SET',
      stock: 90,
      weight: 1.5,
      image: 'https://via.placeholder.com/400x400?text=Succulent+Ceramic+Pots',
      rating: 4.9,
      reviews: 18,
      created_at: new Date().toISOString()
    },
    {
      id: 18,
      name: 'Animal Bird Ceramic Pot',
      description: 'Charming animal-shaped ceramic pot ideal for decorative plants. Handmade with personality. MOQ 5 pieces.',
      price: 1499,
      category: 'Ceramic Pots',
      sku: 'ANIMAL-BIRD-POT',
      stock: 70,
      weight: 1.8,
      image: 'https://via.placeholder.com/400x400?text=Animal+Bird+Ceramic+Pot',
      rating: 4.7,
      reviews: 12,
      created_at: new Date().toISOString()
    },
    {
      id: 19,
      name: 'Ceramic Pot Set Collection',
      description: 'Versatile set of 3 ceramic pots in different sizes. Perfect for indoor decoration. No MOQ required.',
      price: 1699,
      category: 'Ceramic Pots',
      sku: 'POT-SET-3',
      stock: 85,
      weight: 2.0,
      image: 'https://via.placeholder.com/400x400?text=Ceramic+Pot+Set+Collection',
      rating: 4.8,
      reviews: 14,
      created_at: new Date().toISOString()
    },
    {
      id: 20,
      name: 'Bonsai Tree Ceramic Pot',
      description: 'Premium ceramic pot for bonsai trees with drainage. Handcrafted with precision. No MOQ required.',
      price: 1899,
      category: 'Ceramic Pots',
      sku: 'BONSAI-POT',
      stock: 45,
      weight: 1.6,
      image: 'https://via.placeholder.com/400x400?text=Bonsai+Ceramic+Pot',
      rating: 5.0,
      reviews: 16,
      created_at: new Date().toISOString()
    },
    {
      id: 21,
      name: 'Large Outdoor Ceramic Pot',
      description: 'Spacious ceramic pot ideal for outdoor gardening and large plants. Weather-resistant glazing. No MOQ required.',
      price: 2499,
      category: 'Ceramic Pots',
      sku: 'LARGE-OUTDOOR-POT',
      stock: 55,
      weight: 3.2,
      image: 'https://via.placeholder.com/400x400?text=Large+Outdoor+Ceramic+Pot',
      rating: 4.7,
      reviews: 11,
      created_at: new Date().toISOString()
    },
    {
      id: 22,
      name: 'White Ceramic Pot Collection',
      description: 'Minimalist white ceramic pots perfect for modern interiors. Elegant simplicity in design. No MOQ required.',
      price: 1599,
      category: 'Ceramic Pots',
      sku: 'WHITE-POT-COL',
      stock: 100,
      weight: 2.0,
      image: 'https://via.placeholder.com/400x400?text=White+Ceramic+Pot+Collection',
      rating: 4.8,
      reviews: 13,
      created_at: new Date().toISOString()
    },
    {
      id: 23,
      name: 'Indoor Decorative Ceramic Pot',
      description: 'Stylish ceramic pot designed for indoor plants and decor. Brings elegance to any space. No MOQ required.',
      price: 1199,
      category: 'Ceramic Pots',
      sku: 'INDOOR-POT',
      stock: 110,
      weight: 1.4,
      image: 'https://via.placeholder.com/400x400?text=Indoor+Ceramic+Pot',
      rating: 4.9,
      reviews: 17,
      created_at: new Date().toISOString()
    },
    {
      id: 24,
      name: 'Face Pot Ceramic Planter',
      description: 'Unique face-shaped ceramic planter with expressive features. Great conversation starter. No MOQ required.',
      price: 1799,
      category: 'Ceramic Pots',
      sku: 'FACE-POT',
      stock: 60,
      weight: 1.7,
      image: 'https://via.placeholder.com/400x400?text=Face+Ceramic+Pot',
      rating: 4.8,
      reviews: 14,
      created_at: new Date().toISOString()
    },
    {
      id: 25,
      name: 'Ceramic Bottle Set',
      description: 'Handcrafted ceramic bottles set with beautiful glaze. Perfect for storing water or decorative purposes. No MOQ required.',
      price: 1099,
      category: 'Kitchenware',
      sku: 'BOTTLE-SET',
      stock: 75,
      weight: 1.2,
      image: 'https://via.placeholder.com/400x400?text=Ceramic+Bottle+Set',
      rating: 4.7,
      reviews: 10,
      created_at: new Date().toISOString()
    },
    {
      id: 26,
      name: 'Ceramic Cup & Saucer Collection',
      description: 'Elegant ceramic cups with matching saucers. Perfect for tea or coffee. No MOQ required.',
      price: 899,
      category: 'Kitchenware',
      sku: 'CUP-SAUCER-COL',
      stock: 120,
      weight: 0.8,
      image: 'https://via.placeholder.com/400x400?text=Ceramic+Cup+Saucer',
      rating: 4.9,
      reviews: 19,
      created_at: new Date().toISOString()
    },
    {
      id: 27,
      name: 'Ceramic Mug Set',
      description: 'Durable ceramic mugs with beautiful hand-painted designs. Perfect for daily use or gifting. MOQ 5 pieces.',
      price: 1299,
      category: 'Kitchenware',
      sku: 'MUG-SET-5',
      stock: 95,
      weight: 1.3,
      image: 'https://via.placeholder.com/400x400?text=Ceramic+Mug+Set',
      rating: 4.8,
      reviews: 16,
      created_at: new Date().toISOString()
    },
    {
      id: 28,
      name: 'Bathroom Ceramic Set',
      description: 'Complete ceramic bathroom set with soap dish, toothbrush holder, and towel rack. Elegant design.',
      price: 2199,
      category: 'Bathroom Sets',
      sku: 'BATH-SET',
      stock: 40,
      weight: 2.5,
      image: 'https://via.placeholder.com/400x400?text=Bathroom+Ceramic+Set',
      rating: 4.8,
      reviews: 12,
      created_at: new Date().toISOString()
    },
    {
      id: 29,
      name: 'Decorative Flower Vase',
      description: 'Large decorative ceramic vase perfect for flower arrangements. Hand-finished with glazing.',
      price: 1899,
      category: 'Flower Vase',
      sku: 'FLOWER-VASE',
      stock: 65,
      weight: 1.9,
      image: 'https://via.placeholder.com/400x400?text=Decorative+Flower+Vase',
      rating: 4.9,
      reviews: 14,
      created_at: new Date().toISOString()
    },
    {
      id: 30,
      name: 'Ceramic Home Decor Piece',
      description: 'Beautiful ceramic decor piece that adds character to any room. Perfect for shelves or tables.',
      price: 1499,
      category: 'Home Decor',
      sku: 'HOME-DECOR',
      stock: 70,
      weight: 1.5,
      image: 'https://via.placeholder.com/400x400?text=Ceramic+Home+Decor',
      rating: 4.8,
      reviews: 13,
      created_at: new Date().toISOString()
    }
  ];

  // Sample coupons
  data.coupons = [
    {
      id: 1,
      code: 'WELCOME20',
      discount_percent: 20,
      active: true,
      usage_limit: 100,
      usage_count: 0
    },
    {
      id: 2,
      code: 'CERAMIC15',
      discount_percent: 15,
      active: true,
      usage_limit: 50,
      usage_count: 0
    }
  ];
};

const saveData = () => {
  try {
    const dataFile = path.join(DATA_DIR, 'data.json');
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error saving data:', err);
  }
};

// API Methods

// Users
const getAllUsers = () => data.users;
const getUserById = (id) => data.users.find(u => u.id === id);
const getUserByEmail = (email) => data.users.find(u => u.email === email);
const addUser = (user) => {
  user.id = Math.max(...data.users.map(u => u.id || 0), 0) + 1;
  user.created_at = new Date().toISOString();
  data.users.push(user);
  saveData();
  return user;
};

// Products
const getAllProducts = () => data.products;
const getProductById = (id) => data.products.find(p => p.id == id);
const getProductsByCat = (category) => data.products.filter(p => p.category === category);
const addProduct = (product) => {
  product.id = Math.max(...data.products.map(p => p.id || 0), 0) + 1;
  product.created_at = new Date().toISOString();
  product.rating = 5.0;
  product.reviews = 0;
  data.products.push(product);
  saveData();
  return product;
};
const updateProduct = (id, product) => {
  const index = data.products.findIndex(p => p.id == id);
  if (index !== -1) {
    data.products[index] = { ...data.products[index], ...product };
    saveData();
    return data.products[index];
  }
  return null;
};
const deleteProduct = (id) => {
  data.products = data.products.filter(p => p.id != id);
  saveData();
  return true;
};

// Orders
const getAllOrders = () => data.orders;
const getOrderById = (id) => data.orders.find(o => o.id == id);
const getOrdersByUserId = (userId) => data.orders.filter(o => o.user_id == userId);
const addOrder = (order) => {
  order.id = Math.max(...data.orders.map(o => o.id || 0), 0) + 1;
  order.created_at = new Date().toISOString();
  data.orders.push(order);
  saveData();
  return order;
};
const updateOrderStatus = (id, status) => {
  const order = data.orders.find(o => o.id == id);
  if (order) {
    order.status = status;
    saveData();
  }
  return order;
};

// Cart
const getCartByUserId = (userId) => {
  return data.cartItems
    .filter(c => c.user_id == userId)
    .map(c => {
      const product = data.products.find(p => p.id == c.product_id);
      return {
        id: c.id,
        product_id: c.product_id,
        user_id: c.user_id,
        quantity: c.quantity,
        ...product
      };
    });
};

const addToCart = (userId, productId, quantity) => {
  const existing = data.cartItems.find(c => c.user_id == userId && c.product_id == productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    const cartItem = {
      id: Math.max(...data.cartItems.map(c => c.id || 0), 0) + 1,
      user_id: userId,
      product_id: productId,
      quantity: quantity,
      created_at: new Date().toISOString()
    };
    data.cartItems.push(cartItem);
  }
  saveData();
  return getCartByUserId(userId).find(c => c.product_id == productId);
};

const removeFromCart = (cartItemId) => {
  data.cartItems = data.cartItems.filter(c => c.id != cartItemId);
  saveData();
};

const updateCartItem = (cartItemId, quantity) => {
  const item = data.cartItems.find(c => c.id == cartItemId);
  if (item) {
    item.quantity = quantity;
    saveData();
    const product = data.products.find(p => p.id == item.product_id);
    return { ...item, ...product };
  }
  return item;
};

const clearCart = (userId) => {
  data.cartItems = data.cartItems.filter(c => c.user_id != userId);
  saveData();
};

// Wishlist
const getWishlistByUserId = (userId) => {
  return data.wishlistItems
    .filter(w => w.user_id == userId)
    .map(w => {
      const product = data.products.find(p => p.id == w.product_id);
      return {
        id: w.id,
        product_id: w.product_id,
        user_id: w.user_id,
        ...product
      };
    });
};

const addToWishlist = (userId, productId) => {
  const existing = data.wishlistItems.find(w => w.user_id == userId && w.product_id == productId);
  if (!existing) {
    const wishlistItem = {
      id: Math.max(...data.wishlistItems.map(w => w.id || 0), 0) + 1,
      user_id: userId,
      product_id: productId,
      created_at: new Date().toISOString()
    };
    data.wishlistItems.push(wishlistItem);
  }
  saveData();
  return getWishlistByUserId(userId).find(w => w.product_id == productId);
};

const removeFromWishlist = (wishlistItemId) => {
  data.wishlistItems = data.wishlistItems.filter(w => w.id != wishlistItemId);
  saveData();
};

// Users
const updateUser = (userId, updates) => {
  const user = data.users.find(u => u.id == userId);
  if (user) {
    Object.assign(user, updates);
    saveData();
  }
  return user;
};

// Coupons
const getAllCoupons = () => data.coupons;
const getCouponByCode = (code) => data.coupons.find(c => c.code === code);
const addCoupon = (coupon) => {
  coupon.id = Math.max(...data.coupons.map(c => c.id || 0), 0) + 1;
  data.coupons.push(coupon);
  saveData();
  return coupon;
};

// Initialize
initializeData();

module.exports = {
  // Users
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser,
  
  // Products
  getAllProducts,
  getProductById,
  getProductsByCat,
  addProduct,
  updateProduct,
  deleteProduct,
  
  // Cart
  getCartByUserId,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  
  // Wishlist
  getWishlistByUserId,
  addToWishlist,
  removeFromWishlist,
  
  // Orders
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  addOrder,
  updateOrderStatus,
  
  // Coupons
  getAllCoupons,
  getCouponByCode,
  addCoupon,
  
  // Utility
  saveData
};
