import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer/customer.service';
import { CustomerDetailResponse } from '../customer/customer';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css',
})
export class CustomerDetailComponent {
  customer: CustomerDetailResponse | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId) {
      this.loadCustomerDetail(customerId);
    }
  }

  loadCustomerDetail(id: string): void {
    this.customerService.getById(id).subscribe({
      next: (customer: CustomerDetailResponse) => {
        this.customer = customer;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
