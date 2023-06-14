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


// AGREGAR FECHAS A LA BASE DE DATOS SAFARI

app.post('/datos', (req, res) => {
  console.log('Ruta /datos alcanzada');

  const solicitud = req.body.solicitud;
  let insertedCount = 0;
  console.log('Datos recibidos:', solicitud);


  // REALIZAR EL INSERT DE FECHAS RESERVADAS SAFARI

  solicitud.forEach((fecha, index) => {
  const sql = 'INSERT INTO fechas_reservadas_safari (fecha) VALUES (?)';
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


// AGREGAR FECHAS A LA BASE DE DATOS ANCESTRAL

app.post('/datos2', (req, res) => {
  console.log('Ruta /datos alcanzada');

  const solicitud = req.body.solicitud;
  let insertedCount = 0;
  console.log('Datos recibidos:', solicitud);


  // REALIZAR EL INSERT DE FECHAS RESERVAS ANCESTRAL

  solicitud.forEach((fecha, index) => {
  const sql = 'INSERT INTO fechas_reservadas_ancestral (fecha) VALUES (?)';
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

// AGREGAR RESERVAS A LA BASE DE DATOS

app.post('/datos4', (req, res) => {
  console.log('Ruta4 /datos alcanzada');

  let nombre = req.body.infoReserva.nombre;
  let celular = req.body.infoReserva.celular;
  let correo = req.body.infoReserva.correoElectronico;
  let cedula = req.body.infoReserva.cedula;
  let huespedes = req.body.infoReserva.huespedes;
  let fechaIn = req.body.infoReserva.fechaIn;
  let fechaOut = req.body.infoReserva.fechaOut;
  let acompanantes = req.body.infoReserva.acompanantes;
  let precioTotal = req.body.infoReserva.precio;

  let array = [nombre, cedula, celular, correo, huespedes, fechaIn, fechaOut, acompanantes, precioTotal];
  console.log('array: ', array);

  // REALIZAR EL INSERT RESERVA

  const sql = 'INSERT INTO Reservas (Nombre, Celular, `Correo electronico`, Cédula, `Número de huespedes`, `Información acompañantes`, `fecha check in`, `fecha check out`, precio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nombre, celular, correo, cedula, huespedes, acompanantes, fechaIn, fechaOut, precioTotal], (error, results) => {
    if (error) {
      console.error('Error al insertar el dato:', error);
      res.status(500).send('Error al insertar los datos');
      return;
    }

    console.log('Datos insertados correctamente');
    res.json({ message: 'Datos insertados correctamente' });
  });
});

// TRAER INFORMACIÓN DE FECHAS RESERVADAS SAFARI
app.get('/datos', (req, res) => {

  db.query('SELECT fecha FROM fechas_reservadas_safari', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta: ', error);
      res.status(500).json({ error: 'Error al obtener los datos' });
    } else {
      const fecha = results.map(row => row.fecha);
      res.json(fecha);
    }
  })
})

// TRAER INFORMACIÓN DE FECHAS RESERVADAS ANCESTRAL
app.get('/datos2', (req, res) => {

  db.query('SELECT fecha FROM fechas_reservadas_ancestral', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta: ', error);
      res.status(500).json({ error: 'Error al obtener los datos' });
    } else {
      const fecha = results.map(row => row.fecha);
      res.json(fecha);
    }
  })
})

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor backend iniciado en el puerto 3000');
});