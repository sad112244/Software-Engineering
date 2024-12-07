const express = require('express');
const { db } = require('../database/init');

const router = express.Router();

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }
  next();
};

router.get('/', requireAuth, (req, res) => {
  const reviews = db.prepare(`
    SELECT reviews.*, users.username 
    FROM reviews 
    JOIN users ON reviews.user_id = users.id 
    ORDER BY created_at DESC
  `).all();
  res.render('reviews', { reviews });
});

router.post('/new', requireAuth, (req, res) => {
  const { bookTitle, reviewText, rating } = req.body;
  db.prepare(`
    INSERT INTO reviews (user_id, book_title, review_text, rating)
    VALUES (?, ?, ?, ?)
  `).run(req.session.userId, bookTitle, reviewText, rating);
  res.redirect('/reviews');
});

module.exports = router;