const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seedDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  try {
    // Create database
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'claynest'}`);
    await connection.execute(`USE ${process.env.DB_NAME || 'claynest'}`);

    // Create tables
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role ENUM('customer', 'admin') DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description LONGTEXT,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        sku VARCHAR(100) NOT NULL,
        stock INT DEFAULT 0,
        image LONGTEXT,
        weight DECIMAL(5, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_wishlist (user_id, product_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        discount DECIMAL(10, 2) DEFAULT 0,
        shipping_address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        zip_code VARCHAR(10) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
        razorpay_order_id VARCHAR(255),
        shiprocket_order_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS coupons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(100) UNIQUE NOT NULL,
        discount_percent INT NOT NULL,
        expires_at DATETIME,
        usage_limit INT,
        usage_count INT DEFAULT 0,
        active BOOLEAN DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✓ Database tables created successfully!');

    // Hash admin password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Add admin user
    await connection.execute(
      'INSERT IGNORE INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      ['Admin User', 'admin@claynest.com', hashedPassword, '9369635323', 'admin']
    );
    console.log('✓ Admin user added');

    // Seed ceramic products inspired by CokoIndia collection
    const ceramicProducts = [
      {
        name: 'Sage Bloom Dinner Set of 6',
        description: 'Elegant sage green ceramic dinner set for 6 people. Microwave and dishwasher safe. Features premium glazing and comfortable grip handles. Perfect for dining and special occasions.',
        price: 2999,
        category: 'Ceramic Dinner Sets',
        sku: 'SAGE-BLOOM-6',
        stock: 10,
        weight: 4.2,
        image: 'https://via.placeholder.com/400x400?text=Sage+Bloom+Dinner+Set+6'
      },
      {
        name: 'Ivory Whisper Dinner Set of 6',
        description: 'Beautiful ivory ceramic dinner set for 6 people featuring classic design. Each piece is hand-finished for durability and style. Includes dinner plates, side plates, and bowls.',
        price: 3699,
        category: 'Ceramic Dinner Sets',
        sku: 'IVORY-WHISPER-6',
        stock: 45,
        weight: 4.5,
        image: 'https://via.placeholder.com/400x400?text=Ivory+Whisper+Dinner+Set+6'
      },
      {
        name: 'Vanilla Drift Dinner Set of 6',
        description: 'Sophisticated vanilla cream ceramic dinner set for 6 people. Premium quality ceramics with smooth finish. Perfect for both everyday use and special occasions.',
        price: 3699,
        category: 'Ceramic Dinner Sets',
        sku: 'VANILLA-DRIFT-6',
        stock: 40,
        weight: 4.3,
        image: 'https://via.placeholder.com/400x400?text=Vanilla+Drift+Dinner+Set+6'
      },
      {
        name: 'Desert Bloom Dinner Set of 6',
        description: 'Warm desert-inspired ceramic dinner set for 6 people with beautiful neutral tones. Perfect for creating an elegant dining experience with family and friends.',
        price: 3499,
        category: 'Ceramic Dinner Sets',
        sku: 'DESERT-BLOOM-6',
        stock: 48,
        weight: 4.1,
        image: 'https://via.placeholder.com/400x400?text=Desert+Bloom+Dinner+Set+6'
      },
      {
        name: 'Sienna Clay Dinner Set of 6',
        description: 'Handcrafted sienna-toned ceramic dinner set for 6 people featuring earthy aesthetics. Each piece showcases traditional ceramic artistry combined with modern functionality.',
        price: 3299,
        category: 'Ceramic Dinner Sets',
        sku: 'SIENNA-CLAY-6',
        stock: 52,
        weight: 4.4,
        image: 'https://via.placeholder.com/400x400?text=Sienna+Clay+Dinner+Set+6'
      },
      {
        name: 'Champagne Soleil Dinner Set of 6',
        description: 'Luxurious champagne-gold ceramic dinner set for 6 people with elegant finish. Features subtle metallic accents for a sophisticated dining experience.',
        price: 2499,
        category: 'Ceramic Dinner Sets',
        sku: 'CHAMPAGNE-SOLEIL-6',
        stock: 55,
        weight: 4.2,
        image: 'https://via.placeholder.com/400x400?text=Champagne+Soleil+Dinner+Set+6'
      },
      {
        name: 'Sage Bloom Dinner Set of 4',
        description: 'Perfect for small households and couples. Sage green ceramic dinner set for 4 people with the same premium quality as the 6-piece set. Compact and stylish.',
        price: 2199,
        category: 'Ceramic Dinner Sets',
        sku: 'SAGE-BLOOM-4',
        stock: 60,
        weight: 2.8,
        image: 'https://via.placeholder.com/400x400?text=Sage+Bloom+Dinner+Set+4'
      },
      {
        name: 'Ivory Whisper Dinner Set of 4',
        description: 'Classic ivory ceramic dinner set for 4 people. Ideal for small families and intimate gatherings. Features the same hand-finished quality as larger sets.',
        price: 2499,
        category: 'Ceramic Dinner Sets',
        sku: 'IVORY-WHISPER-4',
        stock: 58,
        weight: 3.0,
        image: 'https://via.placeholder.com/400x400?text=Ivory+Whisper+Dinner+Set+4'
      },
      {
        name: 'Ceramic Decorative Vase Collection',
        description: 'Set of 3 handcrafted ceramic vases with intricate patterns. Perfect for flower arrangements or standalone decoration. Each vase has unique artistic details.',
        price: 1899,
        category: 'Ceramic Decor',
        sku: 'VASE-COLLECTION',
        stock: 0,
        weight: 2.5,
        image: 'https://via.placeholder.com/400x400?text=Ceramic+Vase+Collection'
      },
      {
        name: 'Hand-painted Ceramic Planter Set',
        description: 'Beautiful set of 4 hand-painted ceramic planters with drainage holes. Perfect for small plants, succulents, and indoor gardening. Made from premium clay.',
        price: 1599,
        category: 'Ceramic Planters',
        sku: 'PLANTER-SET-4',
        stock: 65,
        weight: 2.2,
        image: 'https://via.placeholder.com/400x400?text=Ceramic+Planter+Set'
      },
      {
        name: 'Premium Ceramic Serving Platter',
        description: 'Large handcrafted ceramic serving platter perfect for entertaining. Features beautiful glaze and sturdy construction. Ideal for cheese, appetizers, or desserts.',
        price: 1299,
        category: 'Ceramic Serveware',
        sku: 'PLATTER-PREMIUM',
        stock: 75,
        weight: 1.8,
        image: 'https://via.placeholder.com/400x400?text=Ceramic+Serving+Platter'
      },
      {
        name: 'Artisan Ceramic Tea Set',
        description: 'Traditional ceramic tea set including teapot, 4 cups, and saucer. Perfect for tea enthusiasts who appreciate fine craftsmanship. Each piece is individually designed.',
        price: 2899,
        category: 'Ceramic Tableware',
        sku: 'TEA-SET-ARTISAN',
        stock: 35,
        weight: 3.5,
        image: 'https://via.placeholder.com/400x400?text=Ceramic+Tea+Set'
      },
      {
        name: 'Ceramic Wall Art Panel Set',
        description: 'Modern ceramic wall art panel set of 3 with geometric designs. Perfect for adding contemporary style to any room. Each panel is individually crafted and glazed.',
        price: 2199,
        category: 'Ceramic Art',
        sku: 'WALL-ART-SET',
        stock: 40,
        weight: 2.0,
        image: 'https://via.placeholder.com/400x400?text=Ceramic+Wall+Art+Panel'
      },
      {
        name: 'Handcrafted Ceramic Bowl Set',
        description: 'Set of 5 handcrafted ceramic bowls in various sizes. Perfect for serving, storage, or decoration. Features beautiful glazing and comfortable design.',
        price: 1799,
        category: 'Ceramic Serveware',
        sku: 'BOWL-SET-5',
        stock: 50,
        weight: 2.3,
        image: 'https://via.placeholder.com/400x400?text=Ceramic+Bowl+Set'
      },
      {
        name: 'Artisan Ceramic Figurine Collection',
        description: 'Exclusive collection of ceramic figurines with hand-painted details. Each piece is unique and showcases traditional ceramic artistry. Perfect for collectors.',
        price: 1999,
        category: 'Ceramic Art',
        sku: 'FIGURINE-COLLECTION',
        stock: 25,
        weight: 1.5,
        image: 'https://via.placeholder.com/400x400?text=Ceramic+Figurine+Collection'
      }
    ];

    for (const product of ceramicProducts) {
      try {
        await connection.execute(
          'INSERT IGNORE INTO products (name, description, price, category, sku, stock, image, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [product.name, product.description, product.price, product.category, product.sku, product.stock, product.image, product.weight]
        );
      } catch (err) {
        if (err.code !== 'ER_DUP_ENTRY') {
          console.error('Product insert error:', err);
        }
      }
    }
    console.log('✓ 15 Premium Ceramic products added!');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Admin Account:');
    console.log('   Email: admin@claynest.com');
    console.log('   Password: admin123');
    console.log('   Phone: 9369635323\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await connection.end();
  }
};

seedDatabase();
