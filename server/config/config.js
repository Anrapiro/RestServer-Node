/**
 * process es un objeto global que esta ejecutandose a lo largo de toda la
 * aplicacion de node y tambien ese objeto es actualizado dependiendo del entorno.
 */

// ================================
// PUERTO
// ================================
// modificar el process.envaironet
process.env.PORT = process.env.PORT || 3000;
