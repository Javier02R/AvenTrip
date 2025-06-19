function iniciarMap(){
    var coord = {lat:-34.5956145 ,lng: -58.4431949};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}

document.getElementById("openModal").onclick = function() {
      document.getElementById("mapModal").style.display = "block";
      // Si usas un mapa como Leaflet o Google Maps, inicialízalo aquí
    }

    // Cerrar el modal
    document.querySelector(".close").onclick = function() {
      document.getElementById("mapModal").style.display = "none";
    }

    // Cerrar si se hace clic fuera del contenido
    window.onclick = function(event) {
      if (event.target === document.getElementById("mapModal")) {
        document.getElementById("mapModal").style.display = "none";
      }
    }