let fechaIn = localStorage.getItem("fechaIn");
let fechaOut = localStorage.getItem("fechaOut");
let cantidadSafaris = 8;
let cantidadAncestral = 1;
let fechasReservadasSafari = [];
let fechasReservadasAncestral = [];

function getDatesInRange(fechaIn, fechaOut){
    let dates = [];
    let currentDate = new Date(fechaIn);
    let endDate = new Date(fechaOut);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

let solicitud = getDatesInRange(fechaIn, fechaOut);

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

disponibilidadSafari.innerText = cantidadSafaris - disponibilidad(solicitud, fechasReservadasSafari);
