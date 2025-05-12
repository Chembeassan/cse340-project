const express = require('express');
const app = express();

// 1. Make sure you have these requires:
const staticRoutes = require('./routes/static');

// 2. View engine setup (if using EJS)
app.set('view engine', 'ejs');
app.set('views', './views');

// 3. Route registration (MOST IMPORTANT PART)
app.use('/', staticRoutes); // This connects your static.js routes

app.listen(5500, () => {
  console.log('Server running on port 5500');
});
