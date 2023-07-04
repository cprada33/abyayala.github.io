const btnDisponibilidad = document.getElementById('btn-disponibilidad');
const btnCheckIn = document.getElementById('fechain');
const btnCheckOut = document.getElementById('fechaout');
const fechaActual = new Date().toISOString().split('T')[0];
btnCheckIn.min = fechaActual;

btnCheckOut.addEventListener('focus', function () {
  event.preventDefault();
  btnCheckOut.min = btnCheckIn.value;
});

btnDisponibilidad.addEventListener('click', function () {
  event.preventDefault();
  const fechaCheckIn = document.getElementById('fechain').value;
  const fechaCheckOut = document.getElementById('fechaout').value;
  localStorage.setItem('fechain', fechaCheckIn);
  localStorage.setItem('fechaout', fechaCheckOut);
  window.location.href = 'pages/disponibilidad.html';
});
