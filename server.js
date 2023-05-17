// server.js

const express = require('express');
const pg= require("pg")
// const database= require('./database')
const app = express();
const port = 3000;

const db = require('./database');
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());

app.use('/users', userRoutes);
app.use('/lists', listRoutes);
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
