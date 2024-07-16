import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../table/table.component';
import {MatButtonModule} from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/customer';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [TableComponent, MatButtonModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  displayedColumns: string[] = ['pic', 'customerId', 'customerName', 'customerCode', 'Action'];
  dataSource: MatTableDataSource<Customer>;

  constructor(private customerService: CustomerService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAll().subscribe({
      next: (data: Customer[]) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  getDetailRoute(): string {
    return '/customer-detail';
  }
}
