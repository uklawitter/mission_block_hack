import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BlockchainProvider, CompanyEntry} from '../../providers/blockchain/blockchain';
import {AccountDetailsPage} from "../account-details/account-details";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Map} from "immutable";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public bons$:BehaviorSubject<Map<string, CompanyEntry>>;
    public tokenAddress:string;

    constructor(private navCtrl: NavController, private qrScanner: QRScanner, private blockchainProvider: BlockchainProvider) {
        //TODO
        this.tokenAddress = "0x6d319656C1DAC95D151005Df17e1b76B20493Ba0";
        this.bons$ = this.blockchainProvider.bons;
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
