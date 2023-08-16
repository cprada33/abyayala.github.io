const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: '162.241.203.117', // Cambia esto si tu base de datos está en otro servidor
  user: 'abyayal6_cprada', // Reemplaza con tu nombre de usuario de MySQL
  password: '#Sinergia10', // Reemplaza con tu contraseña de MySQL
  database: 'abyayal6_DisponibilidadReservas' // Reemplaza con el nombre de tu base de datos
});

// Conexión a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;
