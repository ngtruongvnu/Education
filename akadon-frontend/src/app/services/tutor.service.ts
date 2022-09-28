import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../models/tutor';
import { StudentRequest } from '../models/student-request';
const urlApi = 'http://localhost:8888/tutor';
@Injectable({
  providedIn: 'root',
})
export class TutorService {
  constructor(private http: HttpClient) {}
  getAllTutors(page: number, numberItems: number): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(
      urlApi + '/get-all-tutors?page=' + page + '&numberItems=' + numberItems
    );
  }

  countAllTutor(): Observable<number> {
    return this.http.get<number>(urlApi + '/count-all-tutor');
  }

  getFeaturedTutors(page: number, numberItems: number): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(
      urlApi +
        '/get-featured-tutors?page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }

  filter(
    filter: string,
    page: number,
    numberItems: number
  ): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(
      urlApi +
        '/filter?filter=' +
        filter +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  getById(id: number): Observable<Tutor> {
    return this.http.get<Tutor>(urlApi + '/get-tutor?id=' + id);
  }

  getStudentRequestForTutor(
    query: string,
    page: number,
    numberItems: number
  ): Observable<StudentRequest[]> {
    return this.http.get<StudentRequest[]>(
      urlApi +
        '/get-student-request?query=' +
        query +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }

  countStudentRequestForTutor(query: string): Observable<number> {
    return this.http.get<number>(
      urlApi + '/count-student-request?query=' + query
    );
  }

  getByEmail(email: string): Observable<Tutor> {
    return this.http.get<Tutor>(urlApi + '/get-tutor-by-email?email=' + email);
  }

  checkEmail(email: string): Observable<Boolean> {
    return this.http.get<Boolean>(urlApi + '/check-email?email=' + email);
  }

  checkPhoneNumber(number: string): Observable<Boolean> {
    return this.http.get<Boolean>(
      urlApi + '/check-phoneNumber?phoneNumber=' + number
    );
  }

  sendCode(email: string): Observable<string> {
    return this.http.get(urlApi + '/send-code?email=' + email, {
      responseType: 'text',
    });
  }

  checkCode(code: string, email: string): Observable<string> {
    return this.http.get(
      urlApi + '/check-code?code=' + code + '&email=' + email,
      {
        responseType: 'text',
      }
    );
  }

  insertTutor(Tutor: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(urlApi + '/insert-tutor', Tutor);
  }
  updateTutor(Tutor: Tutor): Observable<string> {
    return this.http.put(urlApi + '/update-tutor', Tutor, {
      responseType: 'text',
    });
  }
  deleteTutor(id: number): Observable<string> {
    return this.http.delete(urlApi + '/delete-tutor?id=' + id, {
      responseType: 'text',
    });
  }
  login(username: string, password: string): Observable<Tutor> {
    return this.http.get<Tutor>(
      urlApi + '/login?username=' + username + '&password=' + password
    );
  }
}
