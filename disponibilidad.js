let fechaIn = localStorage.getItem("fechaIn");
let fechaOut = localStorage.getItem("fechaOut");
let cantidadSafaris = 8;
let cantidadAncestral = 1;
let reservaRealizada = false;

// DIVISON DE FECHAS
function getDatesInRange(fechaIn, fechaOut){
    let dates = [];
    let currentDate = new Date(fechaIn);
    let endDate = new Date(fechaOut);
    let counts = {};

    while (currentDate < endDate) {
        let currentDateFormatted = currentDate.toISOString().slice(0, 10);
        dates.push(currentDateFormatted);

        if (counts[currentDateFormatted]) {
            counts[currentDateFormatted]++;
          } else {
            counts[currentDateFormatted] = 1;
          }
      
          currentDate.setDate(currentDate.getDate() + 1);
    }

    let maxCount = 0;
    let mostRepeatedDate = null;

  for (let date in counts) {
    if (counts[date] > maxCount) {
      maxCount = counts[date];
      mostRepeatedDate = date;
    }
  }

    return { dates, mostRepeatedDate };
}

let solicitud = getDatesInRange(fechaIn, fechaOut);
console.log('FECHAS SOLICITADAS: ', solicitud);

//SOLICITUD DE TABLA DE FECHAS RESERVADAS SAFARI
let fechasReservadasSafari = [];

function disponibilidadSafari(solicitud, fechasReservadasSafari){

  let ocupadasSafari = 0;

  for (let i in solicitud) {
      let element = solicitud[i];

      let ocurrences = fechasReservadasSafari.filter(item => item === element).length;
      ocupadasSafari += ocurrences;
  }

  return ocupadasSafari;
}

fetch('/datos')
  .then(response => response.json())
  .then(data => {
    fechasReservadasSafari = data;
    console.log('DATOS BASE DE DATOS: ', fechasReservadasSafari);

    // FUNCION PARA DETERMINAR DISPONIBILIDAD CON BASE DE DATOS

    console.log(disponibilidadSafari())

    let resultadoOcupadasSafari = cantidadSafaris - disponibilidadSafari(solicitud, fechasReservadasSafari);
    console.log('RESULTADO DE OCUPADAS', resultadoOcupadasSafari);

    // RESULTADO DISPONIBILIDAD EN PANTALLA
    let disponibilidadSafariLabel = document.getElementById('disponibilidad-safari');
    disponibilidadSafariLabel.innerText = 'Cabañas disponibles: ' + resultadoOcupadasSafari ;

    // BLOQUEAR BOTON

    if (resultadoOcupadasSafari == 0) {
      cantidadDeCabanasSafari.disabled = true;
      reservarSafari.innerText = 'NO HAY DISPONIBLE';
      reservarSafari.disabled = true;
    }

    })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });














  //SOLICITUD DE TABLA DE FECHAS RESERVADAS ANCESTRAL
let fechasReservadasAncestral = [];

function disponibilidadAncestral(solicitud, fechasReservadasAncestral){

  let ocupadasAncestral = 0;

  for (let i in solicitud) {
      let element = solicitud[i];

      let ocurrences = fechasReservadasAncestral.filter(item => item === element).length;
      ocupadasAncestral += ocurrences;
  }

  return ocupadasAncestral;
}

fetch('/datos2')
  .then(response => response.json())
  .then(data => {
    fechasReservadasAncestral = data;
    console.log('DATOS BASE DE DATOS: ', fechasReservadasAncestral);

    // FUNCION PARA DETERMINAR DISPONIBILIDAD CON BASE DE DATOS

    console.log(disponibilidadAncestral())

    let resultadoOcupadasAncestral = cantidadAncestral - disponibilidadAncestral(solicitud, fechasReservadasAncestral);
    console.log('RESULTADO DE OCUPADAS', resultadoOcupadasAncestral);

    // RESULTADO DISPONIBILIDAD EN PANTALLA
    let disponibilidadAncestralLabel = document.getElementById('disponibilidad-ancestral');
    disponibilidadAncestralLabel.innerText = 'Cabañas disponibles: ' + resultadoOcupadasAncestral ;

    // BLOQUEAR BOTON 
    if (resultadoOcupadasAncestral == 0) {
      cantidadDeCabanasAncestral.disabled = true;
      reservarAncestral.innerText = 'NO HAY DISPONIBLE';
      reservarAncestral.disabled = true;
    }

    })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });


















//ENVIAR DATOS A LA PAGINA DE RESERVA

  //SAFARI
let reservarSafari = document.getElementById('reservar-safari');
let cantidadCabanasSafari = document.getElementById('cantidadDeCabanasSafari');

reservarSafari.addEventListener("click", function() {

    event.preventDefault();
    let numCantidadCabanas = cantidadCabanasSafari.value;
    localStorage.setItem("tipoDeCabaña", 'Safari');
    localStorage.setItem("cantidadDeCabañas", numCantidadCabanas.toString());
    localStorage.setItem('ReservaRealizada', reservaRealizada);
    window.location.href = 'reservar.html';
})
    //ANCESTRAL
let reservarAncestral = document.getElementById('reservar-ancestral');
let cantidadCabanasAncestral = document.getElementById('cantidadDeCabanasAncestral');

reservarAncestral.addEventListener("click", function() {

    event.preventDefault();
    let numCantidadCabanas = cantidadCabanasAncestral.value;
    localStorage.setItem("tipoDeCabaña", 'Ancestral');
    localStorage.setItem("cantidadDeCabañas", numCantidadCabanas.toString());
    localStorage.setItem('ReservaRealizada', reservaRealizada);
    window.location.href = 'reservar.html';
})


// LIMITAR NUMERO DE CABAÑAS SAFARI SELECCIONABLES SEGÚN DISPONIBILIDAD

const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');
const option5 = document.getElementById('option5');
const option6 = document.getElementById('option6');
const option7 = document.getElementById('option7');
const option8 = document.getElementById('option8');

const options = [option1, option2, option3, option4, option5, option6, option7, option8];

const btnListaCabanas = document.getElementById('cantidadDeCabanasSafari');
btnListaCabanas.addEventListener('focus', function () {

  let resultadoOcupadasSafari = cantidadSafaris - disponibilidadSafari(solicitud, fechasReservadasSafari);
  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    let index = i + 1;

    if (index > resultadoOcupadasSafari && resultadoOcupadasSafari > 0) {
      option.style.display = 'none';
    } 
  }

})
