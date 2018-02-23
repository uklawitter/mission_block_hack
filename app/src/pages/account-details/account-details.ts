import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BlockchainProvider} from "../../providers/blockchain/blockchain";

/**
 * Generated class for the AccountDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-account-details',
    templateUrl: 'account-details.html',
})
export class AccountDetailsPage {
    public qrData:string = "";
    public message:{creation:Date, expires:Date} = {creation: new Date(), expires: new Date()};

    constructor(public navCtrl: NavController, public navParams: NavParams, private blockchainProvider: BlockchainProvider) {
    }

    ionViewDidLoad() {
        const signedPublicKeyData = this.blockchainProvider.getSignedPublicKeyData();
        this.qrData = JSON.stringify(signedPublicKeyData);
        this.message = JSON.parse(signedPublicKeyData.message);
    }
}
