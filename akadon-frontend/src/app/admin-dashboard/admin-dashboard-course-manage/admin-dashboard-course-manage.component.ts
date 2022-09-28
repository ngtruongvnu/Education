import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CourseDetail } from 'src/app/models/course-detail';
import { AdminService } from 'src/app/services/admin.service';
import { CourseDetailService } from 'src/app/services/course-detail.service';
import { Course } from '../../models/course';
declare var $: any;

@Component({
  selector: 'app-admin-dashboard-course-manage',
  templateUrl: './admin-dashboard-course-manage.component.html',
  styleUrls: ['./admin-dashboard-course-manage.component.css'],
})
export class AdminDashboardCourseManageComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private courseDetailService: CourseDetailService
  ) {}
  emptyWaiting: boolean = true;
  emptyHappening: boolean = true;
  emptyFinish: boolean = true;
  listWaiting: Course[] = [];
  listHappen: Course[] = [];
  listFinished: Course[] = [];
  ngOnInit(): void {
    this.adminService
      .getCourse('Chờ', 1, this.pageSizeWaiting)
      .subscribe((res) => {
        this.listWaiting = res;
      });
    this.adminService.countCourse('Chờ').subscribe((res) => {
      this.lengthWaiting = res;
      if (res === 0) {
        $('#waiting').css(
          'background-image',
          "url('/assets/images/dashboard/course/empty-course-happen.png')"
        );
      }
    });
    this.adminService
      .getCourse('Đang diễn ra', 1, this.pageSizeHappen)
      .subscribe((res) => {
        this.listHappen = res;
      });
    this.adminService.countCourse('Đang diễn ra').subscribe((res) => {
      this.lengthHappen = res;
      if (res === 0) {
        $('#happen').css(
          'background-image',
          "url('/assets/images/dashboard/course/empty-course-happen.png')"
        );
      }
    });
    this.adminService
      .getCourse('Đã hoàn thành', 1, this.pageSizeFinished)
      .subscribe((res) => {
        this.listFinished = res;
      });
    this.adminService.countCourse('Đã hoàn thành').subscribe((res) => {
      this.lengthFinished = res;
      if (res === 0) {
        $('#finish').css(
          'background-image',
          "url('/assets/images/dashboard/course/empty-course-happen.png')"
        );
      }
    });
  }
  pageWaitingEvent!: PageEvent;
  pageIndexWaiting: number = 0;
  pageSizeWaiting: number = 5;
  lengthWaiting: number = 20;
  getPaginatorWaitingData(event: PageEvent): PageEvent {
    this.pageIndexWaiting = event.pageIndex;
    this.pageSizeWaiting = event.pageSize;
    this.adminService
      .getCourse('Chờ', this.pageIndexWaiting + 1, this.pageSizeWaiting)
      .subscribe((res) => {
        this.listWaiting = res;
      });
    return event;
  }
  pageHappenEvent!: PageEvent;
  pageIndexHappen: number = 0;
  pageSizeHappen: number = 5;
  lengthHappen: number = 20;
  getPaginatorHappenData(event: PageEvent): PageEvent {
    this.pageIndexHappen = event.pageIndex;
    this.pageSizeHappen = event.pageSize;
    this.adminService
      .getCourse('Đang diễn ra', this.pageIndexHappen + 1, this.pageSizeHappen)
      .subscribe((res) => {
        this.listWaiting = res;
      });
    return event;
  }
  pageFinishedEvent!: PageEvent;
  pageIndexFinished: number = 0;
  pageSizeFinished: number = 5;
  lengthFinished: number = 20;
  getPaginatorFinishedData(event: PageEvent): PageEvent {
    this.pageIndexFinished = event.pageIndex;
    this.pageSizeFinished = event.pageSize;
    this.adminService
      .getCourse(
        'Đã hoàn thành',
        this.pageIndexFinished + 1,
        this.pageSizeFinished
      )
      .subscribe((res) => {
        this.listWaiting = res;
      });
    return event;
  }
  readonly = true;
  max = 5;
  pageDetailEvent!: PageEvent;
  pageDetailIndex: number = 0;
  pageDetailSize: number = 5;
  lengthCourseDetail: number = 20;
  getDetailPage(event: PageEvent): PageEvent {
    this.pageDetailIndex = event.pageIndex;
    this.pageDetailSize = event.pageSize;
    this.courseDetailService
      .getByCourseId(
        this.courseId,
        this.pageDetailIndex + 1,
        this.pageDetailSize
      )
      .subscribe((res) => {
        this.listCourseDetail = res;
      });
    return event;
  }
  listCourseDetail: CourseDetail[] = [];
  courseId: number = 0;
  viewCourseDetail(course: Course) {
    this.courseId = course.courseId as number;
    this.courseDetailService
      .getByCourseId(course.courseId as number, 1, this.pageDetailSize)
      .subscribe((res) => {
        this.listCourseDetail = res;
      });
    this.courseDetailService
      .countByCourseId(course.courseId as number)
      .subscribe((res) => {
        this.lengthCourseDetail = res;
      });
  }
}
