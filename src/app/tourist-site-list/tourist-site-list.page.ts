import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations'; 
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  sitios: any[] = []; // Todos los sitios
  sitiosFiltrados: any[] = []; // Sitios después de filtrar
  categoriaSeleccionada: string = 'todos';

  constructor(
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // Cargar sitios desde Firebase
    this.firebaseService.getSitios().subscribe((sitios: any[]) => {
      this.sitios = sitios;
      this.aplicarFiltro();
    });

    // Escuchar los parámetros de consulta
    this.activatedRoute.queryParams.subscribe(params => {
      this.categoriaSeleccionada = params['categoria'] || 'todos';
      this.aplicarFiltro();
    });
  }

  aplicarFiltro() {
    if (this.categoriaSeleccionada === 'todos') {
      this.sitiosFiltrados = this.sitios; // Mostrar todos los sitios
    } else {
      this.sitiosFiltrados = this.sitios.filter(sitio =>
        sitio.categoria.toLowerCase() === this.categoriaSeleccionada.toLowerCase()
      );
    }
  }

  verDetalles(id: string) {
    this.router.navigate(['/detalle', id]);
    console.log("Ver detalles del sitio con ID:", id);
  }

  async agregarSitio() {
    const modal = await this.modalController.create({
      component: AddSiteModalComponent
    });
    return await modal.present();
  }
}
