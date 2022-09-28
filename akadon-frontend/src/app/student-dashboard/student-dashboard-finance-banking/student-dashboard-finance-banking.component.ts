import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Bank } from 'src/app/models/bank';
import { Student } from 'src/app/models/student';
import { StudentBankInfo } from 'src/app/models/student-bank-info';
import { BankService } from 'src/app/services/bank.service';
import { StudentBankInfoService } from 'src/app/services/student-bank-info.service';

@Component({
  selector: 'app-student-dashboard-finance-banking',
  templateUrl: './student-dashboard-finance-banking.component.html',
  styleUrls: ['./student-dashboard-finance-banking.component.css'],
})
export class StudentDashboardFinanceBankingComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private bankService: BankService,
    private studentBankService: StudentBankInfoService
  ) {}
  public loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  cardForm = this.fb.group({
    fullName: ['', [Validators.required]],
    phoneNumber: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    accountNumber: [
      '',
      [Validators.required, Validators.minLength(9), Validators.maxLength(14)],
    ],
    bank: ['Chọn ngân hàng', [Validators.required]],
    defaultCard: [''],
  });

  get f() {
    return this.cardForm.controls;
  }
  bankList: Bank[] = [];
  addBank() {
    var studentBank: StudentBankInfo = {};
    studentBank.objBank = this.cardForm.value.bank;
    studentBank.objStudent = this.loginUser as Student;
    studentBank.defaultBank = this.cardForm.value.defaultCard;
    studentBank.surplus = 0;
  }
  ngOnInit(): void {
    this.cardForm.patchValue({
      fullName: this.loginUser.fullName,
      phoneNumber: this.loginUser.phonenumber,
    });
    this.bankService.getAllBanks().subscribe((res) => {
      this.bankList = res;
    });
  }
}
