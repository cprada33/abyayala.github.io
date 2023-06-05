const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db.js');
const publicPath = path.join(__dirname, '../');
app.use(express.static(publicPath));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// AGREGAR FECHAS A LA BASE DE DATOS
app.post('/datos', (req, res) => {
  console.log('Ruta /datos alcanzada');

  const solicitud = req.body.solicitud;
  let insertedCount = 0;
  console.log('Datos recibidos:', solicitud);


  // Realiza la consulta INSERT utilizando la conexión existente

  solicitud.forEach((fecha, index) => {
  const sql = 'INSERT INTO fechas_reservadas (fecha) VALUES (?)';
  db.query(sql, fecha, (error, results) => {
    if (error) {
      console.error('Error al insertar el dato:', error);
      res.status(500).send('Error al insertar los datos');
      return;
    }
    
    console.log('Dato insertado:', fecha);
    insertedCount++;

    if (insertedCount === solicitud.length) {
      res.json({ message: 'Datos insertados correctamente' });
    }
  });
});

});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor backend iniciado en el puerto 3000');
});