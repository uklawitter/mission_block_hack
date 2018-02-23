import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BlockchainProvider} from '../../providers/blockchain/blockchain';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private blockchainProvider: BlockchainProvider) {
  }

}
