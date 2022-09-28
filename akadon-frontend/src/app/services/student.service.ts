import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
const urlApi = 'http://localhost:8888/student';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}
  getAllStudents(page: number, numberItems: number): Observable<Student[]> {
    return this.http.get<Student[]>(
      urlApi + '/get-all-student?page=' + page + '&numberItems=' + numberItems
    );
  }

  countAllStudent(): Observable<number> {
    return this.http.get<number>(urlApi + '/count-all-student');
  }

  filter(
    filter: string,
    page: number,
    numberItems: number
  ): Observable<Student[]> {
    return this.http.get<Student[]>(
      urlApi +
        '/filter?filter=' +
        filter +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  getById(id: number): Observable<Student> {
    return this.http.get<Student>(urlApi + '/get-student?id=' + id);
  }

  getByEmail(email: string): Observable<Student> {
    return this.http.get<Student>(
      urlApi + '/get-student-by-email?email=' + email
    );
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

  insertStudent(Student: Student): Observable<Student> {
    return this.http.post<Student>(urlApi + '/insert-student', Student);
  }
  updateStudent(Student: Student): Observable<string> {
    return this.http.put(urlApi + '/update-student', Student, {
      responseType: 'text',
    });
  }
  deleteStudent(id: number): Observable<string> {
    return this.http.delete(urlApi + '/delete-student?id=' + id, {
      responseType: 'text',
    });
  }
  login(username: string, password: string): Observable<Student> {
    return this.http.get<Student>(
      urlApi + '/login?username=' + username + '&password=' + password
    );
  }
}
