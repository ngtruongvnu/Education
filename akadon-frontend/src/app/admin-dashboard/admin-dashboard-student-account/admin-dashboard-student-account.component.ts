import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-admin-dashboard-student-account',
  templateUrl: './admin-dashboard-student-account.component.html',
  styleUrls: ['./admin-dashboard-student-account.component.css'],
})
export class AdminDashboardStudentAccountComponent implements OnInit {
  constructor(private studentService: StudentService) {}

  listStudent: Student[] = [];
  ngOnInit(): void {
    this.studentService.getAllStudents(1, this.pageSize).subscribe((res) => {
      this.listStudent = res;
    });
    this.studentService.countAllStudent().subscribe((res) => {
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
    this.studentService
      .getAllStudents(this.pageIndex + 1, this.pageSize)
      .subscribe((res) => {
        this.listStudent = res;
      });
    return event;
  }
}
