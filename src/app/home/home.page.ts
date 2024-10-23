import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations'; // Importa las herramientas de animación

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
export class HomePage {

  constructor() {}

}
