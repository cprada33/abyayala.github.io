let btnDisponibilidad = document.getElementById("btn-disponibilidad");
let btnCheckIn = document.getElementById("fechain");
let btnCheckOut = document.getElementById("fechaout")
const fechaActual = new Date().toISOString().split('T')[0];
btnCheckIn.min = fechaActual;

btnCheckOut.addEventListener('focus', function(){
    event.preventDefault();
    btnCheckOut.min = btnCheckIn.value;
})

btnDisponibilidad.addEventListener("click", function(){
    
    event.preventDefault();
    let fechaCheckIn = document.getElementById("fechain").value;
    let fechaCheckOut = document.getElementById("fechaout").value;
    localStorage.setItem("fechaIn", fechaCheckIn); 
    localStorage.setItem("fechaOut", fechaCheckOut);
    window.location.href = 'pages/disponibilidad.html';
} );

