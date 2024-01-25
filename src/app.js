import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

import logger from './config/logger.js';
import ErrorHandler from './middlewares/ErrorHandler.js';
import { __dirname } from './utils/utils.js';

// Import routers
import indexRouter from './routers/views/index.router.js';
import productViewRouter from './routers/views/product.router.js';
import cartViewRouter from './routers/views/cart.router.js'; 
import messageViewRouter from './routers/views/message.router.js'; 
import usersRouter from './routers/api/users.router.js';
import productApiRouter from './routers/api/product.router.js';
import cartApiRouter from './routers/api/cart.router.js';
import messageApiRouter from './routers/api/message.router.js';

const app = express();


// Middleware

app.use(ErrorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');



// Routers
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productApiRouter);
app.use('/api/cart', cartApiRouter);
app.use('/api/message', messageApiRouter);
app.use('/products', productViewRouter);
app.use('/cart', cartViewRouter);
app.use('/messages', messageViewRouter);



//Others
import UserDao from './daoFactory.js';



app.get('/', (req, res) => {
  res.send('Hello from backend 🖐️');
});


// Error handling middleware
app.use((error, req, res, next) => {
  logger.error(`An error has occurred 😨: ${error.message}`);
  res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
});

// 404 Not Found middleware
app.use((req, res) => {
  logger.warn('Route not found');
  res.status(404).json({ status: 'error', message: 'Route not found' });
});


export default app;

