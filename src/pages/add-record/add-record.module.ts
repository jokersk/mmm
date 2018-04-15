import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRecordPage } from './add-record';

@NgModule({
  declarations: [
    AddRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRecordPage),
  ],
})
export class AddRecordPageModule {}
