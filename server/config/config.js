/**
 * process es un objeto global que esta ejecutandose a lo largo de toda la
 * aplicacion de node y tambien ese objeto es actualizado dependiendo del entorno.
 */

// ================================
// PUERTO
// ================================
// modificar el process.envaironet
process.env.PORT = process.env.PORT || 3000;

// ================================
// ENTORNOS
// ================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urlDB;

if (process.env.NODE_ENV === 'dev') {
    // ENTORNO DE DESARROLLO DB
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    // ENTORNO DE PRODUCCION DB
    urlDB = process.env.MONGODB_URI;
}

process.env.urlDB = urlDB;
