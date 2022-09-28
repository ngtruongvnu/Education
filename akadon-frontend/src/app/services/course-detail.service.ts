import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseDetail } from '../models/course-detail';
const urlApi = 'http://localhost:8888/courseDetail';
@Injectable({
  providedIn: 'root',
})
export class CourseDetailService {
  constructor(private http: HttpClient) {}
  getAllCourseDetails(
    page: number,
    numberItems: number
  ): Observable<CourseDetail[]> {
    return this.http.get<CourseDetail[]>(
      urlApi +
        '/get-all-courseDetails?page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  filter(
    filter: string,
    page: number,
    numberItems: number
  ): Observable<CourseDetail[]> {
    return this.http.get<CourseDetail[]>(
      urlApi +
        '/filter?filter=' +
        filter +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  getById(id: number): Observable<CourseDetail> {
    return this.http.get<CourseDetail>(urlApi + '/get-courseDetail?id=' + id);
  }
  insertCourseDetail(CourseDetail: CourseDetail): Observable<String> {
    return this.http.post(urlApi + '/insert-courseDetail', CourseDetail, {
      responseType: 'text',
    });
  }
  updateCourseDetail(CourseDetail: CourseDetail): Observable<String> {
    return this.http.put(urlApi + '/update-courseDetail', CourseDetail, {
      responseType: 'text',
    });
  }

  checkPayRequest(studentId: number): Observable<CourseDetail[]> {
    return this.http.get<CourseDetail[]>(
      urlApi + '/check-payDate?studentId=' + studentId
    );
  }

  getPayDate(studentId: number, courseId: number): Observable<CourseDetail> {
    return this.http.get<CourseDetail>(
      urlApi + '/get-payDate?studentId=' + studentId + '&courseId=' + courseId
    );
  }

  getByCourseId(
    courseId: number,
    page: number,
    numberItems: number
  ): Observable<CourseDetail[]> {
    return this.http.get<CourseDetail[]>(
      urlApi +
        '/get-courseDetail-by-course?courseId=' +
        courseId +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }

  countByCourseId(courseId: number): Observable<number> {
    return this.http.get<number>(
      urlApi + '/count-courseDetail-by-course?courseId=' + courseId
    );
  }
}
