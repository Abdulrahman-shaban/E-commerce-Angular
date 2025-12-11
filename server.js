require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { connectDB } = require('./src/config/database');
const routes = require('./src/routes');
const { errorHandler } = require('./src/middlewares/error.middleware');
const authRoutes = require('./src/routes/v1/auth.routes');
const productRoutes = require('./src/routes/v1/product.routes');
const categoryRoutes = require('./src/routes/v1/category.routes');
const { slugify } = require('./src/utils/slugify.js');


const app = express();
const PORT = process.env.PORT || 5000;

// connect db
connectDB(process.env.MONGO_URI);

app.use(helmet());
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// routes
app.use('/api/v1', routes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);

// health
app.get('/health', (req, res) => res.json({ ok: true }));

// error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
