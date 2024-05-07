import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private apiUrl =  environment.apiUrl + 'owners';

  constructor(private http: HttpClient) { }

  createOwner(ownerData: any): Observable<any> {
    return this.http.post(this.apiUrl, ownerData);
  }

  getAllOwners(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getOwnerById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateOwner(id: number, ownerData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, ownerData);
  }

  deleteOwner(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
