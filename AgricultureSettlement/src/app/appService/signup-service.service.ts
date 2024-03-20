import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  // GET Data from supply table
  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getUsers`);
  }

  // POST data to supply table
  postUserData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addUsers`, data);
    }

}
