// GET ELEMENTS DOM
let fechaReservaIn = document.getElementById('fechaReservaIn');
let fechaReservaOut = document.getElementById('fechaReservaOut');
let tipoCabaña = document.getElementById('tipoCabaña');
let cantidadCabanas = document.getElementById('cantidadCabanas');
let cantidadPersonas = document.getElementById('cantidadPersonas');
let botonReservar = document.getElementById('reservar');

// INSERTAR FECHAS DE RESERVA 
fechaReservaIn.innerText = "Check In: " + localStorage.getItem("fechaIn");
fechaReservaOut.innerText = "Check Out: " + localStorage.getItem("fechaOut");

let fechaIn = localStorage.getItem("fechaIn");
let fechaOut = localStorage.getItem("fechaOut");

// DIVISION DE FECHAS POR DÍA
function getDatesInRange(fechaIn, fechaOut){
  let dates = [];
  let currentDate = new Date(fechaIn);
  let endDate = new Date(fechaOut);

  while (currentDate <= endDate) {
      let currentDateFormatted = currentDate.toISOString().slice(0, 10);
      dates.push(currentDateFormatted);
      currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

let solicitud = getDatesInRange(fechaIn, fechaOut);

// ENVIO DE DATOS
const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({solicitud: solicitud})
  };

  botonReservar.addEventListener('click', function(){
    
    event.preventDefault();

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
  })