import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentRequest } from '../models/student-request';
const urlApi = 'http://localhost:8888/studentRequest';
@Injectable({
  providedIn: 'root',
})
export class StudentRequestService {
  constructor(private http: HttpClient) {}
  getAllStudentRequests(
    page: number,
    numberItems: number
  ): Observable<StudentRequest[]> {
    return this.http.get<StudentRequest[]>(
      urlApi +
        '/get-all-studentRequests?page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }

  getAll(): Observable<StudentRequest[]> {
    return this.http.get<StudentRequest[]>(urlApi + '/get-all');
  }

  checkRequest(
    subjectId: number,
    levelId: number,
    studentId: number
  ): Observable<Boolean> {
    return this.http.get<Boolean>(
      urlApi +
        '/check?subjectId=' +
        subjectId +
        '&levelId=' +
        levelId +
        '&studentId=' +
        studentId
    );
  }

  filter(
    filter: string,
    page: number,
    numberItems: number
  ): Observable<StudentRequest[]> {
    return this.http.get<StudentRequest[]>(
      urlApi +
        '/filter-studentRequest?filter=' +
        filter +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }

  getAllFilter(filter: string): Observable<StudentRequest[]> {
    return this.http.get<StudentRequest[]>(
      urlApi + '/get-all-filter?filter=' + filter
    );
  }

  getById(id: number): Observable<StudentRequest> {
    return this.http.get<StudentRequest>(
      urlApi + '/get-studentRequest?id=' + id
    );
  }

  insertStudentRequest(
    StudentRequest: StudentRequest
  ): Observable<StudentRequest> {
    return this.http.post<StudentRequest>(
      urlApi + '/insert-studentRequest',
      StudentRequest
    );
  }
  updateStudentRequest(StudentRequest: StudentRequest): Observable<String> {
    return this.http.put(urlApi + '/update-studentRequest', StudentRequest, {
      responseType: 'text',
    });
  }
  deleteStudentRequest(id: number): Observable<String> {
    return this.http.delete(urlApi + '/delete-studentRequest?id=' + id, {
      responseType: 'text',
    });
  }
}
