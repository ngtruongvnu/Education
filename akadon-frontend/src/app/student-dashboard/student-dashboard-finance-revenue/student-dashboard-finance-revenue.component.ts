import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
declare var $: any;
@Component({
  selector: 'app-student-dashboard-finance-revenue',
  templateUrl: './student-dashboard-finance-revenue.component.html',
  styleUrls: ['./student-dashboard-finance-revenue.component.css'],
})
export class StudentDashboardFinanceRevenueComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private fb: FormBuilder
  ) {}
  range = this.fb.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });
  loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  emptyTransaction: boolean = true;
  lastId: string = 'all';
  listTransaction: Transaction[] = [];
  filter() {
    this.transactionService
      .getSentTransactionsByEmail(
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
      .countSentTransaction(
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
  pageSize: number = 10;
  length: number = 20;
  getPaginatorData(event: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.transactionService
      .getSentTransactionsByEmail(
        this.loginUser.email,
        0,
        0,
        this.pageIndex + 1,
        this.pageSize
      )
      .subscribe((res) => {
        this.listTransaction = res;
      });
    return event;
  }
  ngOnInit(): void {
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
}
