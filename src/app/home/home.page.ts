import { Component, OnDestroy, OnInit  } from '@angular/core';
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
import Swiper from 'swiper';




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


export class HomePage implements OnInit,  AfterViewInit, OnDestroy{
  sitios: any[] = []; 
  mapa: any;
  tips = [
    {
      titulo: 'Explora antes',
      descripcion: 'Revisa el terreno antes de acampar.',
      icono: 'eye-outline'
    },
    {
      titulo: 'Lleva suficiente agua',
      descripcion: 'Mantente hidratado durante toda la ruta.',
      icono: 'water-outline'
    },
    {
      titulo: 'Respeta la naturaleza',
      descripcion: 'No dejes basura ni dañes el entorno.',
      icono: 'leaf-outline'
    }
  ];

  currentTipIndex = 0;
  currentTip = this.tips[0];
  intervalId: any;

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

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
    this.intervalId = setInterval(() => {
      this.currentTipIndex = (this.currentTipIndex + 1) % this.tips.length;
      this.currentTip = this.tips[this.currentTipIndex];
    }, 5000);
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

ngAfterViewInit() {
    new Swiper('.mySwiper', {
      autoplay: {
        delay: 8000,
        disableOnInteraction: false
      },
      loop: true
    });
  }

}
                                                                                               


