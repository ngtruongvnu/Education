import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Level } from '../models/level';
const urlApi = 'http://localhost:8888/level';
@Injectable({
  providedIn: 'root',
})
export class LevelService {
  constructor(private http: HttpClient) {}
  getAllLevels(page: number, numberItems: number): Observable<Level[]> {
    return this.http.get<Level[]>(
      urlApi + '/get-all-levels?page=' + page + '&numberItems=' + numberItems
    );
  }

  getAll(): Observable<Level[]> {
    return this.http.get<Level[]>(urlApi + '/get-all');
  }

  getById(id: number): Observable<Level> {
    return this.http.get<Level>(urlApi + '/get-level?id=' + id);
  }

  getByName(name: String): Observable<Level> {
    return this.http.get<Level>(urlApi + '/get-by-name?name=' + name);
  }
  insertLevel(Level: Level): Observable<String> {
    return this.http.post<String>(urlApi + '/insert-level', Level);
  }
  updateLevel(Level: Level): Observable<String> {
    return this.http.put<String>(urlApi + '/update-level', Level);
  }
  deleteLevel(id: number): Observable<String> {
    return this.http.delete<String>(urlApi + '/delete-level?id=' + id);
  }
}
