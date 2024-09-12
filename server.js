const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const db = require('./db'); // Asegúrate de que este archivo exporta correctamente la configuración de la base de datos

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar el middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar el marcado de entrada
app.post('/mark-entry', (req, res) => {
  const { userId } = req.body;

  // Insertar un nuevo registro de entrada en la tabla Asistencias
  db.query('INSERT INTO Asistencias (id_usuario, tipo, fecha) VALUES (?, ?, ?)', [userId, 'entrada', new Date()], (err, results) => {
    if (err) {
      console.error('Error al insertar en la tabla Asistencias: ' + err);
      return res.status(500).send('Error en el servidor');
    }
    res.send('Entrada registrada con éxito');
  });
});

// Ruta para manejar el marcado de salida
app.post('/mark-exit', (req, res) => {
  const { userId } = req.body;

  // Insertar un nuevo registro de salida en la tabla Asistencias
  db.query('INSERT INTO Asistencias (id_usuario, tipo, fecha) VALUES (?, ?, ?)', [userId, 'salida', new Date()], (err, results) => {
    if (err) {
      console.error('Error al insertar en la tabla Asistencias: ' + err);
      return res.status(500).send('Error en el servidor');
    }
    res.send('Salida registrada con éxito');
  });
});

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Consultar el usuario en la base de datos
  db.query('SELECT * FROM Usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error en la consulta: ' + err);
      return res.status(500).send('Error en el servidor');
    }

    if (results.length === 0) {
      // Usuario no encontrado
      return res.status(401).send('Usuario o contraseña incorrectos');
    }

    const usuario = results[0];

    // Comparar la contraseña proporcionada con la contraseña en la base de datos
    if (password === usuario.contraseña) {
      // Contraseña correcta
      res.redirect('/attendance.html'); // Redirigir al usuario a la página de asistencia
    } else {
      // Contraseña incorrecta
      res.status(401).send('Usuario o contraseña incorrectos');
    }
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
