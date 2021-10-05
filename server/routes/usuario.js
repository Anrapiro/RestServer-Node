// importar express
const express = require('express');

// importar bcrypt
const bcrypt = require('bcrypt');

// Importar underscore, el uso estandar es un guion bajo
const _ = require('underscore');

// Importar el modelo Usuario al objeto Usuario
const Usuario = require('../models/usuario');

const app = express();

/**
 * Peticiones get
 * Obtenemos los registros de la base de datos
 */
app.get('/usuario', (req, res) => {

  // Asignamos un desde (inicio) de los registros a consultar
  let desde = req.query.desde || 0;
  // Asignamos un limete a los registros a consultar
  let limite = req.query.limite || 5;

  // convertimos el valor de la variable en un numero
  desde = Number(desde); 
  // convertimos el valor de la variable en un numero
  limite = Number(limite);

  // consulta los registros de usuario en la DB con el estado true
  Usuario.find({estado:true}, 'nombre email role img google estado')
    .skip(desde) // Realiza un salto de resgistros de 5 en 5
    .limit(limite) // Asignamos un limite de 5 registros a la consulta
    .exec( (err, usuarios) => {

      if (err) {
        return res.status(400).json({
          ok: false,
          err: err
        });
      }

      // Contar registros de la base de datos, con el estado true
      Usuario.count({estado:true}, (err, countData) => {

        res.json({
          ok: true,
          usuarios: usuarios,
          conteo: countData
        });

      });

  });
});


/**
 * Peticiones post
 * Es utilizado cuando requiere crear nuevos registros
 *
 * Obtener la informacion del POST que estamos mandando de nuestra
 * aplicacion a nuestro servidor REST.
 */
app.post('/usuario', (req, res) => {
  // req.body aparecera cuando procesemos cualquier peelot ue reciban la peticiones
  const body = req.body;

  // objeto de tipo usuario con valores
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    // bcrypt.hashSync(valor,numero de vueltas hash)
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  // Grabar en la base de datos
  usuario.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err: err
      });
    }

    // En caso que no haya error
    res.json({
      ok: true,
      usuario: userDB
    });
  });
});

/**
 * peticiones put
 * Es utilizado comunmente cuando requiere actualizar data
 */
app.put('/usuario/:id', (req, res) => {
  /**
   * variable id que almacena el valor del parametro con el nombre id
   * por medio del req
   */
  const id = req.params.id;

  // Obtenemos el body del req, y enviamos los valores permitidos a actualizar
  const body = _.pick(req.body, ['nombre','email','role','img','estado']);

  // Busca por el id y actualiza el registro.
  Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
    
    if (err) {
      return res.status(400).json({
        ok: false,
        err: err
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB 
    });

  });
});

/**
 * peticiones delete
 * Es utilizado para borrar data, aunque actualmente los
 * registros cambian de estado (actualizan)
 */
app.delete('/usuario/:id', (req, res) => {
  
  const id = req.params.id;

  // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {estado: false}
  
  // cambia el estado del registro a false
  Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, usuarioBorrado) => {
    
    if (err) {
      return res.status(400).json({
        ok: false,
        err: err
      });
    }

    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'No existe un usuario'
        }
      });
    }

    res.json({
      ok: true,
      usuario: usuarioBorrado
    });

  });
});

module.exports = app;
