import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Tutor } from 'src/app/models/tutor';
import { TutorService } from '../../services/tutor.service';
@Component({
  selector: 'app-admin-dashboard-tutor-account',
  templateUrl: './admin-dashboard-tutor-account.component.html',
  styleUrls: ['./admin-dashboard-tutor-account.component.css'],
})
export class AdminDashboardTutorAccountComponent implements OnInit {
  constructor(private tutorService: TutorService) {}

  listTutor: Tutor[] = [];
  ngOnInit(): void {
    this.tutorService.getAllTutors(1, this.pageSize).subscribe((res) => {
      this.listTutor = res;
    });
    this.tutorService.countAllTutor().subscribe((res) => {
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
    this.tutorService
      .getAllTutors(this.pageIndex + 1, this.pageSize)
      .subscribe((res) => {
        this.listTutor = res;
      });
    return event;
  }
}
