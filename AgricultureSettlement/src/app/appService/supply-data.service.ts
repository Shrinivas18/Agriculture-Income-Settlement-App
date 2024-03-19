import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Audit } from '../Models/audit';

@Injectable({
  providedIn: 'root'
})
export class SupplyDataService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  // GET Data from supply table
  getSupplyData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getSupplyData`);
  }

  // POST data to supply table
  postSupplyData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/postSupplyData`, data);
    }

  // GET data by id from supply table
  getSupplyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getSupplyById/${id}`);
  }  

// DELETE data by id from suppy table
deleteSupply(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteSupply/${id}`);
  }

// UPDATE data from suppy table
updateSupply(id: number, newData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateSupply/${id}`, newData);
  }

  // POST data to history table
  postHistory(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/postHistory`, data);
    }

    // POST data to transactionIncome table
  postAudit(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/postAudit`, data);
  }

  getAuditByName(name: string): Observable<Audit[]> {
    const url = `${this.baseUrl}/getAuditByName/${name}`;
    return this.http.get<Audit[]>(url);
  }
}
