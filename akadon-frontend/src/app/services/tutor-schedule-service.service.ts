import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TutorSchedule } from '../models/tutor-schedule';
import { Observable } from 'rxjs';
const url = 'http://localhost:3000/dataSource';
@Injectable({
  providedIn: 'root',
})
export class TutorScheduleServiceService {
  constructor(private http: HttpClient) {}

  getSchedule(): Observable<TutorSchedule[]> {
    return this.http.get<TutorSchedule[]>(url);
  }
}
