import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
const urlApi = 'http://localhost:8888/subject';
@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  getAllSubjects(page: number, numberItems: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(
      urlApi + '/get-all-subjects?page=' + page + '&numberItems=' + numberItems
    );
  }

  getAll(): Observable<Subject[]> {
    return this.http.get<Subject[]>(urlApi + '/get-all');
  }

  getById(id: number): Observable<Subject> {
    return this.http.get<Subject>(urlApi + '/get-subject?id=' + id);
  }

  getByName(name: String): Observable<Subject> {
    return this.http.get<Subject>(urlApi + '/get-by-name?name=' + name);
  }

  getSubject(id: number): Observable<Subject> {
    return this.http.get<Subject>(urlApi + '/get-subject?id=' + id);
  }
  insertSubject(Subject: Subject): Observable<String> {
    return this.http.post<String>(urlApi + '/insert-subject', Subject);
  }
  updateSubject(Subject: Subject): Observable<String> {
    return this.http.put<String>(urlApi + '/update-subject', Subject);
  }
  deleteSubject(id: number): Observable<String> {
    return this.http.delete<String>(urlApi + '/delete-subject?id=' + id);
  }
}
