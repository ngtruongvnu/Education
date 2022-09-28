import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';
import { UserQuestion } from '../models/user-question';
import { Course } from '../models/course';
import { StudentRequest } from '../models/student-request';
const urlApi = 'http://localhost:8888/admin';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAllAdmins(page: number, numberItems: number): Observable<Admin[]> {
    return this.http.get<Admin[]>(
      urlApi + '/get-all-admins?page=' + page + '&numberItems=' + numberItems
    );
  }
  getUserQuestions(
    page: number,
    numberItems: number
  ): Observable<UserQuestion[]> {
    return this.http.get<UserQuestion[]>(
      urlApi +
        '/get-user-questions?page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  getAdmin(id: number): Observable<Admin> {
    return this.http.get<Admin>(urlApi + '/get-admin?id=' + id);
  }

  checkEmail(email: string): Observable<Boolean> {
    return this.http.get<Boolean>(urlApi + '/check-email?email=' + email);
  }

  checkPhoneNumber(number: string): Observable<Boolean> {
    return this.http.get<Boolean>(
      urlApi + '/check-phoneNumber?phoneNumber=' + number
    );
  }
  login(username: string, password: string): Observable<Admin> {
    return this.http.get<Admin>(
      urlApi + '/login?username=' + username + '&password=' + password
    );
  }
  insertAdmin(admin: Admin): Observable<String> {
    return this.http.post(urlApi + '/insert-admin', admin, {
      responseType: 'text',
    });
  }
  updateAdmin(admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(urlApi + '/update-admin', admin);
  }
  deleteAdmin(id: number): Observable<Boolean> {
    return this.http.delete<Boolean>(urlApi + '/delete-admin?id=' + id);
  }

  countData(type: string): Observable<number> {
    return this.http.get<number>(urlApi + '/count-data?type=' + type);
  }

  countDataByMonth(type: string, month: number): Observable<number[]> {
    return this.http.get<number[]>(
      urlApi + '/count-data-by-month?type=' + type + '&month=' + month
    );
  }
  getCourse(
    type: string,
    page: number,
    numberItems: number
  ): Observable<Course[]> {
    return this.http.get<Course[]>(
      urlApi +
        '/get-course?type=' +
        type +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }

  getStudentRequest(
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

  countStudentRequest(query: string): Observable<number> {
    return this.http.get<number>(
      urlApi + '/count-student-request?query=' + query
    );
  }

  countCourse(type: string): Observable<number> {
    return this.http.get<number>(urlApi + '/count-course?type=' + type);
  }

  countCourseBySubject(): Observable<number[]> {
    return this.http.get<number[]>(urlApi + '/count-course-by-subject');
  }
  countCourseByLevel(): Observable<number[]> {
    return this.http.get<number[]>(urlApi + '/count-course-by-level');
  }
  countRequestBySubject(): Observable<number[]> {
    return this.http.get<number[]>(urlApi + '/count-request-by-subject');
  }
  countRequestByLevel(): Observable<number[]> {
    return this.http.get<number[]>(urlApi + '/count-request-by-level');
  }
  countTutorBySubject(): Observable<number[]> {
    return this.http.get<number[]>(urlApi + '/count-tutor-by-subject');
  }
  countTutorByLevel(): Observable<number[]> {
    return this.http.get<number[]>(urlApi + '/count-tutor-by-level');
  }
}
