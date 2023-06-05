let fechaIn = localStorage.getItem("fechaIn");
let fechaOut = localStorage.getItem("fechaOut");
let cantidadSafaris = 8;
let cantidadAncestral = 1;
let fechasReservadasSafari = [];
localStorage.setItem('fechasReservadasSafari', JSON.stringify(fechasReservadasSafari));
let fechasReservadasAncestral = [];

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

console.log(solicitud)

let disponibilidadSafari = document.getElementById('disponibilidad-safari');

function disponibilidad(solicitud, fechasReservadasSafari){

    let ocupadas = 0;

    for (let i in solicitud) {
        let element = solicitud[i];

        let ocurrences = fechasReservadasSafari.filter(item => item === element).length;
        ocupadas += ocurrences;
    }

    return ocupadas;
}

let resultadoOcupadas = cantidadSafaris - disponibilidad(solicitud, fechasReservadasSafari);

disponibilidadSafari.innerText = 'Cabañas disponibles: ' + resultadoOcupadas ;

let reservarUno = document.getElementById('btn-reservar-uno');
reservarUno.addEventListener("click", function() {

    event.preventDefault();
    window.location.href = 'reservar.html';
})
