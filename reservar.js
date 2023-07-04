// GET ELEMENTS DO
const fechaReservaIn = document.getElementById('fechaReservaIn');
const fechaReservaOut = document.getElementById('fechaReservaOut');
const tipoCabaña = document.getElementById('tipoCabaña');
const cantidadCabanas = document.getElementById('cantidadCabanas');
const botonReservar = document.getElementById('reservar');
const fechaIn = localStorage.getItem('fechain');
const fechaOut = localStorage.getItem('fechaout');
const tipoDeCabaña = localStorage.getItem('tipoDeCabaña');
const precioFinal = document.getElementById('precioFinal');
const reservaRealizada = true;

// INFORMACIÓN PREVIA DE RESERVA
fechaReservaIn.innerText = fechaIn;
fechaReservaOut.innerText = fechaOut;
tipoCabaña.innerText = tipoDeCabaña;
const seleccionCabañas = localStorage.getItem('cantidadDeCabañas');
cantidadCabanas.innerText = seleccionCabañas;

// DIVISION DE FECHAS POR DÍA
function getDatesInRange (fechaIn, fechaOut) {
  const dates = [];
  const currentDate = new Date(fechaIn);
  const endDate = new Date(fechaOut);

  while (currentDate.valueOf() < endDate.valueOf()) {
    const currentDateFormatted = currentDate.toISOString().slice(0, 10);
    dates.push(currentDateFormatted);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

const solicitud = getDatesInRange(fechaIn, fechaOut);

// ESTABLECER PRECIO FINAL

let precioTotal = '';

if (tipoDeCabaña === 'Safari') {
  const precioSafari = 320000 * parseInt(seleccionCabañas) * parseInt(solicitud.length);
  precioTotal = precioSafari.toLocaleString();
  precioFinal.innerText = precioTotal;
} else if (tipoDeCabaña === 'Ancestral') {
  const precioAncestral = 420000 * parseInt(seleccionCabañas) * parseInt(solicitud.length);
  precioTotal = precioAncestral.toLocaleString();
  precioFinal.innerText = precioAncestral.toLocaleString();
}

// ENVIO DE DATOS A TABLE DE RESERVA

botonReservar.addEventListener('click', function (event) {
  const nombre = document.getElementById('nombre').value;
  const celular = document.getElementById('celular').value;
  const correo = document.getElementById('correo').value;
  const cedula = document.getElementById('cedula').value;
  const huespedes = document.getElementById('huespedes').value;
  const acompanantes = document.getElementById('acompañantes').value;
  const comprobante = document.getElementById('archivo').value;
  const errorDatos = document.getElementById('errorDatos');
  const blockReservaRealizada = localStorage.getItem('ReservaRealizada');

  if (nombre === '' || celular === '' || correo === '' || cedula === '' || huespedes === '' || acompanantes === '' || comprobante === '') {
    errorDatos.innerText = 'Para finalizar la reserva debes completar todos los campos.';
  } else if (blockReservaRealizada === 'true') {
    window.location.href = '../index.html';
  } else if (nombre !== '' || celular !== '' || correo !== '' || cedula !== '' || huespedes !== '' || acompanantes !== '' || comprobante !== '' || blockReservaRealizada === 'false') {
    // ENVIO DEL ARCHIVO
    const archivo = document.getElementById('archivo').files[0];
    const formData = new FormData();
    formData.append('archivo', archivo);
    fetch('/files', {
      method: 'POST',
      body: formData
    })
      .then(function (response) {
        if (response.ok) {
          console.log('Antes de');
          window.location.href = 'reserva-realizada.html';
        }
      });

    // ENVIO DE DATOS
    for (let i = 0; i < seleccionCabañas; i++) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ solicitud })
      };

      if (tipoDeCabaña === 'Safari') {
        fetch('/datos', requestOptions)
          .then(response => {
            console.log('Respuesta del servidor:', response);

            if (!response.ok) {
              throw new Error('Error en la solicitud POST');
            }
            return response.json();
          })
          .then(data => {
            console.log('Datos insertados correctamente:', data);
          })
          .catch(error => {
            console.error('Error en la solicitud POST:', error);
          });
      } else if (tipoDeCabaña === 'Ancestral') {
        fetch('/datos2', requestOptions)
          .then(response => {
            console.log('Respuesta del servidor:', response);
            if (!response.ok) {
              throw new Error('Error en la solicitud POST');
            }
            return response.json();
          })
          .then(data => {
            console.log('Datos insertados correctamente:', data);
          })
          .catch(error => {
            console.error('Error en la solicitud POST:', error);
          });
      }

      // CAMBIO DEL VALOR DE RESERVA
      localStorage.setItem('ReservaRealizada', reservaRealizada);
    }

    const infoReserva = {
      nombre,
      celular,
      correoElectronico: correo,
      cedula,
      huespedes,
      fechaIn,
      fechaOut,
      acompanantes,
      precio: precioTotal
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ infoReserva })
    };

    fetch('/datos4', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud POST');
        }
        return response.json();
      })
      .then(data => {
        console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
        console.error('Error en la solicitud POST:', error);
      });
  }
});
