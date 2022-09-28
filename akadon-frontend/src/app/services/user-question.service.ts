import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserQuestion } from '../models/user-question';
const urlApi = 'http://localhost:8888/user-question';
@Injectable({
  providedIn: 'root',
})
export class UserQuestionService {
  constructor(private http: HttpClient) {}

  sendQuestion(userQuestion: UserQuestion): Observable<UserQuestion> {
    return this.http.post<UserQuestion>(
      urlApi + '/insert-question',
      userQuestion
    );
  }
  getAllQuestions(): Observable<UserQuestion[]> {
    return this.http.get<UserQuestion[]>(
      urlApi + '/get-all-questions?page=1&numberItems=1'
    );
  }
}
