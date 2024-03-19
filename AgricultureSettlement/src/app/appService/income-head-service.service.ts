import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeHeadServiceService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  // get Data from table
  getSourceData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getSourceData`);
  }

// post data to table
  postSourceData(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/postSourceData`, data);
  }

  // GET data by id from transactionIncome table
  getSourceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getSourceById/${id}`);
  }  

// DELETE data by id from transactionIncome table
deleteSource(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteSource/${id}`);
  }

// UPDATE data from transactionIncome table
updateSource(id: number, newData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateSource/${id}`, newData);
  }
}
