import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tutor-dashboard-finance-banking',
  templateUrl: './tutor-dashboard-finance-banking.component.html',
  styleUrls: ['./tutor-dashboard-finance-banking.component.css'],
})
export class TutorDashboardFinanceBankingComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  cardForm = this.fb.group({
    fullName: ['', [Validators.required]],
    phoneNumber: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    idCard: [
      '',
      [Validators.required, Validators.minLength(12), Validators.maxLength(12)],
    ],
    accountNumber: [
      '',
      [Validators.required, Validators.minLength(9), Validators.maxLength(14)],
    ],
    bank: ['', [Validators.required]],
    defaultCard: [''],
  });

  get f() {
    return this.cardForm.controls;
  }
  submitCard() {}
  ngOnInit(): void {}
}
