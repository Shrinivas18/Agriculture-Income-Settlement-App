import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportServiceService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getExpenseReport(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/expenseReport`);
  }
}
