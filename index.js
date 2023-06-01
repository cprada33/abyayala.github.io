let btnDisponibilidad = document.getElementById("btn-disponibilidad");

btnDisponibilidad.addEventListener("click", function(){
    
    event.preventDefault();
    let fechaCheckIn = document.getElementById("fechain").value;
    let fechaCheckOut = document.getElementById("fechaout").value;
    localStorage.setItem("fechaIn", fechaCheckIn); 
    localStorage.setItem("fechaOut", fechaCheckOut);
    window.location.href = 'pages/disponibilidad.html';
} );

