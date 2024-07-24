import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
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
export class ListComponent implements OnInit {
  selectedIndex = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const tabIndex = +params['tabIndex'];
      if (!isNaN(tabIndex)) {
        this.selectedIndex = tabIndex;
      }
    });
  }
}
