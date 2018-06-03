import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendedorPage } from './vendedor';

@NgModule({
  declarations: [
    VendedorPage,
  ],
  imports: [
    IonicPageModule.forChild(VendedorPage),
  ],
})
export class VendedorPageModule {}
