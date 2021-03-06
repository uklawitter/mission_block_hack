import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {BlockchainProvider} from '../providers/blockchain/blockchain';
import {StorageProvider} from '../providers/storage/storage';
import {QRScanner} from "@ionic-native/qr-scanner";
import {QRCodeModule} from "angular2-qrcode";
import {CashboxPage} from "../pages/cashbox/cashbox";

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        CashboxPage,
        HomePage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        QRCodeModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        CashboxPage,
        HomePage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        QRScanner, {provide: ErrorHandler, useClass: IonicErrorHandler},
        BlockchainProvider,
        StorageProvider]
})
export class AppModule {
}
