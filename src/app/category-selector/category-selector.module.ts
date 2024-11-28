import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CategorySelectorComponent } from '../category-selector/category-selector.component';// Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@NgModule({
  declarations: [CategorySelectorComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,  // Importa IonicModule para usar los componentes de Ionic
  ],
  exports: [CategorySelectorComponent],  // Exporta el componente si lo necesitas usar en otros módulos
})
export class CategorySelectorModule {}
