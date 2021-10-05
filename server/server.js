// Importar config
require('./config/config');
const express = require('express');

// Importar mongoose
const mongoose = require('mongoose');

const app = express();
// --------------------------------------------------------
// Importar bodyParser
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// Importamos y usamos la ruta del usuario
app.use(require('./routes/usuario'));

// parse application/json
app.use(bodyParser.json());
// ------------------------------------------------

/**
 * Establecer la conexion a la base de datos, definir callback
 */
mongoose.connect(process.env.urlDB, (err, res) => {
  if (err) {
    throw err;
  }
  console.log('Base de datos ONLINE');
});

/**
 * Ya no va ser el puerto 3000 ya que existe una variable global en el objeto
 * process
 */
app.listen(process.env.PORT, function () {
  console.log('Escuchando al puerto', process.env.PORT);
});
