import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, catchError} from 'rxjs';
import { Customer, CustomerListResponseDto, CustomerDetailResponse } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/customer/customers';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Customer[]> {
  return this.http
   .get<CustomerListResponseDto>(this.apiUrl)
   .pipe(
    map(response => response.customerList),
    catchError(this.errorHandler)
    );
}


  getById(id: string): Observable<CustomerDetailResponse> {
    return this.http.get<CustomerDetailResponse>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  addCustomer(data: any, photo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    formData.append('photo', photo);

    return this.http.post<any>(this.apiUrl, formData).pipe(
      catchError(this.errorHandler)
    );
  }

  updateCustomer(id: string, data: any, photo?: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    if (photo) {
      formData.append('photo', photo);
    }
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteCustomer(id: number): Observable<any> {
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
