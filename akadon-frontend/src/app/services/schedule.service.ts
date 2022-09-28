import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../models/schedule';
import { ScheduleData } from '../models/schedule-data';
import { Student } from '../models/student';
import { Tutor } from '../models/tutor';
const urlApi = 'http://localhost:8888/schedule';
@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}
  getAllSchedules(page: number, numberItems: number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(
      urlApi + '/get-all-schedules?page=' + page + '&numberItems=' + numberItems
    );
  }

  getById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(urlApi + '/get-schedule?id=' + id);
  }
  getTutorSchedule(id: number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(urlApi + '/get-tutor-schedule?id=' + id);
  }
  getStudentSchedule(id: number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(urlApi + '/get-student-schedule?id=' + id);
  }

  getStudentByTutorId(id: number): Observable<Student[]> {
    return this.http.get<Student[]>(urlApi + '/get-student-by-tutor?id=' + id);
  }

  getTutorByStudentId(id: number): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(urlApi + '/get-tutor-by-student?id=' + id);
  }

  insertSchedule(schedule: Schedule): Observable<String> {
    console.log(schedule);
    return this.http.post(urlApi + '/insert-schedule', schedule, {
      responseType: 'text',
    });
  }
  updateSchedule(schedule: Schedule): Observable<String> {
    return this.http.put(urlApi + '/update-schedule', schedule, {
      responseType: 'text',
    });
  }
  deleteSchedule(id: number): Observable<String> {
    return this.http.delete(urlApi + '/delete-schedule?id=' + id, {
      responseType: 'text',
    });
  }
}
