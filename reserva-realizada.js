// DETENER CARGA DE LA PAGINA
document.addEventListener("beforeunload", function (event) {
    var nextURL = event.currentTarget.location.href;
    if (nextURL === '../reservar.html') {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });