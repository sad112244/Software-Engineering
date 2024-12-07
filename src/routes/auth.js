const express = require('express');
const bcrypt = require('bcrypt');
const { db } = require('../database/init');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', { message: req.session.message });
  delete req.session.message;
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hashedPassword);
    req.session.message = 'Registration successful! Please sign in to continue.';
    res.redirect('/');
  } catch (error) {
    res.render('signup', { error: 'Username already exists' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.id;
    req.session.message = 'Signed in successfully!';
    res.redirect('/reviews');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;