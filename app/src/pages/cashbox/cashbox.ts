import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {BlockchainProvider} from "../../providers/blockchain/blockchain";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";

/**
 * Generated class for the CashboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-cashbox',
    templateUrl: 'cashbox.html',
})
export class CashboxPage {
    public qrCodeData: string;
    public amount: number = 500;
    public refund: number = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, private blockchainProvider: BlockchainProvider, private qrScanner: QRScanner, private loadingCtrl: LoadingController) {
    }

    useCoupon() {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    let scanSub = this.qrScanner.scan().subscribe(async (text: string) => {
                        this.qrScanner.hide();
                        scanSub.unsubscribe();
                        window.document.querySelector('ion-app').classList.remove('transparent-body')

                        let loader = this.loadingCtrl.create({
                            content: "Coupon wird eingelöst...",
                        });
                        loader.present();
                        const tx = await this.blockchainProvider.remove(45, text);
                        console.log("tx", tx);
                        this.refund = 45;
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

    removeCoupon() {
        this.refund = 0;
    }

    async generateQrCode() {
        let loader = this.loadingCtrl.create({
            content: "Kassenzettel wird gedruckt...",
        });
        loader.present();
        const secret = +new Date() + "";
        console.log("🔐 Generated Secret: " + secret);
        await this.blockchainProvider.allowWithdrawal(+this.amount, secret);
        this.qrCodeData = JSON.stringify({ secret : secret, addr: "0x02Bf9b7d3dD7a008CA608102a01c877E1509883F"});
        loader.dismiss();
    }
}
