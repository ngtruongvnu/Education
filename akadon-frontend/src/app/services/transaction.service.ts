import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';
const urlApi = 'http://localhost:8888/transaction';
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}
  getAllTransactions(
    page: number,
    numberItems: number
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      urlApi +
        '/get-all-transactions?page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  filter(
    filter: string,
    page: number,
    numberItems: number
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      urlApi +
        '/filter-transaction?filter=' +
        filter +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  getById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(urlApi + '/get-transaction?id=' + id);
  }
  getReceivedTransactionsByEmail(
    email: string,
    start: number,
    end: number,
    page: number,
    numberItems: number
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      urlApi +
        '/get-received-transaction?email=' +
        email +
        '&startDate=' +
        start +
        '&endDate=' +
        end +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  getSentTransactionsByEmail(
    email: string,
    start: number,
    end: number,
    page: number,
    numberItems: number
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      urlApi +
        '/get-sent-transaction?email=' +
        email +
        '&startDate=' +
        start +
        '&endDate=' +
        end +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }

  countSentTransaction(
    email: string,
    start: number,
    end: number
  ): Observable<number> {
    return this.http.get<number>(
      urlApi +
        '/count-sent-transaction?email=' +
        email +
        '&startDate=' +
        start +
        '&endDate=' +
        end
    );
  }

  countReceiveTransaction(
    email: string,
    start: number,
    end: number
  ): Observable<number> {
    return this.http.get<number>(
      urlApi +
        '/count-receive-transaction?email=' +
        email +
        '&startDate=' +
        start +
        '&endDate=' +
        end
    );
  }

  insertTransaction(Transaction: Transaction): Observable<String> {
    return this.http.post<String>(urlApi + '/insert-transaction', Transaction);
  }
}
