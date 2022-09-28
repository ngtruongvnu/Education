import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicePackage } from '../models/service-package';
const urlApi = 'http://localhost:8888/service-package';
@Injectable({
  providedIn: 'root',
})
export class ServicePackageService {
  constructor(private http: HttpClient) {}
  getAllServicePackages(
    page: number,
    numberItems: number
  ): Observable<ServicePackage[]> {
    return this.http.get<ServicePackage[]>(
      urlApi + '/get-all-packages?page=' + page + '&numberItems=' + numberItems
    );
  }

  getById(id: number): Observable<ServicePackage> {
    return this.http.get<ServicePackage>(urlApi + '/get-package?id=' + id);
  }

  getByTutorId(id: number): Observable<ServicePackage> {
    return this.http.get<ServicePackage>(
      urlApi + '/get-package-by-tutorId?id=' + id
    );
  }

  insertServicePackage(ServicePackage: ServicePackage): Observable<String> {
    return this.http.post<String>(urlApi + '/insert-package', ServicePackage);
  }
  updateServicePackage(ServicePackage: ServicePackage): Observable<String> {
    return this.http.put<String>(urlApi + '/update-package', ServicePackage);
  }
  deleteServicePackage(id: number): Observable<String> {
    return this.http.delete<String>(urlApi + '/delete-package?id=' + id);
  }
}
