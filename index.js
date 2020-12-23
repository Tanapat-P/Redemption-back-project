require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
require('./config/passport');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const rewardRoutes = require('./routes/reward');
const pointRoutes = require('./routes/point');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('images'));
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/rewards', rewardRoutes);
app.use('/points', pointRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is running');
});

db.sequelize
  .sync()
  .then(() => {
    console.log('Data sync');
  })
  .catch((err) => {
    console.log(err);
  });
