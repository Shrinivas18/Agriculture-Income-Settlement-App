import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  // GET Data from transactionIncome table
  getIncomeData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getIncomeData`);
  }

  // POST data to transactionIncome table
  postIncomeData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/postIncomeData`, data);

    }

  // GET data by id from transactionIncome table
  getIncomeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getIncomeById/${id}`);
  }  

// DELETE data by id from transactionIncome table
  deleteIncome(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteIncome/${id}`);
  }

// UPDATE data from transactionIncome table
  updateIncome(id: number, newData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateIncome/${id}`, newData);
  }

//--------------------------------------------------------------------------------------------------------------------

 // GET Data from transactionIncome table
 getInvestData(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/getInvestData`);
}

// POST data to transactionExpense table
postInvestData(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/postInvestData`, data);
  }

  // Get invest by id from transactionExpense table
  getInvestById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getInvestById/${id}`);
  }   

// DELETE data by id from transactionExpense table
deleteInvest(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/deleteInvest/${id}`);
}

// UPDATE data from transactionExpense table
updateInvest(id: number, newData: any): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/updateInvest/${id}`, newData);
}
}
