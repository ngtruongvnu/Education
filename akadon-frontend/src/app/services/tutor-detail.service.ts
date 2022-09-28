import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TutorDetail } from '../models/tutor-detail';
const urlApi = 'http://localhost:8888/tutor-detail';
@Injectable({
  providedIn: 'root',
})
export class TutorDetailService {
  constructor(private http: HttpClient) {}
  getAllTutorDetails(
    page: number,
    numberItems: number
  ): Observable<TutorDetail[]> {
    return this.http.get<TutorDetail[]>(
      urlApi +
        '/get-all-tutorDetails?page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }

  getById(
    id: number,
    page: number,
    numberItems: number
  ): Observable<TutorDetail[]> {
    return this.http.get<TutorDetail[]>(
      urlApi +
        '/get-tutorDetail?id=' +
        id +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }

  getAllById(id: number): Observable<TutorDetail[]> {
    return this.http.get<TutorDetail[]>(
      urlApi + '/get-tutorDetailById?id=' + id
    );
  }

  getSuitableTutor(
    levelId: number,
    subjectId: number,
    page: number,
    numberItems: number
  ): Observable<TutorDetail[]> {
    return this.http.get<TutorDetail[]>(
      urlApi +
        '/get-suitableTutor?levelId=' +
        levelId +
        '&subjectId=' +
        subjectId +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }

  countSuitableTutor(levelId: number, subjectId: number): Observable<number> {
    return this.http.get<number>(
      urlApi +
        '/count-suitableTutor?levelId=' +
        levelId +
        '&subjectId=' +
        subjectId
    );
  }

  insertTutorDetail(TutorDetail: TutorDetail): Observable<String> {
    return this.http.post(urlApi + '/insert-tutorDetail', TutorDetail, {
      responseType: 'text',
    });
  }
  updateTutorDetail(TutorDetail: TutorDetail): Observable<String> {
    return this.http.put(urlApi + '/update-tutorDetail', TutorDetail, {
      responseType: 'text',
    });
  }
  deleteTutorDetail(id: number): Observable<String> {
    return this.http.delete(urlApi + '/delete-tutorDetail?id=' + id, {
      responseType: 'text',
    });
  }
}
