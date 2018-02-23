import {EventEmitter, Injectable} from '@angular/core';
import {Map} from 'immutable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import Web3 from 'web3';

/*
  Generated class for the BlockchainProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BlockchainProvider {

    private web3: Web3;

    private _tokenContract: any;
    private _tokenContractAddress: string = "0xbc84f3bf7dd607a37f9e5848a6333e6c188d926c";

    public balanceChangedEvent = new EventEmitter<string>();
    public transactionFailedEvent = new EventEmitter<string>();
    public bons = new BehaviorSubject<Map<string, CompanyEntry>>(Map<string, CompanyEntry>());

    constructor() {
        console.log('Initiate Blockchain Provider');
        this.web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io"));
        console.log(this.web3);
        const map = this.bons.getValue().set("dummyaddr", {addr: "dummyaddr", logo: "assets/imgs/kl_logo.png", value: 7, name: "Koin"});
        this.bons.next(map.set("dummyaddr2", {addr: "dummyaddr2", logo: "assets/imgs/logo_2.jpeg", value: 15, name: "Lidl Coin"}));
        console.log(this.bons.getValue());
        this.web3.eth.net.isListening().then(val => console.log('web3 connected: ' +  val));
    }

    async withDraw(walletAdr: string, secret: string): Promise<number> {
        return null;
    }

    getSignedPublicKeyData() {
        return { creation: new Date('20180223'), expires: new Date('20180224'), addr: "dummyaddr" }
    }

}

export interface CompanyEntry {
    addr: string
    logo: string
    value: number
    name: string
}