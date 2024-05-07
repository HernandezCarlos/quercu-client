// services/property.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Property } from '../models/property.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = environment.apiUrl + 'properties';

  constructor(private http: HttpClient) { }

  createProperty(propertyData: Property): Observable<any> {
    return this.http.post(this.apiUrl, propertyData);
  }

  getAllProperties(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPropertyById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateProperty(id: number, propertyData: Property): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, propertyData);
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

