// Import mongoose
const mongoose = require('mongoose');
// Import mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

// const Schema = mongoose.Schema();

// Valores validos para los roles
const rolesValid = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol valido'
};

// definimos la esquema usuario con sus parametros
const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario']
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio']
  },
  google: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    // valores validos
    enum: rolesValid
  },
  img: {
    type: String
  },
  estado: {
    type: Boolean,
    default: true
  }
});

// Modificar el metodo toJSON de la esquema usuario
UsuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

// Le pedimos a la esquema que use un plugin en particular
UsuarioSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser unico'
});

// Exportar el modelo usuario con la configuracion de UsuarioSchema
module.exports = mongoose.model('Usuario', UsuarioSchema);