import {EventEmitter, Injectable} from '@angular/core';
import {Map} from 'immutable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import Web3 from 'web3';
import {Account, Contract} from 'web3/types';

// TODO: for debugging only
const PRIVATE_KEY = "0xa0f2f1f1ecaca75f71f33b356e31821edaac19ec486fe3c097378e65bb22f63a";
const PRIVATE_KEY_COMPANY = "0x991f43aed4b487c5a0d1fb0fe575b0e55759b63cdd6841b18dcbe154e96ba9a2";

// const KOVAN_TEST_NET = "https://kovan.infura.io";
// const KOVAN_TEST_NET = "wss://kovan.infura.io/ws";
// const KOVAN_TEST_NET = "ws://localhost:8546";
const KOVAN_TEST_NET = "ws://141.52.39.150:8546";



/*
  Generated class for the BlockchainProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BlockchainProvider {
    public CONTR = "0x02Bf9b7d3dD7a008CA608102a01c877E1509883F";
    public addr = new BehaviorSubject<string>("");
    public balanceChangedEvent = new EventEmitter<string>();
    public transactionFailedEvent = new EventEmitter<string>();
    public bons = new BehaviorSubject<Map<string, CompanyEntry>>(Map<string, CompanyEntry>());

    private web3: Web3;
    private account: Account;
    private companyAccount: Account;
    private baseBonusCoinContract: any;

    constructor() {
        console.log('Initiate Blockchain Provider');
        this.web3 = new Web3(new Web3.providers.WebsocketProvider(KOVAN_TEST_NET));
        this.account = this.web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
        this.companyAccount = this.web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY_COMPANY);
        this.addr.next(this.account.address);
        this.baseBonusCoinContract = new this.web3.eth.Contract([
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "secret",
                            "type": "string"
                        }
                    ],
                    "name": "testHashes",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bytes32"
                        },
                        {
                            "name": "",
                            "type": "bytes32"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "pure",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "getBalance",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "coinName",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "wallet",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "coinName",
                            "type": "string"
                        },
                        {
                            "indexed": false,
                            "name": "oldBalance",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "newBalance",
                            "type": "uint256"
                        }
                    ],
                    "name": "BalanceChanged",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "wallet",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "coinName",
                            "type": "string"
                        },
                        {
                            "indexed": false,
                            "name": "attemptedPurchase",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "currentBalance",
                            "type": "uint256"
                        }
                    ],
                    "name": "TransactionFailed",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "wallet",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "coinName",
                            "type": "string"
                        },
                        {
                            "indexed": false,
                            "name": "usedSecret",
                            "type": "string"
                        }
                    ],
                    "name": "WithdrawalFailed",
                    "type": "event"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "name": "hashedSecret",
                            "type": "bytes32"
                        }
                    ],
                    "name": "allowWithdrawal",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "name": "wallet",
                            "type": "address"
                        }
                    ],
                    "name": "remove",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "secret",
                            "type": "string"
                        }
                    ],
                    "name": "withdraw",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "name": "newName",
                            "type": "string"
                        },
                        {
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                }
            ]
            , "", {gasPrice: 20000000000});
        console.log(this.web3);
        this.initAsync();
    }

    async initAsync() {
        const contr: any = this.baseBonusCoinContract.clone();
        contr.options.address = this.CONTR;
        const map = this.bons.getValue().set(this.CONTR, {
            addr: this.CONTR,
            logo: "assets/imgs/kl_logo.png",
            value: await contr.methods.getBalance().call({from: this.account.address}),
            name: "Koin",
            contract: null
        });
        this.bons.next(map.set("dummyaddr2", {
            addr: "0x004fb0844f5dcE356E9D8Ffa3172052b28F91141",
            logo: "assets/imgs/logo_2.jpeg",
            value: 15,
            name: "Lidl Coin",
            contract: null
        }));
        console.log(this.bons.getValue());
        const alive = await this.web3.eth.net.isListening();
        if (!alive) {
            console.error("Could not Connect to " + KOVAN_TEST_NET);
            return
        }
        console.log('🔋 web3 connected: ' + alive);
        console.log(this.account);
        console.log('💶 balance: ' + await contr.methods.getBalance().call({from: this.account.address}));

        console.log(this.web3.eth.accounts.sign(
            JSON.stringify({
                creation: new Date(),
                expires: new Date(),
                addr: this.account.address
            }), this.account.privateKey) as { message: string });


        contr.events.BalanceChanged({filter: {wallet: this.account.address}}, (error, event) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log(event);
            this.balanceChangedEvent.emit("Action! : " + (event.returnValues.newBalance - event.returnValues.oldBalance)
                .toFixed(2));
            const company = this.bons.getValue().get(event.address);
            company.value = event.returnValues.newBalance;
            this.bons.next(this.bons.getValue().set(event.address, company));

        });

        console.log(await contr.methods.getBalance().call({from: this.account.address}));

    }

    async withDraw(scanInput: ScanInput): Promise<void> {
        console.log(scanInput);
        const company = this.bons.getValue().get(scanInput.addr);
        if (!company) {
            if (!scanInput.addr) {
                return;
            } else {
                // TODO add company
            }
        }
        const contr: any = this.baseBonusCoinContract.clone();
        contr.options.address = scanInput.addr;
        await contr.methods.withdraw(scanInput.secret).send({from: this.account.address});
    }

    getSignedPublicKeyData(): { message: string } {
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);
        return this.web3.eth.accounts.sign(
            JSON.stringify({
                creation: now,
                expires: tomorrow,
                addr: this.account.address
            }), this.account.privateKey) as { message: string };
    }

    async allowWithdrawal( value: number, secret: string) {
        const contr = this.baseBonusCoinContract.clone();
        contr.options.address = this.CONTR;
        return contr.methods.allowWithdrawal(value, this.web3.utils.keccak256(secret)).send({from: this.companyAccount.address});
    }

    async remove(value: number, qrstring: string) {
        const qr = JSON.parse(qrstring);
        const message = JSON.parse(qr.message);
        const contr = this.baseBonusCoinContract.clone();
        contr.options.address = this.CONTR;
        await contr.methods.remove(value, message.addr).send({from: this.companyAccount.address});
    }
}

export interface CompanyEntry {
    addr: string
    logo: string
    value: number
    name: string
    contract: Contract
}

export interface ScanInput {
    addr: string
    secret: string
}