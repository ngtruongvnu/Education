import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TutorBankInfo } from '../models/tutor-bank-info';
const urlApi = 'http://localhost:8888/tutorBankInfo';
@Injectable({
  providedIn: 'root',
})
export class TutorBankInfoService {
  constructor(private http: HttpClient) {}
  getAllTutorBankInfos(
    page: number,
    numberItems: number
  ): Observable<TutorBankInfo[]> {
    return this.http.get<TutorBankInfo[]>(
      urlApi +
        '/get-all-tutorBankInfo?page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  filter(
    filter: string,
    page: number,
    numberItems: number
  ): Observable<TutorBankInfo[]> {
    return this.http.get<TutorBankInfo[]>(
      urlApi +
        '/filter?filter=' +
        filter +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  getById(id: number): Observable<TutorBankInfo> {
    return this.http.get<TutorBankInfo>(urlApi + '/get-tutorBankInfo?id=' + id);
  }

  insertTutorBankInfo(TutorBankInfo: TutorBankInfo): Observable<String> {
    return this.http.post<String>(
      urlApi + '/insert-tutorBankInfo',
      TutorBankInfo
    );
  }
  updateTutorBankInfo(TutorBankInfo: TutorBankInfo): Observable<String> {
    return this.http.put<String>(
      urlApi + '/update-tutorBankInfo',
      TutorBankInfo
    );
  }
  deleteTutorBankInfo(id: number): Observable<String> {
    return this.http.delete<String>(urlApi + '/delete-tutorBankInfo?id=' + id);
  }
}
