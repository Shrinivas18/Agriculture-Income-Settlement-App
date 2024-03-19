import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseHeadServiceService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  // get Data from table
  getExpenseData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getExpenseData`);
  }

// post data to table
postExpenseData(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/postExpenseData`, data);
  }

  // GET data by id from transactionIncome table
  getExpenseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getExpenseById/${id}`);
  }  

// DELETE data by id from transactionIncome table
deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteExpense/${id}`);
  }

// UPDATE data from transactionIncome table
updateExpense(id: number, newData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateExpense/${id}`, newData);
  }
}
