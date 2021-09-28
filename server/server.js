// Importar config
// Al ejecutar la aplicacion leera el archivo y en ese momento se configura el
// contenido
require('./config/config');
const express = require('express');
const app = express();
// --------------------------------------------------------
// Importar bodyParser
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());
// ------------------------------------------------

/**
 * Peticiones get
 * puede actualizar o crear data de una forma mas privada ocultando la data
 */
app.get('/usuario', (req, res) => {
  res.json('get usuarios');
});

// peticion obtener parametros
app.get('/usuario/:id', (req, res) => {
  /**
   * variable id que almacena el valor del parametro con el nombre id
   * por medio del req
   */
  const id = req.params.id;
  res.json({
    id: id
  });
});

/**
 * Peticiones post
 * Es utilizado cuando requiere crear nuevos registros
 */
// app.post('/usuario', (req, res) => {
//   res.json('post usuarios');
// });

// ------------------------------------------------------------------

/**
 * Obtener la informacion del POST que estamos mandando de nuestra
 * aplicacion a nuestro servidor REST.
 */
// app.post('/usuario', (req, res) => {
//   // req.body aparecera cuando procesemos cualquier peelot que reciban la peticiones
//   const body = req.body;
//   res.json({
//     persona: body
//   });
// });

//  =================================================================
app.post('/usuario', (req, res) => {
  // req.body aparecera cuando procesemos cualquier peelot que reciban la peticiones
  const body = req.body;
  // Evaluar el parametro nombre
  if (body.nombre === undefined) {
    // De esta manera podemos mandar el codigo de respuesta a la persona que hizo
    // la solicitud: status 400: bad request, es comun cuando no mandamos la informacion
    // como el servicio la respera
    res.status(400).json({
      ok: false,
      mensaje: 'El nombre es necesario'
    });
  } else {
    // Respuesta con los parametros en un formato json
    res.json({
      persona: body
    });
  }
});
//  =================================================================
// ------------------------------------------------------------------

/**
 * peticiones put
 * Es utilizado comunmente cuando requiere actualizar data
 */
app.put('/usuario', (req, res) => {
  res.json('put usuarios');
});

/**
 * peticiones delete
 * Es utilizado para borrar data, aunque actualmente los
 * registros cambian de estado (actualizan)
 */
app.delete('/usuario', (req, res) => {
  res.json('delete usuarios');
});

// Puerto del servidor
// app.listen(3000, function () {
//   console.log('Escuchando al puerto 3000');
// });

/**
 * Ya no va ser el puerto 3000 ya que existe una variable global en el objeto
 * process
 */
app.listen(process.env.PORT, function () {
  console.log('Escuchando al puerto ', process.env.PORT);
});
