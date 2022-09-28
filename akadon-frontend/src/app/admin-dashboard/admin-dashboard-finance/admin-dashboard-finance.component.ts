import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-admin-dashboard-finance',
  templateUrl: './admin-dashboard-finance.component.html',
  styleUrls: ['./admin-dashboard-finance.component.css'],
})
export class AdminDashboardFinanceComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private fb: FormBuilder
  ) {}
  range = this.fb.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });
  rangeSent = this.fb.group({
    startDateSent: ['', Validators.required],
    endDateSent: ['', Validators.required],
  });
  loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  emptyTransaction: boolean = true;
  lastId: string = 'all';
  listTransaction: Transaction[] = [];
  listTransactionSent: Transaction[] = [];
  filter() {
    this.transactionService
      .getReceivedTransactionsByEmail(
        this.loginUser.email,
        this.range.value.startDate.getTime(),
        this.range.value.endDate.getTime(),
        this.pageIndex + 1,
        this.length
      )
      .subscribe((res) => {
        this.listTransaction = res;
      });
    this.transactionService
      .countReceiveTransaction(
        this.loginUser.email,
        this.range.value.startDate.getTime(),
        this.range.value.endDate.getTime()
      )
      .subscribe((res) => {
        this.length = res;
      });
  }
  remove() {
    this.range.reset();
    this.transactionService
      .getReceivedTransactionsByEmail(
        this.loginUser.email,
        0,
        0,
        1,
        this.pageSize
      )
      .subscribe((res) => {
        this.listTransaction = res;
      });
    this.transactionService
      .countReceiveTransaction(this.loginUser.email, 0, 0)
      .subscribe((res) => {
        this.length = res;
      });
  }
  filterSent() {
    this.transactionService
      .getSentTransactionsByEmail(
        this.loginUser.email,
        this.rangeSent.value.startDate.getTime(),
        this.rangeSent.value.endDate.getTime(),
        this.pageIndex + 1,
        this.length
      )
      .subscribe((res) => {
        this.listTransaction = res;
      });
    this.transactionService
      .countSentTransaction(
        this.loginUser.email,
        this.rangeSent.value.startDate.getTime(),
        this.rangeSent.value.endDate.getTime()
      )
      .subscribe((res) => {
        this.length = res;
      });
  }
  removeSent() {
    this.rangeSent.reset();
    this.transactionService
      .getSentTransactionsByEmail(this.loginUser.email, 0, 0, 1, this.pageSize)
      .subscribe((res) => {
        this.listTransaction = res;
      });
    this.transactionService
      .countSentTransaction(this.loginUser.email, 0, 0)
      .subscribe((res) => {
        this.length = res;
      });
  }
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 8;
  length: number = 20;
  getPaginatorData(event: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.transactionService
      .getReceivedTransactionsByEmail(
        this.loginUser.email,
        0,
        0,
        this.pageIndex + 1,
        this.length
      )
      .subscribe((res) => {
        this.listTransaction = res;
      });
    return event;
  }
  pageEventSent!: PageEvent;
  pageIndexSent: number = 0;
  pageSizeSent: number = 8;
  lengthSent: number = 20;
  getPaginatorSentData(event: PageEvent): PageEvent {
    this.pageIndexSent = event.pageIndex;
    this.pageSizeSent = event.pageSize;
    this.transactionService
      .getSentTransactionsByEmail(
        this.loginUser.email,
        0,
        0,
        this.pageIndex + 1,
        this.length
      )
      .subscribe((res) => {
        this.listTransaction = res;
      });
    return event;
  }
  ngOnInit(): void {
    this.transactionService
      .getReceivedTransactionsByEmail(
        this.loginUser.email,
        0,
        0,
        1,
        this.pageSize
      )
      .subscribe((res) => {
        this.listTransaction = res;
      });
    this.transactionService
      .countReceiveTransaction(this.loginUser.email, 0, 0)
      .subscribe((res) => {
        this.length = res;
      });
    this.transactionService
      .getSentTransactionsByEmail(this.loginUser.email, 0, 0, 1, this.pageSize)
      .subscribe((res) => {
        this.listTransactionSent = res;
      });
    this.transactionService
      .countSentTransaction(this.loginUser.email, 0, 0)
      .subscribe((res) => {
        this.lengthSent = res;
      });
  }
}
