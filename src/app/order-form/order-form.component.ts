import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../customer/customer.service';
import { ItemService } from '../item/item.service';
import { map, Observable, startWith } from 'rxjs';
import { Customer } from '../customer/customer';
import { Item } from '../item/item';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent implements OnInit {
  customerControl = new FormControl('');
  itemControl = new FormControl('');
  filteredCustomers: Observable<Customer[]> | undefined;
  filteredItems: Observable<Item[]> | undefined;
  customers: Customer[] = [];
  items: Item[] = [];

  constructor(
    private customerService: CustomerService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.loadCustomers();
    this.loadItems();
  }

  private loadCustomers() {
    this.customerService.getAll().subscribe((data: Customer[]) => {
      this.customers = data;
      this.filteredCustomers = this.customerControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterCustomers(value || ''))
      );
    });
  }

  private loadItems() {
    this.itemService.getAll().subscribe((data: Item[]) => {
      this.items = data;
      this.filteredItems = this.itemControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterItems(value || ''))
      );
    });
  }

  private filterCustomers(value: string): Customer[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(customer =>
      customer.customerName.toLowerCase().includes(filterValue)
    );
  }

  private filterItems(value: string): Item[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(item =>
      item.itemName.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() {
    console.log('on submit');
  }
}
