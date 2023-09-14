
const express = require("express");
const colors = require('colors')
const env = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT ?? 8000;

connectDB()

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use ('/api/users', require('./routes/userRoutes'))
app.use ('/api/products', require('./routes/productRoutes'))
app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started on port ${port}`))