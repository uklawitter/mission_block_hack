import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BlockchainProvider} from '../../providers/blockchain/blockchain';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private blockchainProvider: BlockchainProvider) {
      // is a behavior subject
      console.log(blockchainProvider.addr.getValue());
      // make qr with JSON.stringify(qr)
      const qr = blockchainProvider.getSignedPublicKeyData();
      console.log(JSON.parse(qr.message));
  }

}
