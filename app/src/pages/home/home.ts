import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AccountDetailsPage} from "../account-details/account-details";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(private navCtrl: NavController, private qrScanner: QRScanner) {
    }

    public openAccountDetails(): void {
        this.navCtrl.push("AccountDetailsPage");
    }

    public scanQrCode(): void {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        console.log("MARKER: text", text);
                        this.qrScanner.hide();
                        scanSub.unsubscribe();

                        window.document.querySelector('ion-app').classList.remove('transparent-body')
                    });

                    this.qrScanner.show();
                    window.document.querySelector('ion-app').classList.add('transparent-body');
                } else if (status.denied) {
                    //TODO
                } else {
                    //TODO
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }
}
