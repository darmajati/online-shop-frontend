import {OnInit, AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['customerId', 'customerName', 'customerAddress', 'customerPhone', 'pic', 'action'];
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private customerService: CustomerService) {
    this.dataSource = new MatTableDataSource();
    this.paginator = {} as MatPaginator;
    this.sort = {} as MatSort;
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
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  goToAddCustomer() {  // Tambahkan fungsi ini
    this.router.navigate(['/add-customer']);
  }

  editCustomer(id: number) {
    // Tambahkan logika untuk mengedit pelanggan
    console.log(`Edit customer with ID: ${id}`);
  }

  deleteCustomer(id: number) {
    // Tambahkan logika untuk menghapus pelanggan
    console.log(`Delete customer with ID: ${id}`);
  }
}