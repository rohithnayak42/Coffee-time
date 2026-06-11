import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    // Map postgres rows to match frontend expected format (e.g. is_special -> isSpecial)
    const products = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      originalPrice: row.original_price ? parseFloat(row.original_price) : null,
      rating: parseFloat(row.rating),
      image: row.image,
      category: row.category,
      isSpecial: row.is_special
    }));
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create an order
app.post('/api/orders', async (req, res) => {
  const { customer, items, total, gst, grandTotal } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    
    // Insert order
    const orderResult = await client.query(
      `INSERT INTO orders 
       (customer_name, email, phone, address, city, pincode, payment_method, subtotal, gst, total_amount, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [
        customer.fullName, 
        customer.email, 
        customer.phone, 
        customer.address, 
        customer.city, 
        customer.pincode, 
        customer.paymentMethod,
        total,
        gst,
        grandTotal,
        'pending'
      ]
    );
    
    const orderId = orderResult.rows[0].id;

    // Insert order items
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) 
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.id, item.quantity, item.price]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ success: true, orderId, message: 'Order placed successfully' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to place order' });
  } finally {
    client.release();
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
