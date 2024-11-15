import { Component, OnInit  } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations'; // Importa las herramientas de animación
import { AddSiteModalComponent } from '../add-site-modal/add-site-modal.component';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


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

  async agregarSitio() {
    const modal = await this.modalController.create({
      component: AddSiteModalComponent
    });
    return await modal.present();
  }
}


