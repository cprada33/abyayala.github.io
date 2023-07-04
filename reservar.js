// GET ELEMENTS DOM
let fechaReservaIn = document.getElementById('fechaReservaIn');
let fechaReservaOut = document.getElementById('fechaReservaOut');
let tipoCabaña = document.getElementById('tipoCabaña');
let cantidadCabanas = document.getElementById('cantidadCabanas');
let cantidadPersonas = document.getElementById('cantidadPersonas');
let botonReservar = document.getElementById('reservar');
let fechaIn = localStorage.getItem("fechaIn");
let fechaOut = localStorage.getItem("fechaOut");
let tipoDeCabaña = localStorage.getItem("tipoDeCabaña");
let precioFinal = document.getElementById('precioFinal');
let reservaRealizada = true;

// INFORMACIÓN PREVIA DE RESERVA
fechaReservaIn.innerText = fechaIn;
fechaReservaOut.innerText = fechaOut;
tipoCabaña.innerText = tipoDeCabaña;
let seleccionCabañas = localStorage.getItem("cantidadDeCabañas");
cantidadCabanas.innerText = seleccionCabañas;

// DIVISION DE FECHAS POR DÍA
function getDatesInRange(fechaIn, fechaOut){
  let dates = [];
  let currentDate = new Date(fechaIn);
  let endDate = new Date(fechaOut);

  while (currentDate < endDate) {
      let currentDateFormatted = currentDate.toISOString().slice(0, 10);
      dates.push(currentDateFormatted);
      currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

let solicitud = getDatesInRange(fechaIn, fechaOut);

// ESTABLECER PRECIO FINAL

let precioTotal = '';

if (tipoDeCabaña == 'Safari') {
  let precioSafari = 320000 * parseInt(seleccionCabañas) * parseInt(solicitud.length);
  precioTotal = precioSafari.toLocaleString();
  precioFinal.innerText = precioTotal
} else if (tipoDeCabaña == 'Ancestral') {
  let precioAncestral = 420000 * parseInt(seleccionCabañas) * parseInt(solicitud.length);
  precioTotal = precioAncestral.toLocaleString();
  precioFinal.innerText = precioAncestral.toLocaleString();
}

// ENVIO DE DATOS A TABLE DE RESERVA

botonReservar.addEventListener('click', function(event){
  // event.preventDefault();
  
  let nombre = document.getElementById('nombre').value;
  let celular = document.getElementById('celular').value;
  let correo = document.getElementById('correo').value;
  let cedula = document.getElementById('cedula').value;
  let huespedes = document.getElementById('huespedes').value;
  let acompanantes = document.getElementById('acompañantes').value;
  let comprobante = document.getElementById('archivo').value;
  let errorDatos = document.getElementById('errorDatos');
  let blockReservaRealizada = localStorage.getItem('ReservaRealizada');

  if ( nombre == '' || celular == '' || correo == '' || cedula == '' || huespedes == '' || acompanantes == '' || comprobante == '' ) {
    errorDatos.innerText = 'Para finalizar la reserva debes completar todos los campos.';
  } else if ( nombre !== '' || celular !== '' || correo !== '' || cedula !== '' || huespedes !== '' || acompanantes !== '' || comprobante !== '' ) {

    // ENVIO DEL ARCHIVO 
    const archivo = document.getElementById('archivo').files[0];
    const formData = new FormData();
    formData.append('archivo', archivo);
    
    fetch ('/files', {
      method: 'POST',
      body: formData
    })
    .then(function (response){
      if(response.ok) {
        console.log('Antes de')
        // window.location.href = 'reserva-realizada.html';
      }
    });

    // ENVIO DE DATOS
for (let i = 0; i < seleccionCabañas; i++) {

  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({solicitud: solicitud})
    };
        
      if (tipoDeCabaña == "Safari") {
  
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
      } 
      
        else if (tipoDeCabaña == "Ancestral") {
  
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

    let infoReserva = {
      'nombre': nombre,
      'celular': celular,
      'correoElectronico': correo,
      'cedula': cedula,
      'huespedes': huespedes,
      'fechaIn': fechaIn,
      'fechaOut': fechaOut,
      'acompanantes': acompanantes,
      'precio': precioTotal,
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({infoReserva: infoReserva})
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

})