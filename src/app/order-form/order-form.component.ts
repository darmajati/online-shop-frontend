import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerService } from '../customer/customer.service';
import { ItemService } from '../item/item.service';
import { map, Observable, startWith } from 'rxjs';
import { Customer } from '../customer/customer';
import { Item } from '../item/item';
import { OrderService } from '../order/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from '../order/order';

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
  orderForm = new FormGroup({
    customerId: new FormControl<number | null>(null, Validators.required),
    itemsId: new FormControl<number | null>(null, Validators.required),
    quantity: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  isEditMode = false;
  orderId: string | null = null;
  customerControl = new FormControl('', Validators.required);
  itemControl = new FormControl('', Validators.required);
  filteredCustomers: Observable<Customer[]> | undefined;
  filteredItems: Observable<Item[]> | undefined;
  customers: Customer[] = [];
  items: Item[] = [];

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.loadCustomers();
    this.loadItems();

    // Load order after customers and items are loaded
    setTimeout(() => {
      this.orderId = this.route.snapshot.paramMap.get('id');
      if (this.orderId) {
        this.isEditMode = true;
        this.loadOrder(this.orderId);
      }
    }, 500); // Adjust the timeout as needed
  }

  private loadOrder(id: string) {
    this.orderService.getById(id).subscribe((order) => {
      this.orderForm.setValue({
        customerId: order.customerId,
        itemsId: order.itemId,
        quantity: order.quantity,
      });
      // Set default values for the autocomplete fields
      const customer = this.customers.find(
        (c) => c.customerId === order.customerId
      );
      if (customer) {
        this.customerControl.setValue(customer.customerName);
      }
      const item = this.items.find((i) => i.itemId === order.itemId);
      if (item) {
        this.itemControl.setValue(item.itemName);
      }
    });
  }

  private loadCustomers() {
    this.customerService.getAll().subscribe((data: Customer[]) => {
      this.customers = data;
      this.filteredCustomers = this.customerControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.filterCustomers(value || ''))
      );
    });
  }

  private loadItems() {
    this.itemService.getAll().subscribe((data: Item[]) => {
      this.items = data;
      this.filteredItems = this.itemControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.filterItems(value || ''))
      );
    });
  }

  private filterCustomers(value: string): Customer[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter((customer) =>
      customer.customerName.toLowerCase().includes(filterValue)
    );
  }

  private filterItems(value: string): Item[] {
    const filterValue = value.toLowerCase();
    return this.items.filter((item) =>
      item.itemName.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const orderData: Order = this.orderForm.value as Order;
      console.log('Order Data:', orderData);
      if (this.isEditMode && this.orderId) {
        // Update order
        this.orderService.update(this.orderId, orderData).subscribe(
          (response) => {
            console.log('Order updated successfully', response);
            this.snackBar.open('Order updated successfully', 'Close', {
              duration: 2000,
            });
          },
          (error) => {
            console.error('Error updating order', error);
            this.snackBar.open('Error updating order', 'Close', {
              duration: 3000,
            });
          }
        );
      } else {
        // Create new order
        this.orderService.create(orderData).subscribe(
          (response) => {
            console.log('Order created successfully', response);
            this.snackBar.open('Order created successfully', 'Close', {
              duration: 2000,
            });
          },
          (error) => {
            console.error('Error creating order', error);
            this.snackBar.open('Error creating order', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    } else {
      this.snackBar.open('Please fill all required fields correctly', 'Close', {
        duration: 3000,
      });
    }
  }

  onCustomerSelected(event: any) {
    const selectedCustomer = this.customers.find(
      (c) => c.customerId === event.option.value
    );
    if (selectedCustomer) {
      this.orderForm.patchValue({ customerId: selectedCustomer.customerId });
    }
  }

  onItemSelected(event: any) {
    const selectedItem = this.items.find(
      (i) => i.itemId === event.option.value
    );
    if (selectedItem) {
      this.orderForm.patchValue({ itemsId: selectedItem.itemId });
    }
  }
}
