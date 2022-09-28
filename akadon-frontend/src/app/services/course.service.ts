import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { Student } from '../models/student';
import { Tutor } from '../models/tutor';
const urlApi = 'http://localhost:8888/course';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}
  getAllCourses(page: number, numberItems: number): Observable<Course[]> {
    return this.http.get<Course[]>(
      urlApi + '/get-all-courses?page=' + page + '&numberItems=' + numberItems
    );
  }
  filter(
    filter: string,
    page: number,
    numberItems: number
  ): Observable<Course[]> {
    return this.http.get<Course[]>(
      urlApi +
        '/filter-course?filter=' +
        filter +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  getById(id: number): Observable<Course> {
    return this.http.get<Course>(urlApi + '/get-course?id=' + id);
  }

  getByStudentRequestId(id: number): Observable<Course[]> {
    return this.http.get<Course[]>(
      urlApi + '/get-course-by-studentRequest?id=' + id
    );
  }

  getByTutorRequestId(id: number): Observable<Course> {
    return this.http.get<Course>(
      urlApi + '/get-course-by-tutorRequest?id=' + id
    );
  }

  insertCourse(Course: Course): Observable<String> {
    return this.http.post(urlApi + '/insert-course', Course, {
      responseType: 'text',
    });
  }
  updateCourse(Course: Course): Observable<String> {
    return this.http.put(urlApi + '/update-course', Course, {
      responseType: 'text',
    });
  }
  deleteCourse(id: number): Observable<String> {
    return this.http.delete(urlApi + '/delete-course?id=' + id, {
      responseType: 'text',
    });
  }

  getWaitingCourseByTutorId(
    id: number,
    page: number,
    numberItems: number
  ): Observable<Course[]> {
    return this.http.get<Course[]>(
      urlApi +
        '/get-waiting-course-by-tutor?id=' +
        id +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  countWaitingCourseByTutorId(id: number): Observable<number> {
    return this.http.get<number>(
      urlApi + '/count-waiting-course-by-tutor?id=' + id
    );
  }
  getHappenCourseByTutorId(
    id: number,
    page: number,
    numberItems: number
  ): Observable<Course[]> {
    return this.http.get<Course[]>(
      urlApi +
        '/get-happen-course-by-tutor?id=' +
        id +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  countHappenCourseByTutorId(id: number): Observable<number> {
    return this.http.get<number>(
      urlApi + '/count-happen-course-by-tutor?id=' + id
    );
  }
  getFinishedCourseByTutorId(
    id: number,
    page: number,
    numberItems: number
  ): Observable<Course[]> {
    return this.http.get<Course[]>(
      urlApi +
        '/get-finished-course-by-tutor?id=' +
        id +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  countFinishedCourseByTutorId(id: number): Observable<number> {
    return this.http.get<number>(
      urlApi + '/count-finished-course-by-tutor?id=' + id
    );
  }

  getWaitingCourseByStudentId(
    id: number,
    page: number,
    numberItems: number
  ): Observable<Course[]> {
    return this.http.get<Course[]>(
      urlApi +
        '/get-waiting-course-by-student?id=' +
        id +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  countWaitingCourseByStudentId(id: number): Observable<number> {
    return this.http.get<number>(
      urlApi + '/count-waiting-course-by-student?id=' + id
    );
  }
  getHappenCourseByStudentId(
    id: number,
    page: number,
    numberItems: number
  ): Observable<Course[]> {
    return this.http.get<Course[]>(
      urlApi +
        '/get-happen-course-by-student?id=' +
        id +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  countHappenCourseByStudentId(id: number): Observable<number> {
    return this.http.get<number>(
      urlApi + '/count-happen-course-by-student?id=' + id
    );
  }
  getFinishedCourseByStudentId(
    id: number,
    page: number,
    numberItems: number
  ): Observable<Course[]> {
    return this.http.get<Course[]>(
      urlApi +
        '/get-finished-course-by-student?id=' +
        id +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  countFinishedCourseByStudentId(id: number): Observable<number> {
    return this.http.get<number>(
      urlApi + '/count-finished-course-by-student?id=' + id
    );
  }

  getTaughtStudent(id: number): Observable<Student[]> {
    return this.http.get<Student[]>(urlApi + '/get-student-by-tutor?id=' + id);
  }

  getLearntTutor(id: number): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(urlApi + '/get-tutor-by-student?id=' + id);
  }

  setTutorTaughtData(tutor: Tutor): Observable<boolean> {
    return this.http.put<boolean>(urlApi + '/set-tutor-taught-data', tutor);
  }

  setStudentLearntData(student: Student): Observable<boolean> {
    return this.http.put<boolean>(urlApi + '/set-student-learnt-data', student);
  }
}
