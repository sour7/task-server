// database.js

const Sequelize = require('sequelize');

const sequelize = new Sequelize('your_database', 'sourabhk', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  pool:{
    max:5,
    min:0,
    acquire:3000,
    idle:10000
  }
});



module.exports = sequelize;
