let fechaReservaIn = document.getElementById('fechaReservaIn');
let fechaReservaOut = document.getElementById('fechaReservaOut');
let tipoCabaña = document.getElementById('tipoCabaña');
let cantidadCabanas = document.getElementById('cantidadCabanas');
let cantidadPersonas = document.getElementById('cantidadPersonas');
let storedReservas = JSON.parse(localStorage.getItem('fechasReservadasSafari'));

console.log(localStorage.getItem('fechasReservadasSafari'))

fechaReservaIn.innerText = "Check In: " + localStorage.getItem("fechaIn");
fechaReservaOut.innerText = "Check Out: " + localStorage.getItem("fechaOut");

let fechaIn = localStorage.getItem("fechaIn");
let fechaOut = localStorage.getItem("fechaOut");

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

let reservar = document.getElementById('reservar');
reservar.addEventListener('click', function(){

    storedReservas.push(solicitud)

})