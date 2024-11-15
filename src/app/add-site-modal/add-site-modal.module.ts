import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddSiteModalComponent } from './add-site-modal.component';  // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@NgModule({
  declarations: [AddSiteModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,  // Importa IonicModule para usar los componentes de Ionic
  ],
  exports: [AddSiteModalComponent],  // Exporta el componente si lo necesitas usar en otros módulos
})
export class AddSiteModalModule {}
