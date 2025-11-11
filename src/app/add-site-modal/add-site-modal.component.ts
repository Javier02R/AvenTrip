import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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
    private toastController: ToastController,
    private firebaseService: FirebaseService
  ) {}

  // Cerrar el modal
  cerrar() {
    this.modalCtrl.dismiss();
  }

  // Guardar el nuevo sitio
  guardarSitio() {
    this.firebaseService.addSitioPendiente(this.sitio).then(() => {
      this.mostrarToast('Sitio agregado a pendientes');
      this.modalCtrl.dismiss();
    }).catch((error) => {
      console.error('Error al agregar el sitio:', error);
      this.mostrarToast('Error al agregar el sitio');
    });
  }

  async mostrarToast(mensaje: string) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 2500,
    color: 'success',
    position: 'bottom'
  });
  toast.present();
}
}

