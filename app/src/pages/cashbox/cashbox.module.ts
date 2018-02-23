import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashboxPage } from './cashbox';

@NgModule({
  declarations: [
    CashboxPage,
  ],
  imports: [
    IonicPageModule.forChild(CashboxPage),
  ],
})
export class CashboxPageModule {}
