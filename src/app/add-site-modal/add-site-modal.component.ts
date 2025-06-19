import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-add-site-modal',
  templateUrl: './add-site-modal.component.html',
  styleUrls: ['./add-site-modal.component.scss'],
})
export class AddSiteModalComponent {

  sitio = {
    titulo: '',
    descripcion: '',
    imagen: '',
    direccion: '',
    categoria: '',
    calificacion: 0,
    destacado: false, // Si quieres que tenga la opción de destacado
    lat: 0,
    lng: 0
  };

  constructor(
    private modalCtrl: ModalController,
    private firebaseService: FirebaseService
  ) {}

  // Cerrar el modal
  cerrar() {
    this.modalCtrl.dismiss();
  }

  // Guardar el nuevo sitio
  guardarSitio() {
    this.firebaseService.addSitio(this.sitio).then(() => {
      this.modalCtrl.dismiss(); // Cierra el modal después de agregar el sitio
    });
  }
}

