import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BlockchainProvider} from "../../providers/blockchain/blockchain";

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
    public amount: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private blockchainProvider: BlockchainProvider) {
    }

    async generateQrCode() {
        const secret = new Date().toDateString();
        await this.blockchainProvider.allowWithdrawal(+this.amount, secret);
        this.qrCodeData = JSON.stringify({ secret : secret, addr: "0x02Bf9b7d3dD7a008CA608102a01c877E1509883F"});
    }
}
