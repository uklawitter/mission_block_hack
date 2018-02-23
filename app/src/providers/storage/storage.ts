import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
const CONTRACT_KEY = 'contract';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

    contracts = new BehaviorSubject<string[]>([]);

    constructor() {
        const item = localStorage.getItem(CONTRACT_KEY);
        if(item){
            this.contracts.next(JSON.parse(item) as string[]);
            console.log('loaded: ' + this.contracts.getValue().length + ' addresses');
        }
        console.log('no addresses stored');

    }

    createOrUpdateContractAddr(addr: string) {
        let items = this.contracts.getValue();
        if(!(items.indexOf(addr) > -1)){
            items.push(addr);
            localStorage.setItem(CONTRACT_KEY, JSON.stringify(addr));
        }
    }

}
