import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentBankInfo } from '../models/student-bank-info';
const urlApi = 'http://localhost:8888/studentBankInfo';
@Injectable({
  providedIn: 'root',
})
export class StudentBankInfoService {
  constructor(private http: HttpClient) {}
  getAllStudentBankInfos(
    page: number,
    numberItems: number
  ): Observable<StudentBankInfo[]> {
    return this.http.get<StudentBankInfo[]>(
      urlApi +
        '/get-all-studentBankInfo?page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  filter(
    filter: string,
    page: number,
    numberItems: number
  ): Observable<StudentBankInfo[]> {
    return this.http.get<StudentBankInfo[]>(
      urlApi +
        '/filter?filter=' +
        filter +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  getById(id: number): Observable<StudentBankInfo> {
    return this.http.get<StudentBankInfo>(
      urlApi + '/get-studentBankInfo?id=' + id
    );
  }

  insertStudentBankInfo(StudentBankInfo: StudentBankInfo): Observable<String> {
    return this.http.post<String>(
      urlApi + '/insert-studentBankInfo',
      StudentBankInfo
    );
  }
  updateStudentBankInfo(StudentBankInfo: StudentBankInfo): Observable<String> {
    return this.http.put<String>(
      urlApi + '/update-studentBankInfo',
      StudentBankInfo
    );
  }
  deleteStudentBankInfo(id: number): Observable<String> {
    return this.http.delete<String>(
      urlApi + '/delete-studentBankInfo?id=' + id
    );
  }
}
