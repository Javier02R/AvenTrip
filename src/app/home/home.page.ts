import { Component, OnInit  } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations'; // Importa las herramientas de animación
import { AddSiteModalComponent } from '../add-site-modal/add-site-modal.component';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router'; 
import { ModalController } from '@ionic/angular';
import { CategorySelectorComponent } from '../category-selector/category-selector.component'; // Ajusta la ruta según sea necesario
import { ModalMapaComponent } from '../modal-mapa/modal-mapa.component';
import { AfterViewInit } from '@angular/core' ;
import * as L from 'leaflet';
import 'leaflet-routing-machine';
const Routing = (L as any).Routing;
import { firstValueFrom } from 'rxjs';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('400ms ease-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})


export class HomePage implements OnInit{
  sitios: any[] = []; 
  mapa: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.firebaseService.getSitios().subscribe((sitios: any[]) => {
      //this.sitios = sitios;
      this.sitios = sitios.filter(sitio => sitio.destacado === true);
    });
  }

  async mostrarSelectorCategorias() {
    const modal = await this.modalController.create({
      component: CategorySelectorComponent,
    });

    modal.onDidDismiss().then((data) => {
      const categoriaSeleccionada = data.data; 
      if (categoriaSeleccionada) {
        this.irATouristSiteList(categoriaSeleccionada);
      }
    });

    await modal.present();
  }

  irATouristSiteList(categoria: string) {
    console.log(`Filtrando por: ${categoria}`);
  }

  async agregarSitio() {
    const modal = await this.modalController.create({
      component: AddSiteModalComponent
    });
    return await modal.present();
  }

  
  async abrirModal(id: string) {
  try {
    const sitio = await firstValueFrom(this.firebaseService.getSitioById(id));
    
    const modal = await this.modalController.create({
      component: ModalMapaComponent,
      componentProps: {
        lat: sitio.lat,
        lng: sitio.lng,
        nombre: sitio.titulo
      }
    });
    
    await modal.present();
  } catch (error) {
    console.error('Error abriendo el modal:', error);
  }
    }

    slideOpts = {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 1.2,
  spaceBetween: 10
};

tips = [
  {
    icono: 'trail-sign-outline',
    titulo: 'Lleva solo lo esencial',
    descripcion: 'Empaca lo justo y necesario. Menos peso, más libertad.'
  },
  {
    icono: 'water-outline',
    titulo: 'Siempre hidrátate',
    descripcion: 'Lleva agua suficiente y bebe regularmente durante el viaje.'
  },
  {
    icono: 'leaf-outline',
    titulo: 'Cuida el entorno',
    descripcion: 'No dejes basura. Respeta la naturaleza y a los demás.'
  },
  {
    icono: 'map-outline',
    titulo: 'Investiga antes de ir',
    descripcion: 'Conoce el clima, rutas y peligros del sitio que visitarás.'
  }
];


}
                                                                                               


