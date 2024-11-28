import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss']
})
export class CategorySelectorComponent {
  categoriaSeleccionada: string = 'todos'; // Valor predeterminado

  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  aplicarFiltro() {
    // Cerrar el modal y navegar con la categoría seleccionada
    this.modalController.dismiss();
    this.router.navigate(['/tourist-site-list'], {
      queryParams: { categoria: this.categoriaSeleccionada }
    });
  }
}
