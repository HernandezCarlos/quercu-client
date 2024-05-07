import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyTypeService {
  private apiUrl = environment.apiUrl + 'property-types';

  constructor(private http: HttpClient) { }

  createPropertyType(propertyTypeData: any): Observable<any> {
    return this.http.post(this.apiUrl, propertyTypeData);
  }

  getAllPropertyTypes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPropertyTypeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updatePropertyType(id: number, propertyTypeData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, propertyTypeData);
  }

  deletePropertyType(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
