import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../app/services/firebase.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  sitios: any[] = [];

  constructor(private  firebaseService: FirebaseService) {}
  
  ngOnInit() {
    this.firebaseService.getSitios().subscribe((sitios: any) => {
      this.sitios = sitios;
    });
  }

  async agregarSitio() {
    const nuevoSitio = {
      titulo: "Título del Sitio",
      descripcion: "Descripción del Sitio",
      imagen: "URL de la Imagen",
      direccion: "Dirección del Sitio",
      categoria: "Categoría del Sitio",
      lat: 0,
      lng: 0,
      calificacion: 0 // Agrega un valor para calificación
    };

    await this.firebaseService.addSitio(nuevoSitio);
  }

}