import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ MatTabsModule, CustomerListComponent, ItemListComponent, OrderListComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

}
