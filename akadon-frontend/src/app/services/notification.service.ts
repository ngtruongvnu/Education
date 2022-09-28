import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notifications } from '../models/notifications';
const urlApi = 'http://localhost:8888/notification';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}
  getAllNotifications(
    page: number,
    numberItems: number
  ): Observable<Notifications[]> {
    return this.http.get<Notifications[]>(
      urlApi +
        '/get-all-Notifications?page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }

  getById(id: number): Observable<Notifications> {
    return this.http.get<Notifications>(urlApi + '/get-Notification?id=' + id);
  }

  getByEmail(
    email: string,
    page: number,
    numberItems: number
  ): Observable<Notifications[]> {
    return this.http.get<Notifications[]>(
      urlApi +
        '/get-received-Notification?email=' +
        email +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  countNotifications(email: string): Observable<number> {
    return this.http.get<number>(urlApi + '/count-Notification?email=' + email);
  }
  countUnseenNotifications(email: string): Observable<number> {
    return this.http.get<number>(
      urlApi + '/count-unseen-Notification?email=' + email
    );
  }
  insertNotification(Notification: Notifications): Observable<String> {
    return this.http.post(urlApi + '/insert-Notification', Notification, {
      responseType: 'text',
    });
  }
  viewNotification(Notification: Notifications): Observable<boolean> {
    return this.http.put<boolean>(urlApi + '/view-Notification', Notification);
  }

  viewAll(email: string): Observable<boolean> {
    return this.http.get<boolean>(urlApi + '/view-all?email=' + email);
  }

  deleteNotification(id: number): Observable<String> {
    return this.http.delete<String>(urlApi + '/delete-Notification?id=' + id);
  }
}
