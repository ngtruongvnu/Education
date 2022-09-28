import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VerifycateImage } from '../models/verifycate-image';
const urlApi = 'http://localhost:8888/verifycateImage';
@Injectable({
  providedIn: 'root',
})
export class VerifycateImageService {
  constructor(private http: HttpClient) {}

  getAllVerifycateImages(
    page: number,
    numberItems: number
  ): Observable<VerifycateImage[]> {
    return this.http.get<VerifycateImage[]>(
      urlApi +
        '/get-all-verifycateImages?page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  getVerifycateImage(id: number): Observable<VerifycateImage> {
    return this.http.get<VerifycateImage>(
      urlApi + '/get-verifycateImage?id=' + id
    );
  }

  getVerifycateImageByTutorId(id: number): Observable<VerifycateImage[]> {
    return this.http.get<VerifycateImage[]>(
      urlApi + '/get-verifycateImage-by-tutor?id=' + id
    );
  }

  insertVerifycateImage(VerifycateImage: VerifycateImage): Observable<String> {
    return this.http.post(urlApi + '/insert-verifycateImage', VerifycateImage, {
      responseType: 'text',
    });
  }
  updateVerifycateImage(VerifycateImage: VerifycateImage): Observable<String> {
    return this.http.put(urlApi + '/update-verifycateImage', VerifycateImage, {
      responseType: 'text',
    });
  }
  deleteVerifycateImage(id: number): Observable<String> {
    return this.http.delete(urlApi + '/delete-verifycateImage?id=' + id, {
      responseType: 'text',
    });
  }
}
