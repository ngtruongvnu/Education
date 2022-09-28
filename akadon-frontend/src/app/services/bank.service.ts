import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank';
const urlApi = 'http://localhost:8888/bank';
@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor(private http: HttpClient) {}

  getAllBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(urlApi + '/get-all-banks');
  }
  getBank(id: number): Observable<Bank> {
    return this.http.get<Bank>(urlApi + '/get-bank?id=' + id);
  }
  insertBank(Bank: Bank): Observable<string> {
    return this.http.post(urlApi + '/insert-bank', Bank, {
      responseType: 'text',
    });
  }
  updateBank(Bank: Bank): Observable<string> {
    return this.http.put(urlApi + '/update-bank', Bank, {
      responseType: 'text',
    });
  }
  deleteBank(id: number): Observable<string> {
    return this.http.delete(urlApi + '/delete-bank?id=' + id, {
      responseType: 'text',
    });
  }
}
