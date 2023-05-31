let btnDisponibilidad = document.getElementById("btn-disponibilidad");

btnDisponibilidad.addEventListener("click", function(){
    
    event.preventDefault();
    let fechaCheckIn = document.getElementById("fechain").value;
    let fechaCheckOut = document.getElementById("fechaout").value;
    localStorage.setItem("fechaIn", fechaCheckIn);
    localStorage.setItem("fechaOut", fechaCheckOut);
    window.location.href = 'pages/disponibilidad.html';
} );

function getDatesInRange(fechaIn, fechaOut){
    let dates = [];
    let currentDate = fechaIn;

    while (currentDate <= fechaOut) {
        dates.push(currentDate);
        currentDate = fechaIn + 1;
    }

    return console.log(dates);
}

getDatesInRange()

document.addEventListener("DOMContentLoaded", function(){
    console.log(dates);
})

let fechasReservadas = {};

