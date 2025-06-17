const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: 'Laptop', description: 'High-performance laptop with 16GB RAM', price: 1200, category: 'electronics', inStock: true },
  { id: 2, name: 'Smartphone', description: 'Latest model with 128GB storage', price: 800, category: 'electronics', inStock: true },
  { id: 3, name: 'Coffee Maker', description: 'Programmable coffee maker with timer', price: 50, category: 'kitchen', inStock: false },
];

// GET /api/products - with filters, pagination, search
router.get('/', (req, res) => {
  let { category, search, page = 1, limit = 10 } = req.query;

  let results = [...products];

  if (category) {
    results = results.filter(product => product.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const searchLower = search.toLowerCase();
    results = results.filter(product => product.name.toLowerCase().includes(searchLower));
  }

  // Pagination
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = results.slice(start, end);

  res.json({
    total: results.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginated,
  });
});

// GET /api/products/stats - product count by category
router.get('/stats', (req, res) => {
  const stats = {};

  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });

  res.json({ totalProducts: products.length, countByCategory: stats });
});

module.exports = router;
