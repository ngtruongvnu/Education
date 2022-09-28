import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TutorRequest } from '../models/tutor-request';
const urlApi = 'http://localhost:8888/tutorRequest';
@Injectable({
  providedIn: 'root',
})
export class TutorRequestService {
  constructor(private http: HttpClient) {}
  getAllTutorRequests(
    page: number,
    numberItems: number
  ): Observable<TutorRequest[]> {
    return this.http.get<TutorRequest[]>(
      urlApi +
        '/get-all-tutorRequests?page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }

  getAll(): Observable<TutorRequest[]> {
    return this.http.get<TutorRequest[]>(urlApi + '/get-all');
  }

  checkRequest(
    subjectId: number,
    levelId: number,
    TutorId: number
  ): Observable<Boolean> {
    return this.http.get<Boolean>(
      urlApi +
        '/check?subjectId=' +
        subjectId +
        '&levelId=' +
        levelId +
        '&TutorId=' +
        TutorId
    );
  }

  filter(
    filter: string,
    page: number,
    numberItems: number
  ): Observable<TutorRequest[]> {
    return this.http.get<TutorRequest[]>(
      urlApi +
        '/filter-tutorRequest?filter=' +
        filter +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }

  getAllFilter(filter: string): Observable<TutorRequest[]> {
    return this.http.get<TutorRequest[]>(
      urlApi + '/get-all-filter?filter=' + filter
    );
  }

  getById(id: number): Observable<TutorRequest> {
    return this.http.get<TutorRequest>(urlApi + '/get-tutorRequest?id=' + id);
  }

  insertTutorRequest(
    TutorRequest: TutorRequest,
    id: number
  ): Observable<TutorRequest> {
    return this.http.post<TutorRequest>(
      urlApi + '/insert-tutorRequest?tutorDetailId=' + id,
      TutorRequest
    );
  }
  updateTutorRequest(TutorRequest: TutorRequest): Observable<String> {
    return this.http.put(urlApi + '/update-tutorRequest', TutorRequest, {
      responseType: 'text',
    });
  }
  deleteTutorRequest(id: number): Observable<String> {
    return this.http.delete(urlApi + '/delete-tutorRequest?id=' + id, {
      responseType: 'text',
    });
  }
}
