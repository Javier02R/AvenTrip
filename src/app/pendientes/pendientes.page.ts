import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
})
export class PendientesPage implements OnInit {
  pendientes: any[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarPendientes();
  }

  cargarPendientes() {
    this.firebaseService.getSitiosPendientes().subscribe((data: any[]) => {
      this.pendientes = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
    });
  }
  
  async aprobarSitio(pendiente: any) {
    await this.firebaseService.aprobarSitio(pendiente.sitio);
    await this.firebaseService.eliminarPendiente(pendiente.id);
    this.mostrarToast('✅ Sitio aprobado y publicado');
  }

  async eliminarSitio(pendiente: any) {
    await this.firebaseService.eliminarPendiente(pendiente.id);
    this.mostrarToast('🗑️ Sitio eliminado');
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
