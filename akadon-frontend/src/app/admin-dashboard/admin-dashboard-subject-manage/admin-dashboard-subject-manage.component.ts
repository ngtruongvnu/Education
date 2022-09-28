import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { AdminService } from 'src/app/services/admin.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-admin-dashboard-subject-manage',
  templateUrl: './admin-dashboard-subject-manage.component.html',
  styleUrls: ['./admin-dashboard-subject-manage.component.css'],
})
export class AdminDashboardSubjectManageComponent implements OnInit {
  constructor(
    private subjectService: SubjectService,
    private adminService: AdminService
  ) {}

  listSubject: Subject[] = [];
  countCourseBySubject: number[] = [];
  countRequestBySubject: number[] = [];
  countTutorBySubject: number[] = [];
  ngOnInit(): void {
    this.subjectService.getAll().subscribe((res) => {
      this.listSubject = res;
    });
    this.adminService.countCourseBySubject().subscribe((res) => {
      this.countCourseBySubject = res;
    });
    this.adminService.countRequestBySubject().subscribe((res) => {
      this.countRequestBySubject = res;
    });
    this.adminService.countTutorBySubject().subscribe((res) => {
      this.countTutorBySubject = res;
    });
  }
}
