import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, catchError} from 'rxjs';
import { Customer, CustomerListResponseDto } from './customer';

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

  create(formData: FormData): Observable<HttpEvent<Customer>> {
    const req = new HttpRequest('POST', this.apiUrl, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders()
    });

    return this.http.request(req);
  }

  find(id: number): Observable<any> {
    if(id !== undefined) {
      return this.http
        .get(this.apiUrl + '/' + id)
        .pipe();
    } else {
      throw new Error('ID is undefined');
    }
  }

  errorHandler(error: any): Observable<never> {
    const errorMessage =
      error.error instanceof ErrorEvent
        ? error.error.errorMessage
        : `Error Code: $(error.status)\nMessage : ${error.message}`;
      throw new Error(errorMessage);
  }

  private getHttpOptions(): object {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
}
