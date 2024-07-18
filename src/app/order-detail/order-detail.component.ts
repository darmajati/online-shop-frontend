import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderDetailResponse } from '../order/order';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterModule, MatCardModule, MatButtonModule, MatIcon],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  order: OrderDetailResponse | undefined;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if(itemId) {
      this.loadOrderDetail(itemId);
    }
  }

  loadOrderDetail(id: string): void {
    this.orderService.getById(id).subscribe({
      next: (order: OrderDetailResponse) => {
        this.order = order;
      },
      error: (error) => {
        console.error('There was an error!', error)
      }
    })
  }
}
