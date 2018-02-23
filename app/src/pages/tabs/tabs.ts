import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {CashboxPage} from "../cashbox/cashbox";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab2Root = CashboxPage;

    constructor() {

    }
}
