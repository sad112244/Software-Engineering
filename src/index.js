const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviews');
const { initializeDatabase } = require('./database/init');

const app = express();
const PORT = 3000;

// Initialize database
initializeDatabase();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: false
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', authRoutes);
app.use('/reviews', reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});