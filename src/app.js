const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// console.log("oi")
const usuarios_routes = require('./routes/usuarios');
// const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/usuarios', usuarios_routes);

// app.use(errorMiddleware);

module.exports = app;