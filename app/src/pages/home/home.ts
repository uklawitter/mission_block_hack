import {Component} from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {BlockchainProvider, CompanyEntry} from '../../providers/blockchain/blockchain';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Map} from "immutable";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public addr$ = new BehaviorSubject<string>("");
    public bons$: BehaviorSubject<Map<string, CompanyEntry>>;

    public coinNames = {
        "0x02Bf9b7d3dD7a008CA608102a01c877E1509883F": "Koin",
        "0x004fb0844f5dcE356E9D8Ffa3172052b28F91141": "LIDL Coin"
    };

    constructor(private navCtrl: NavController, private qrScanner: QRScanner, private blockchainProvider: BlockchainProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
        this.addr$ = this.blockchainProvider.addr;
        this.bons$ = this.blockchainProvider.bons;

        this.blockchainProvider.balanceChangedEvent.subscribe((event: string) => {
            this.toastCtrl.create({
                message: event,
                duration: 5000,
                cssClass: "toast-success"
            }).present();
        });

        this.blockchainProvider.transactionFailedEvent.subscribe((event: string) => {
            this.toastCtrl.create({
                message: event,
                duration: 5000,
                cssClass: "toast-fail"
            }).present();
        })
    }

    public openAccountDetails(): void {
        this.navCtrl.push("AccountDetailsPage");
    }

    public scanQrCode(): void {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    let scanSub = this.qrScanner.scan().subscribe(async (text: string) => {
                        this.qrScanner.hide();
                        scanSub.unsubscribe();
                        window.document.querySelector('ion-app').classList.remove('transparent-body');

                        let loader = this.loadingCtrl.create({
                            content: "Guthaben wird gutgeschrieben...",
                        });
                        loader.present();
                        await this.blockchainProvider.withDraw(JSON.parse(text));
                        loader.dismiss();
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
