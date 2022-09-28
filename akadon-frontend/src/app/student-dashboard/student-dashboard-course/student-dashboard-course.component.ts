import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Course } from 'src/app/models/course';
import { CourseDetail } from 'src/app/models/course-detail';
import { Review } from 'src/app/models/review';
import { Tutor } from 'src/app/models/tutor';
import { CourseDetailService } from 'src/app/services/course-detail.service';
import { CourseService } from 'src/app/services/course.service';
import { ReviewService } from 'src/app/services/review.service';
declare var $: any;
@Component({
  selector: 'app-student-dashboard-course',
  templateUrl: './student-dashboard-course.component.html',
  styleUrls: ['./student-dashboard-course.component.css'],
})
export class StudentDashboardCourseComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private courseDetailService: CourseDetailService,
    private reviewService: ReviewService
  ) {}
  public loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  emptyWaiting: boolean = true;
  emptyHappening: boolean = true;
  emptyFinish: boolean = true;
  listWaiting: Course[] = [];
  listHappen: Course[] = [];
  listFinished: Course[] = [];
  ngOnInit(): void {
    this.courseService
      .getWaitingCourseByStudentId(
        this.loginUser.studentId,
        1,
        this.pageSizeWaiting
      )
      .subscribe((res) => {
        this.listWaiting = res;
      });
    this.courseService
      .countWaitingCourseByStudentId(this.loginUser.studentId)
      .subscribe((res) => {
        this.lengthWaiting = res;
        if (res === 0) {
          $('#waiting').css(
            'background-image',
            "url('/assets/images/dashboard/course/empty-course-happen.png')"
          );
        }
      });
    this.courseService
      .getHappenCourseByStudentId(
        this.loginUser.studentId,
        1,
        this.pageSizeHappen
      )
      .subscribe((res) => {
        this.listHappen = res;
      });
    this.courseService
      .countHappenCourseByStudentId(this.loginUser.studentId)
      .subscribe((res) => {
        this.lengthHappen = res;
        if (res === 0) {
          $('#happening').css(
            'background-image',
            "url('/assets/images/dashboard/course/empty-course-happen.png')"
          );
        }
      });
    this.courseService
      .getFinishedCourseByStudentId(
        this.loginUser.studentId,
        1,
        this.pageSizeFinished
      )
      .subscribe((res) => {
        this.listFinished = res;
      });
    this.courseService
      .countFinishedCourseByStudentId(this.loginUser.studentId)
      .subscribe((res) => {
        this.lengthFinished = res;
        if (res === 0) {
          $('#finish').css(
            'background-image',
            "url('/assets/images/dashboard/course/empty-course-happen.png')"
          );
        }
      });
    this.courseService
      .getLearntTutor(this.loginUser.studentId)
      .subscribe((res) => {
        this.listTutor = res;
      });
    this.reviewService
      .getSentReviewsByEmail(this.loginUser.email as string)
      .subscribe((res) => {
        this.listReviewTutor = res;
      });
  }
  pageWaitingEvent!: PageEvent;
  pageIndexWaiting: number = 0;
  pageSizeWaiting: number = 5;
  lengthWaiting: number = 20;
  getPaginatorWaitingData(event: PageEvent): PageEvent {
    this.pageIndexWaiting = event.pageIndex;
    this.pageSizeWaiting = event.pageSize;
    this.courseService
      .getWaitingCourseByStudentId(
        this.loginUser.studentId,
        this.pageIndexWaiting + 1,
        this.pageSizeWaiting
      )
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
    this.courseService
      .getHappenCourseByStudentId(
        this.loginUser.studentId,
        this.pageIndexHappen + 1,
        this.pageSizeHappen
      )
      .subscribe((res) => {
        this.listHappen = res;
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
    this.courseService
      .getFinishedCourseByStudentId(
        this.loginUser.studentId,
        this.pageIndexFinished + 1,
        this.pageSizeFinished
      )
      .subscribe((res) => {
        this.listFinished = res;
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
  listTutor: Tutor[] = [];
  listReviewTutor: Review[] = [];
  rate = 0;
  ctrl = new FormControl(null, Validators.required);
  insertReview(Tutor: Tutor) {
    var reviewContent = $('#review-' + Tutor.tutorId).val();
    var rate = this.ctrl.value;
    var review: Review = {};
    review.sendCommentEmail = this.loginUser.email;
    review.receiveCommentEmail = Tutor.email;
    review.commentDate = new Date();
    review.rating = rate;
    review.comment = reviewContent;
    review.sendName = this.loginUser.fullName;
    review.receiveName = Tutor.fullName;
    this.reviewService.insertReview(review).subscribe((res) => {
      this.courseService
        .getLearntTutor(this.loginUser.studentId)
        .subscribe((res) => {
          this.listTutor = res;
          this.ctrl.reset();
        });
    });
  }
}
