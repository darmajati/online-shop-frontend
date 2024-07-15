import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatTabsModule, CustomerListComponent, ItemListComponent, OrderListComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'online-shop';
}
