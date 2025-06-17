const express = require('express')
const app = express()

const productRoutes = require('./routes/products');
app.use(express.json());
app.use('/api/products', productRoutes);

const port = process.env.PORT || 3000
app.get('/', (req, res) => {
  res. send('Hello World!')
})
app. listen(port, () => {
  console.log(`Listening port on ${port}`)
})


// errors.js - Custom error classes for better error handling
const express = require('express');
const { NotFoundError, ValidationError } = require('./errors');

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Example: trigger a NotFoundError
app.get('/fail', (req, res) => {
  throw new NotFoundError('This page does not exist');
});

// 404 handler (if no route matches)
app.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Something went wrong',
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
