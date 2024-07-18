import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../order/order';
import { OrderService } from '../order/order.service';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent {
  displayedColumns: string[] = [
    'orderId',
    'orderCode',
    'orderDate',
    'totalPrice',
    'Action'
  ];
  dataSource: MatTableDataSource<Order>;

  constructor(private orderService: OrderService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getAll().subscribe({
      next: (data: Order[]) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  getDetailRoute(): string {
    return '/order-detail';
  }
}
