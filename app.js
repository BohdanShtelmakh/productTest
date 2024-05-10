const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const sequelize = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const port = process.env.PORT;
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const { initProductModel } = require('./models/product');
const { initUserModel } = require('./models/user');
const swagger = require('./util/swagger');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);
app.use('/product', authMiddleware, productsRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'It works!'
  });
})

swagger(app);

app.use(errorMiddleware);

async function migrate() {
  await sequelize.authenticate();
  await initUserModel();
  await initProductModel();
  await sequelize.sync({ force: true });
}

app.listen(port, async () => {
  console.log(`running on port ${port}`);
  if(process.env.NODE_ENV !== 'test')
  await migrate();
})

module.exports = {app, migrate};
