import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations'; 
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { AddSiteModalComponent } from '../add-site-modal/add-site-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tourist-site-list',
  templateUrl: './tourist-site-list.page.html',
  styleUrls: ['./tourist-site-list.page.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class TouristSiteListPage implements OnInit {

  sitios: any[] = [];  // Declaramos la variable sitios

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.firebaseService.getSitios().subscribe((sitios: any[]) => {
      this.sitios = sitios;
    });
  }

  /*/agregarSitio() {
    // Define los datos del sitio a agregar
    const nuevoSitio = {
      titulo: 'Nuevo Sitio',
      descripcion: 'Descripción del nuevo sitio',
      imagen: 'https://example.com/imagen.jpg',
      direccion: 'Dirección del sitio',
      categoria: 'Categoría',
      calificacion: 5  // Asegúrate de tener esta propiedad
    };

    this.firebaseService.addSitio(nuevoSitio).then(() => {
      console.log("Nuevo sitio agregado correctamente");
    }).catch(error => {
      console.error("Error al agregar el sitio: ", error);
    });
  }/*/
  verDetalles(id: string) {
    this.router.navigate(['/detalle', id]);
    console.log("Ver detalles del sitio con ID:", id);
  }

  // Mostrar el modal para agregar un nuevo sitio
  async agregarSitio() {
    const modal = await this.modalController.create({
      component: AddSiteModalComponent
    });
    return await modal.present();
  }
}
