import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-mapa',
  templateUrl: './modal-mapa.component.html',
  styleUrls: ['./modal-mapa.component.scss'],
})


export class ModalMapaComponent implements AfterViewInit {
  @Input() lat!: number;
  @Input() lng!: number;
  @Input() nombre!: string;
  dismissModal() {
    this.modalCtrl.dismiss();
  }
  mapa: any;

  constructor(private modalCtrl: ModalController) {}

  async ngAfterViewInit() {
    await this.verUbicacion(this.lat, this.lng, this.nombre);
  }

 async verUbicacion(lat: number, lng: number, nombre: string) {
  const container = L.DomUtil.get('map');
  if (container != null) {
    (container as any)._leaflet_id = null;
  }

  // Espera un momento después de que el modal se muestra
  setTimeout(() => {
    this.mapa = L.map('map').setView([lat, lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.mapa);

    L.marker([lat, lng])
      .addTo(this.mapa)
      .bindPopup(nombre)
      .openPopup();

    // 🔧 Solución mágica: forzar el recalculo del tamaño
    setTimeout(() => {
      this.mapa.invalidateSize();
    }, 200); // puede ser 100–500ms dependiendo de la animación del modal
  }, 200);
}
}
