const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db.js');
const multer = require('multer');
const publicPath = path.join(__dirname, '../');
app.use(express.static(publicPath));
app.use(express.json());
// const { google } = require('googleapis');
// const { OAuth2Client } = require('google-auth-library');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // APIs de GOOGLE
//   // CONFIGURACIÓN DE CREDENCIALES
//   const CLIENT_ID = '617227978230-cg1tr5r1fria6ct2f58124li8u9sbocu.apps.googleusercontent.com';
//   const CLIENT_SECRET = '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';
//   const REDIRECT_URI = 'https://localhost:3000';

//   const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

//   //ENLACE DE AUTORIZACIÓN
//   const SCOPES = [
//     'https://www.googleapis.com/auth/userinfo.email',
//     'https://www.googleapis.com/auth/userinfo.profile',
//     'https://www.googleapis.com/auth/calendar',
//     'https://mail.google.com/',
//     'https://www.googleapis.com/auth/gmail.modify'
//   ];

//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });

//   // CALLBACK DE AUTORIZACIÓN
//   app.get('/oauth2callback', async (req, res) => {
//     const code = req.query.code;

//     try {
//       const { tokens } = await oAuth2Client.getToken(code);
//       oAuth2Client.setCredentials(tokens);

//       // Aquí puedes guardar los tokens en algún lugar seguro para usarlos en futuras solicitudes

//       res.redirect('/'); // Redirige a la página principal u otra página que desees mostrar después de la autorización exitosa
//     } catch (error) {
//       console.error('Error al obtener los tokens de acceso:', error);
//       // Maneja el error de manera adecuada en tu aplicación
//     }
//   });

//   // CONFIGURACIÓN DE GMAIL
//   app.post('/enviar-correo', async (req, res) => {
//     const destinatario = req.body.destinatario;
//     const asunto = req.body.asunto;
//     const mensaje = req.body.mensaje;

//     const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

//     const utf8Subject = `=?utf-8?B?${Buffer.from(asunto).toString('base64')}?=`;
//     const utf8Message = Buffer.from(mensaje).toString('base64');

//     const email = `
//       From: reservas.abyayalahostel@gmail.com
//       To: ${destinatario}
//       Subject: ${utf8Subject}
//       MIME-Version: 1.0
//       Content-Type: text/html; charset=utf-8
//       Content-Transfer-Encoding: base64

//       ${utf8Message}
//     `.replace(/\n/g, '\r\n');

//     try {
//       const response = await gmail.users.messages.send({
//         userId: 'me',
//         requestBody: {
//           raw: Buffer.from(email).toString('base64'),
//         },
//       });

//       console.log('Correo enviado:', response.data);

//       res.json({ mensaje: 'Correo enviado correctamente' });
//     } catch (error) {
//       console.error('Error al enviar el correo:', error);

//       res.status(500).json({ error: 'Error al enviar el correo' });
//     }
//   });

// SUBIR COMPROBANTE

const storage = multer.diskStorage({
  destination: '/Users/cprada33/Desktop/Proyecto Codere/Abya-Yala/uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage
});

app.post('/files', upload.single('archivo'), (req, res) => {
  res.status(200).json({ message: 'Usuario creado exitosamente' });
});

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

  const nombre = req.body.infoReserva.nombre;
  const celular = req.body.infoReserva.celular;
  const correo = req.body.infoReserva.correoElectronico;
  const cedula = req.body.infoReserva.cedula;
  const huespedes = req.body.infoReserva.huespedes;
  const fechaIn = req.body.infoReserva.fechaIn;
  const fechaOut = req.body.infoReserva.fechaOut;
  const acompanantes = req.body.infoReserva.acompanantes;
  const precioTotal = req.body.infoReserva.precio;

  const array = [nombre, cedula, celular, correo, huespedes, fechaIn, fechaOut, acompanantes, precioTotal];
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
  });
});

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
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor backend iniciado en el puerto 3000');
});
