import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Order, OrderDetailResponse, OrderListResponseDto } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/order/orders';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http
      .get<OrderListResponseDto>(this.apiUrl)
      .pipe(
        map(response => response.orderList),
        catchError(this.errorHandler)
      );
  }

  getById(id: string): Observable<OrderDetailResponse> {
    return this.http.get<OrderDetailResponse>(`${this.apiUrl}/${id}`).
    pipe(
      catchError(this.errorHandler)
      )
  }

  errorHandler(error: any): Observable<never> {
    const errorMessage =
      error.error instanceof ErrorEvent
        ? error.error.errorMessage
        : `Error Code: $(error.status)\nMessage : ${error.message}`;
      throw new Error(errorMessage);
  }
}
