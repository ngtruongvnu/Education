import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Course } from 'src/app/models/course';
import { CourseDetailService } from 'src/app/services/course-detail.service';
import { CourseService } from 'src/app/services/course.service';
import { CourseDetail } from '../../models/course-detail';
import Swal from 'sweetalert2';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { Notifications } from 'src/app/models/notifications';
import { NotificationService } from 'src/app/services/notification.service';
declare var $: any;
declare var paypal: any;
@Component({
  selector: 'app-student-dashboard-finance',
  templateUrl: './student-dashboard-finance.component.html',
  styleUrls: ['./student-dashboard-finance.component.css'],
})
export class StudentDashboardFinanceComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private courseDetailService: CourseDetailService,
    private transactionService: TransactionService,
    private notificationService: NotificationService
  ) {}
  public payPalConfig!: IPayPalConfig;
  public showPaypalButtons!: boolean;
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  paidFor = false;
  loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  studentId: number = this.loginUser.studentId;
  listCourseDetail: CourseDetail[] = [];
  listHappen: Course[] = [];
  listWaiting: Course[] = [];
  listPayDateWaiting: CourseDetail[] = [];
  listPayDate: CourseDetail[] = [];
  ngOnInit(): void {
    this.courseDetailService
      .checkPayRequest(this.studentId)
      .subscribe((res) => {
        this.listCourseDetail = res;
      });
    this.courseService
      .getHappenCourseByStudentId(this.studentId, 1, this.pageSizeWaiting)
      .subscribe((res) => {
        this.listHappen = res;
        for (let course of res) {
          this.courseDetailService
            .getPayDate(this.studentId, course.courseId as number)
            .subscribe((res2) => {
              this.listPayDate.push(res2);
            });
        }
      });
    this.courseService
      .countHappenCourseByStudentId(this.loginUser.studentId)
      .subscribe((res) => {
        this.lengthHappen = res;
      });
    this.courseService
      .getWaitingCourseByStudentId(
        this.loginUser.studentId,
        1,
        this.pageSizeWaiting
      )
      .subscribe((res) => {
        this.listWaiting = res;
        for (let course of res) {
          this.courseDetailService
            .getPayDate(this.studentId, course.courseId as number)
            .subscribe((res2) => {
              this.listPayDateWaiting.push(res2);
            });
        }
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
  }
  pageWaitingEvent!: PageEvent;
  pageIndexWaiting: number = 0;
  pageSizeWaiting: number = 3;
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
  pageSizeHappen: number = 3;
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
  paidCourse: Course = {};
  paidMoney: any;

  payForCourse(course: Course) {
    this.paidCourse = course;
    this.paidMoney =
      ((course.objStudentRequest?.durationPerSession as number) *
        (course.objStudentRequest?.costPerHour as number)) /
      23000;
    this.paidMoney = Math.round(this.paidMoney);
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AYSCzQnOkVrCJCg0cYxz089rfoPN21IyxUlF-DbvzeX9elkgQzZmZ5CrtcoRtxfsqG8NwEB97TW77RW2',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.paidMoney,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.paidMoney,
                  },
                },
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        Swal.fire('Thành công!', 'Bạn đã thanh toán khóa học này!', 'success');
        course.paymentStatus = true;
        let transaction: Transaction = {};
        transaction.sentEmail = this.loginUser.email;
        transaction.receiveEmail = 'tuanbigboss1@gmail.com';
        transaction.content =
          'Học viên ' +
          this.loginUser.fullName +
          ' thanh toán học phí ' +
          course.courseName;
        transaction.sentMoney = this.paidMoney;
        transaction.dateTransaction = new Date();
        transaction.sendName = this.loginUser.fullName;
        transaction.receiveName = 'Hệ thống';
        this.transactionService.insertTransaction(transaction).subscribe();
        let notification: Notifications = {};
        notification.accountEmail = 'tuanbigboss1@gmail.com';
        notification.content =
          'Học viên ' +
          this.loginUser.fullName +
          ' thanh toán học phí ' +
          this.paidCourse.courseName;
        notification.title = 'Thanh toán học phí';
        notification.notificationTime = new Date();
        notification.seen = false;
        notification.link = '/dashboard-admin/doanh-thu';
        this.notificationService.insertNotification(notification).subscribe();
        this.courseService.updateCourse(course).subscribe((res) => {
          this.courseDetailService
            .checkPayRequest(this.studentId)
            .subscribe((res) => {
              this.listCourseDetail = res;
            });
          this.courseService
            .getHappenCourseByStudentId(this.studentId, 1, 10)
            .subscribe((res) => {
              this.listHappen = res;
              for (let course of res) {
                this.courseDetailService
                  .getPayDate(this.studentId, course.courseId as number)
                  .subscribe((res2) => {
                    this.listPayDate.push(res2);
                  });
              }
            });
          this.courseService
            .countHappenCourseByStudentId(this.loginUser.studentId)
            .subscribe((res) => {
              this.lengthHappen = res;
            });
          this.courseService
            .getWaitingCourseByStudentId(
              this.loginUser.studentId,
              1,
              this.pageSizeWaiting
            )
            .subscribe((res) => {
              this.listWaiting = res;
              for (let course of res) {
                this.courseDetailService
                  .getPayDate(this.studentId, course.courseId as number)
                  .subscribe((res2) => {
                    this.listPayDateWaiting.push(res2);
                  });
              }
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
        });
        $('#pay').modal('toggle');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
  payForCourseDetail(courseDetail: CourseDetail) {
    let course = courseDetail.objCourse as Course;
    this.paidCourse = course;
    this.paidMoney =
      ((course.objStudentRequest?.durationPerSession as number) *
        (course.objStudentRequest?.costPerHour as number)) /
      23000;
    this.paidMoney = Math.round(this.paidMoney);
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AYSCzQnOkVrCJCg0cYxz089rfoPN21IyxUlF-DbvzeX9elkgQzZmZ5CrtcoRtxfsqG8NwEB97TW77RW2',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.paidMoney,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.paidMoney,
                  },
                },
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        Swal.fire('Thành công!', 'Bạn đã thanh toán khóa học này!', 'success');
        course.paymentStatus = true;
        this.courseService.updateCourse(course).subscribe((res) => {
          this.courseDetailService
            .checkPayRequest(this.studentId)
            .subscribe((res) => {
              this.listCourseDetail = res;
            });
          this.courseService
            .getHappenCourseByStudentId(this.studentId, 1, 10)
            .subscribe((res) => {
              this.listHappen = res;
              for (let course of res) {
                this.courseDetailService
                  .getPayDate(this.studentId, course.courseId as number)
                  .subscribe((res2) => {
                    this.listPayDate.push(res2);
                  });
              }
            });
          this.courseService
            .countHappenCourseByStudentId(this.loginUser.studentId)
            .subscribe((res) => {
              this.lengthHappen = res;
            });
          this.courseService
            .getWaitingCourseByStudentId(
              this.loginUser.studentId,
              1,
              this.pageSizeWaiting
            )
            .subscribe((res) => {
              this.listWaiting = res;
              for (let course of res) {
                this.courseDetailService
                  .getPayDate(this.studentId, course.courseId as number)
                  .subscribe((res2) => {
                    this.listPayDateWaiting.push(res2);
                  });
              }
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
        });
        $('#pay').modal('toggle');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
