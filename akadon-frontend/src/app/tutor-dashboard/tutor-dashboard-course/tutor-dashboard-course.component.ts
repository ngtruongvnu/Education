import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Student } from 'src/app/models/student';
import { CourseDetailService } from 'src/app/services/course-detail.service';
import { CourseService } from 'src/app/services/course.service';
import { ReviewService } from 'src/app/services/review.service';
import { StudentService } from 'src/app/services/student.service';
import { Course } from '../../models/course';
import { CourseDetail } from '../../models/course-detail';
import { Review } from '../../models/review';
declare var $: any;

@Component({
  selector: 'app-tutor-dashboard-course',
  templateUrl: './tutor-dashboard-course.component.html',
  styleUrls: ['./tutor-dashboard-course.component.css'],
})
export class TutorDashboardCourseComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private courseDetailService: CourseDetailService,
    private reviewService: ReviewService,
    public studentService: StudentService
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
      .getWaitingCourseByTutorId(
        this.loginUser.tutorId,
        1,
        this.pageSizeWaiting
      )
      .subscribe((res) => {
        this.listWaiting = res;
      });
    this.courseService
      .countWaitingCourseByTutorId(this.loginUser.tutorId)
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
      .getHappenCourseByTutorId(this.loginUser.tutorId, 1, this.pageSizeHappen)
      .subscribe((res) => {
        this.listHappen = res;
      });
    this.courseService
      .countHappenCourseByTutorId(this.loginUser.tutorId)
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
      .getFinishedCourseByTutorId(
        this.loginUser.tutorId,
        1,
        this.pageSizeFinished
      )
      .subscribe((res) => {
        this.listFinished = res;
      });
    this.courseService
      .countFinishedCourseByTutorId(this.loginUser.tutorId)
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
      .getTaughtStudent(this.loginUser.tutorId)
      .subscribe((res) => {
        this.listStudent = res;
      });
    this.reviewService
      .getSentReviewsByEmail(this.loginUser.email as string)
      .subscribe((res) => {
        this.listReviewStudent = res;
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
      .getWaitingCourseByTutorId(
        this.loginUser.tutorId,
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
      .getHappenCourseByTutorId(
        this.loginUser.tutorId,
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
      .getFinishedCourseByTutorId(
        this.loginUser.tutorId,
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
  listStudent: Student[] = [];
  listReviewStudent: Review[] = [];
  rate = 0;
  ctrl = new FormControl(null, Validators.required);
  insertReview(student: Student) {
    var reviewContent = $('#review-' + student.studentId).val();
    var rate = this.ctrl.value;
    var review: Review = {};
    review.sendCommentEmail = this.loginUser.email;
    review.receiveCommentEmail = student.email;
    review.commentDate = new Date();
    review.rating = rate;
    review.receiveName = student.fullName;
    review.sendName = this.loginUser.fullName;
    review.comment = reviewContent;
    this.reviewService.insertReview(review).subscribe((res) => {
      this.courseService
        .getTaughtStudent(this.loginUser.tutorId)
        .subscribe((res) => {
          this.listStudent = res;
          this.ctrl.reset();
        });
    });
  }
}
