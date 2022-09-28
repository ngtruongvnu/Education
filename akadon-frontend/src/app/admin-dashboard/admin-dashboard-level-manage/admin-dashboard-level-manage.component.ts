import { Component, OnInit } from '@angular/core';
import { Level } from 'src/app/models/level';
import { Subject } from 'src/app/models/subject';
import { AdminService } from 'src/app/services/admin.service';
import { LevelService } from 'src/app/services/level.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-admin-dashboard-level-manage',
  templateUrl: './admin-dashboard-level-manage.component.html',
  styleUrls: ['./admin-dashboard-level-manage.component.css'],
})
export class AdminDashboardLevelManageComponent implements OnInit {
  constructor(
    private levelService: LevelService,
    private adminService: AdminService
  ) {}

  listLevel: Level[] = [];
  countCourseByLevel: number[] = [];
  countRequestByLevel: number[] = [];
  countTutorByLevel: number[] = [];
  ngOnInit(): void {
    this.levelService.getAll().subscribe((res) => {
      this.listLevel = res;
    });
    this.adminService.countCourseByLevel().subscribe((res) => {
      this.countCourseByLevel = res;
    });
    this.adminService.countRequestByLevel().subscribe((res) => {
      this.countRequestByLevel = res;
    });
    this.adminService.countTutorByLevel().subscribe((res) => {
      this.countTutorByLevel = res;
    });
  }
}
