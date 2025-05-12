const express = require('express');
const router = express.Router();

// Add this route handler:
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Keep your existing static file routes
router.use(express.static('public'));
router.use('/css', express.static(__dirname + '/public/css'));
router.use('/js', express.static(__dirname + '/public/js'));
router.use('/images', express.static(__dirname + '/public/images'));

module.exports = router;
