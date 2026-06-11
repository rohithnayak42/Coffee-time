import pool from './db.js';
import { products } from '../src/data/products.js';

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Beginning database seed...');
    await client.query('BEGIN');

    // 1. Drop existing tables if they exist
    console.log('Dropping old tables...');
    await client.query(`
      DROP TABLE IF EXISTS order_items;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
    `);

    // 2. Create Products table (string IDs like 'hc-1', 'cc-2')
    console.log('Creating products table...');
    await client.query(`
      CREATE TABLE products (
        id VARCHAR(20) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        original_price DECIMAL(10, 2),
        rating DECIMAL(3, 1),
        image TEXT,
        category VARCHAR(100),
        is_special BOOLEAN DEFAULT FALSE,
        available BOOLEAN DEFAULT TRUE
      )
    `);

    // 3. Create Orders table
    console.log('Creating orders table...');
    await client.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        pincode VARCHAR(20) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        gst DECIMAL(10, 2) NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 4. Create Order Items table
    console.log('Creating order_items table...');
    await client.query(`
      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id VARCHAR(20) REFERENCES products(id) ON DELETE RESTRICT,
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      )
    `);

    // 5. Seed Products
    console.log(`Inserting ${products.length} products...`);
    for (const product of products) {
      await client.query(`
        INSERT INTO products (id, name, description, price, original_price, rating, image, category, is_special, available)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        product.id,
        product.name,
        product.description,
        product.price,
        product.originalPrice || null,
        product.rating,
        product.image,
        product.category,
        product.isSpecial || false,
        product.available !== false
      ]);
    }

    await client.query('COMMIT');
    console.log(`Database seeded successfully with ${products.length} products!`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Failed to seed database:', err);
  } finally {
    client.release();
    pool.end();
  }
}

seed();
