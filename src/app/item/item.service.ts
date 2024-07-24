import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Item, ItemDetailResponse, ItemListResponseDto } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:8080/api/item/items'
  constructor(private http: HttpClient) { }

  getAll(): Observable<Item[]>{
    return this.http
      .get<ItemListResponseDto>(this.apiUrl)
      .pipe(
        map(response => response.itemList),
        catchError(this.errorHandler)
      );
  }

  getById(id: string): Observable<ItemDetailResponse> {
    return this.http.get<ItemDetailResponse>(`${this.apiUrl}/${id}`).
    pipe(
      catchError(this.errorHandler)
    );
  }

  create(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteItem(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/delete`, {}).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any): Observable<never> {
    const errorMessage =
      error.error instanceof ErrorEvent
        ? error.error.errorMessage
        : `Error Code: $(error.status)\nMessage : ${error.message}`;
      throw new Error(errorMessage);
  }
}
