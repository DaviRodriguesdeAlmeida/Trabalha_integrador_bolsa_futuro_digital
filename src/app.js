const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// console.log("oi")
const usuarios_routes = require('./routes/usuarios');
const profissionais_routes = require('./routes/profissionais');
const servicos_routes = require('./routes/servicos');
const horarios_routes = require('./routes/horarios');
// const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/horarios', horarios_routes);
app.use('/usuarios', usuarios_routes);
app.use('/profissionais', profissionais_routes);
app.use('/servicos', servicos_routes);


module.exports = app;
