import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
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
    public testInput: string;

    constructor(private navCtrl: NavController, private qrScanner: QRScanner, private blockchainProvider: BlockchainProvider, public toastCtrl: ToastController) {
        this.addr$ = this.blockchainProvider.addr;
        this.bons$ = this.blockchainProvider.bons;

        this.blockchainProvider.balanceChangedEvent.subscribe((event: string) => {
            this.toastCtrl.create({
                message: event,
                duration: 5000,
                cssClass: "secondary"
            }).present();
        });

        this.blockchainProvider.transactionFailedEvent.subscribe((event: string) => {
            this.toastCtrl.create({
                message: event,
                duration: 5000,
                cssClass: "danger"
            }).present();
        })
    }

    public openAccountDetails(): void {
        this.navCtrl.push("AccountDetailsPage");
    }

    public test() {
        this.blockchainProvider.withDraw({addr: "0x841715D615fb5C053ed6104a59bB199def9B2852", secret: this.testInput});
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
