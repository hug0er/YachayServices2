import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcioPage } from './ocio';

@NgModule({
  declarations: [
    OcioPage,
  ],
  imports: [
    IonicPageModule.forChild(OcioPage),
  ],
})
export class OcioPageModule {}
