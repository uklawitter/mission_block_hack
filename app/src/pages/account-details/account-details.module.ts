import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AccountDetailsPage} from './account-details';
import {QRCodeModule} from "angular2-qrcode";

@NgModule({
    declarations: [
        AccountDetailsPage,
    ],
    imports: [
        IonicPageModule.forChild(AccountDetailsPage),
        QRCodeModule,
    ],
})
export class AccountDetailsPageModule {
}
