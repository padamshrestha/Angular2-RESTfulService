import { Component, OnInit } from 'angular2/core';
import { Observable } from 'rxjs/Rx';

import { DataService } from '../shared/services/data.service';
import { ICustomer } from '../shared/interfaces';

@Component({
    selector: 'customers',
    templateUrl: 'app/customers/customers.component.html'
})
export class CustomersComponent implements OnInit {
    
    customers: ICustomer[] = [];
    editId: number = 0;
    errorMessage: string;

    constructor(private _dataService: DataService) {  }

    ngOnInit() { 
        this._dataService.getCustomersSummary()
            .subscribe((data: ICustomer[]) => this.customers = data);
    }
    
    save(customer: ICustomer) {
        this._dataService.updateCustomer(customer)
            .subscribe((status: boolean) => {
                if (status) this.editId = 0;
                else this.errorMessage = 'Unable to save customer';
            })
    }

}