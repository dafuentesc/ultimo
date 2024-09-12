// db.js
const mysql = require('mysql2');

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia esto por tu usuario de MySQL
  password: '3396', // Cambia esto por tu contraseña de MySQL
  database: 'bdo_integracion'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos.');
});

module.exports = connection;
