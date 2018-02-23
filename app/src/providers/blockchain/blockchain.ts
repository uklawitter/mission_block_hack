import {EventEmitter, Injectable} from '@angular/core';
import {Map} from 'immutable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import Web3 from 'web3';
import {Account} from 'web3/types';

// TODO: for debugging only
const PRIVATE_KEY = "0xa0f2f1f1ecaca75f71f33b356e31821edaac19ec486fe3c097378e65bb22f63a";

/*
  Generated class for the BlockchainProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BlockchainProvider {

    public addr = new BehaviorSubject<string>("");
    public balanceChangedEvent = new EventEmitter<string>();
    public transactionFailedEvent = new EventEmitter<string>();
    public bons = new BehaviorSubject<Map<string, CompanyEntry>>(Map<string, CompanyEntry>());

    private web3: Web3;
    private account: Account;

    constructor() {
        console.log('Initiate Blockchain Provider');
        this.web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io"));
        this.account = this.web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
        this.addr.next(this.account.address);
        console.log(this.web3);
        this.initAsync();
    }

    async initAsync() {
        const map = this.bons.getValue().set("dummyaddr", {addr: "dummyaddr", logo: "assets/imgs/kl_logo.png", value: 7, name: "Koin"});
        this.bons.next(map.set("dummyaddr2", {addr: "dummyaddr2", logo: "assets/imgs/logo_2.jpeg", value: 15, name: "Lidl Coin"}));
        console.log(this.bons.getValue());
        const alive = await this.web3.eth.net.isListening();
        console.log('web3 connected: ' + alive);
        console.log(this.account);
        console.log('balance: ' + await this.web3.eth.getBalance(this.account.address));
    }

    async withDraw(walletAdr: string, secret: string): Promise<number> {
        return null;
    }

    getSignedPublicKeyData() : {message: string} {
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);
        return this.web3.eth.accounts.sign(
            JSON.stringify({
                creation: now,
                expires: tomorrow,
                addr: this.account.address
            }), this.account.privateKey) as {message: string};
    }

}

export interface CompanyEntry {
    addr: string
    logo: string
    value: number
    name: string
}