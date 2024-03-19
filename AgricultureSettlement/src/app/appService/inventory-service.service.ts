import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  // GET Data from transactionIncome table
  getInventoryData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getInventoryData`);
  }

  // POST data to transactionIncome table
  postInventoryData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/postInventoryData`, data);

    }

  // GET data by id from transactionIncome table
  getInventoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getInventoryById/${id}`);
  }  

// DELETE data by id from transactionIncome table
deleteInventory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteInventory/${id}`);
  }

// UPDATE data from transactionIncome table
updateInventory(id: number, newData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateInventory/${id}`, newData);
  }

// GET expense And sumQty from transactionExpense table.

getExpenseQuantity():Observable<any>{
  return this.http.get<any>(`${this.baseUrl}/getExpenseQuantity`);
}

}
