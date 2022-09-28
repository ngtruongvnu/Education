import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Level } from 'src/app/models/level';
import { Subject } from 'src/app/models/subject';
import { LevelService } from 'src/app/services/level.service';
import { StudentRequestService } from 'src/app/services/student-request.service';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { StudentRequest } from 'src/app/models/student-request';
import { TutorRequestService } from 'src/app/services/tutor-request.service';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { TutorRequest } from 'src/app/models/tutor-request';
import { ScheduleService } from 'src/app/services/schedule.service';
import { CourseDetailService } from 'src/app/services/course-detail.service';
import { CourseDetail } from 'src/app/models/course-detail';
import { Schedule } from '../../../models/schedule';
import { Notifications } from '../../../models/notifications';
import { NotificationService } from 'src/app/services/notification.service';
declare var $: any;
@Component({
  selector: 'app-student-dashboard-receive',
  templateUrl: './student-dashboard-receive.component.html',
  styleUrls: ['./student-dashboard-receive.component.css'],
})
export class StudentDashboardReceiveComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService,
    private levelService: LevelService,
    private studentRequestService: StudentRequestService,
    private tutorRequestService: TutorRequestService,
    private courseService: CourseService,
    private courseDetailService: CourseDetailService,
    private scheduleService: ScheduleService,
    private notificationService: NotificationService
  ) {}
  public loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  studentRequest: StudentRequest[] = [];
  ngOnInit(): void {
    $('input[name="daterange"]').daterangepicker({
      opens: 'center',
    });
    this.subjectService.getAll().subscribe((res) => {
      this.subjectData = res;
    });
    this.levelService.getAll().subscribe((res) => {
      this.levelData = res;
    });
    var filter =
      'studentId=' +
      this.loginUser.studentId +
      " and status<>N'Chưa có gia sư nào yêu cầu' and status<>N'Đã gửi, chờ gia sư đồng ý'";
    this.studentRequestService
      .filter(filter, 1, this.pageSize)
      .subscribe((res) => {
        this.studentRequest = res;
        this.length = res.length;
      });
    this.studentRequestService.getAllFilter(filter).subscribe((res) => {
      this.length = res.length;
    });
  }

  subjectFilter: string = '';
  dateRangeFilter: string = '';
  levelFilter: string = '';
  costFilter: string = '';
  methodFilter: string = '';
  filterResult: string = '';
  startDate: any = '';
  endDate: any = '';
  selectDate: Boolean = false;
  subjectData: Subject[] = [];
  levelData: Level[] = [];
  showErrorPopup(message: string) {
    $('body').append(
      '<div class="error-popup animate__animated animate__fadeInDown"></div>'
    );
    setTimeout(() => {
      $('.error-popup').addClass('animate__fadeOutDow');
    }, 1500);
    setTimeout(() => {
      $('.error-popup').remove();
    }, 2500);
    $('.error-popup').text(message);
  }

  showCheckbox(event: any) {
    var value = event.currentTarget.id;
    var checkbox = $('#' + value + 'Checkbox');
    var h: any = checkbox.height().toString();
    var w: any = checkbox.width().toString();
    h.substring(0, h.length - 2);
    w.substring(0, w.length - 2);
    if (h < 370) {
      checkbox.css('overflow', 'hidde');
    }
    if (w >= 168) {
      checkbox.css('width', '230px');
    } else {
      checkbox.css('width', '167px');
    }
    if (checkbox.css('display') === 'none') {
      checkbox.css('display', 'block');
      $('#' + value).css('background', '#e6f3ff');
      $(document).mouseup(function (e: any) {
        if (
          checkbox.has(e.target).length === 0 ||
          checkbox.css('display') === 'block'
        ) {
          checkbox.css('display', 'none');
          $('#' + value).css('background', '#fff');
        }
      });
    }
  }
  mainQuery: string =
    'studentId=' +
    this.loginUser.studentId +
    " and status<>N'Chưa có gia sư nào yêu cầu' and status<>N'Đã gửi, chờ gia sư đồng ý'";
  filter() {
    var dateRangeQuery = '';
    var subjectQuery = '';
    var levelQuery = '';
    var costQuery = '';
    var query = '';
    this.subjectFilter = '';
    this.levelFilter = '';
    this.costFilter = '';
    this.methodFilter = '';
    this.dateRangeFilter = '';
    var subjectFilter: string[] = [];
    var levelFilter: string[] = [];
    var subjectIdFilter: string[] = [];
    var levelIdFilter: string[] = [];
    var costFilter: string[] = [];
    var methodFilter: string[] = [];
    $("input[name='subject']").each(function (this: any) {
      if ($(this).is(':checked')) {
        subjectFilter.push($(this).val());
        var subjectId = $(this)
          .attr('class')
          .slice(3, $(this).attr('class').length);
        subjectIdFilter.push(subjectId);
      }
    });
    $("input[name='level']").each(function (this: any) {
      if ($(this).is(':checked')) {
        levelFilter.push($(this).val());
        var levelId = $(this)
          .attr('class')
          .slice(3, $(this).attr('class').length);
        levelIdFilter.push(levelId);
      }
    });
    $("input[name='cost']").each(function (this: any) {
      if ($(this).is(':checked')) {
        costFilter.push($(this).val());
      }
    });
    $("input[name='method']").each(function (this: any) {
      if ($(this).is(':checked')) {
        methodFilter.push($(this).val());
      }
    });
    for (let item of subjectFilter) {
      this.subjectFilter += item + ', ';
    }
    for (let item of subjectIdFilter) {
      subjectQuery += 'subjectId=' + item + ' or ';
    }
    for (let item of levelFilter) {
      this.levelFilter += item + ', ';
    }
    for (let item of levelIdFilter) {
      levelQuery += 'levelId=' + item + ' or ';
    }
    for (let item of costFilter) {
      let re = /\,/gi;
      item = item.replace(re, '');
      if (item != '< 100000 VNĐ') {
        var min = item.slice(0, 6);
        var max = item.slice(9, item.length - 4);
        costQuery +=
          '(costPerHour >= ' + min + ' and costPerHour <=' + max + ') or ';
      } else {
        var min = item.slice(2, 8);
        costQuery += '(costPerHour < ' + min + ') or ';
      }
      this.costFilter += item + ', ';
    }
    subjectQuery = subjectQuery.slice(0, subjectQuery.length - 3);
    levelQuery = levelQuery.slice(0, levelQuery.length - 3);
    costQuery = costQuery.slice(0, costQuery.length - 3);
    for (let item of methodFilter) {
      this.methodFilter += item + ', ';
    }
    this.subjectFilter = this.subjectFilter.slice(
      0,
      this.subjectFilter.length - 2
    );
    this.levelFilter = this.levelFilter.slice(0, this.levelFilter.length - 2);
    this.costFilter = this.costFilter.slice(0, this.costFilter.length - 2);
    this.methodFilter = this.methodFilter.slice(
      0,
      this.methodFilter.length - 2
    );
    var result: string = '';
    this.startDate = this.range.value.start;
    this.endDate = this.range.value.end;
    if (
      this.startDate != '' &&
      this.endDate != '' &&
      this.startDate != null &&
      this.endDate != null
    ) {
      this.dateRangeFilter =
        'Từ ngày: ' +
        this.startDate.getDate() +
        '/' +
        (this.startDate.getMonth() + 1) +
        '/' +
        this.startDate.getFullYear() +
        ' đến ngày: ' +
        this.endDate.getDate() +
        '/' +
        (this.endDate.getMonth() + 1) +
        '/' +
        this.endDate.getFullYear();
      result += this.dateRangeFilter + '; ';
      var minDate = "'" + this.startDate.getFullYear();
      if (this.startDate.getMonth() + 1 < 10) {
        minDate += '0' + (this.startDate.getMonth() + 1);
      } else {
        minDate += this.startDate.getMonth() + 1;
      }
      if (this.startDate.getDate() < 10) {
        minDate += '0' + this.startDate.getDate() + " 00:00:00'";
      } else {
        minDate += this.startDate.getDate() + " 00:00:00'";
      }
      var maxDate = "'" + this.endDate.getFullYear();
      if (this.endDate.getMonth() + 1 < 10) {
        maxDate += '0' + (this.endDate.getMonth() + 1);
      } else {
        maxDate += this.endDate.getMonth() + 1;
      }
      if (this.endDate.getDate() < 10) {
        maxDate += '0' + this.endDate.getDate() + " 23:59:59'";
      } else {
        maxDate += this.endDate.getDate() + " 23:59:59'";
      }
      dateRangeQuery =
        '(createdDate >= ' + minDate + ' and createdDate <= ' + maxDate + ')';
    }

    if (dateRangeQuery.length > 0) {
      query = dateRangeQuery;
    }
    if (subjectQuery.length > 0) {
      query += ' and (' + subjectQuery + ')';
    }
    if (levelQuery.length > 0) {
      query += ' and (' + levelQuery + ')';
    }
    if (costQuery.length > 0) {
      query += ' and (' + costQuery + ')';
    }
    if (query.indexOf(' and') === 0) {
      query = query.slice(4, query.length);
    }
    if (this.subjectFilter.length > 0) {
      this.subjectFilter = 'Môn học: ' + this.subjectFilter;
      result += this.subjectFilter + '; ';
    }
    if (this.levelFilter.length > 0) {
      this.levelFilter = 'Trình độ: ' + this.levelFilter;
      result += this.levelFilter + '; ';
    }
    if (this.costFilter.length > 0) {
      this.costFilter = 'Ngân sách: ' + this.costFilter;
      result += this.costFilter + '; ';
    }
    if (result.length > 0) {
      result = result.slice(0, result.length - 2);
      $('.filter-result').css('display', 'block');
      $('.filterrr').text(result);
      this.filterResult = result;
      query +=
        ' and studentId=' +
        this.loginUser.studentId +
        " and status <> N'Chờ gia sư'";
      this.mainQuery = query;
      this.pageIndex = 0;
      this.studentRequestService.getAllFilter(query).subscribe((res) => {
        this.length = res.length;
      });
      this.studentRequestService
        .filter(query, this.pageIndex + 1, this.pageSize)
        .subscribe((res) => {
          this.studentRequest = res;
          this.length = res.length;
        });
    } else {
      this.showErrorPopup('Bạn chưa chọn bộ lọc !');
    }
  }
  reset() {
    $("input[name='subject']").each(function (this: any) {
      if ($(this).is(':checked')) {
        $(this).prop('checked', false);
      }
    });
    $("input[name='level']").each(function (this: any) {
      if ($(this).is(':checked')) {
        $(this).prop('checked', false);
      }
    });
    $("input[name='cost']").each(function (this: any) {
      if ($(this).is(':checked')) {
        $(this).prop('checked', false);
      }
    });
    $("input[name='method']").each(function (this: any) {
      if ($(this).is(':checked')) {
        $(this).prop('checked', false);
      }
    });
    this.subjectFilter = '';
    this.levelFilter = '';
    this.costFilter = '';
    this.methodFilter = '';
    this.filterResult = '';
    this.range.reset();
    $('.filter-result').css('display', 'none');
    $('.filterrr').text('');
    this.mainQuery =
      'studentId=' +
      this.loginUser.studentId +
      " and status<>N'Chưa có gia sư nào yêu cầu' and status<>N'Đã gửi, chờ gia sư đồng ý'";
    this.studentRequestService.getAllFilter(this.mainQuery).subscribe((res) => {
      this.length = res.length;
    });
    this.studentRequestService
      .filter(this.mainQuery, this.pageIndex + 1, this.pageSize)
      .subscribe((res) => {
        this.studentRequest = res;
      });
  }
  courseList: Course[] = [];
  studentRequestId: number = 0;
  viewRequest(event: any) {
    var id = event.currentTarget.id;
    id = id.toString().slice(8, id.length);
    this.studentRequestId = id;
    this.courseService.getByStudentRequestId(id).subscribe((res) => {
      this.courseList = res;
    });
  }
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number = 20;
  deleteRequest(event: any) {
    var id = event.currentTarget.id;
    id = id.toString().slice(13, id.length);
    Swal.fire({
      title: 'Xóa đề nghị này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.getById(id).subscribe((res) => {
          var tutorRequest = res.objTutorRequest as TutorRequest;
          tutorRequest.status = 'Học viên đã từ chối';
          this.tutorRequestService.updateTutorRequest(tutorRequest).subscribe();
          var studentRequest = res.objStudentRequest as StudentRequest;
          var quantity = (studentRequest?.quantityTutorRequest as number) - 1;
          studentRequest.quantityTutorRequest = quantity;
          if (quantity === 0) {
            studentRequest.status = 'Chờ gia sư';
          } else {
            studentRequest.status = 'Có ' + quantity + ' gia sư yêu cầu';
          }
          this.studentRequestService
            .updateStudentRequest(studentRequest)
            .subscribe((res) => {
              this.studentRequestService
                .filter(this.mainQuery, this.pageIndex + 1, this.pageSize)
                .subscribe((res) => {
                  this.studentRequest = res;
                });
              this.studentRequestService
                .getAllFilter(this.mainQuery)
                .subscribe((res) => {
                  this.length = res.length;
                });
            });
        });
        this.courseService.deleteCourse(id).subscribe((res) => {
          this.courseService
            .getByStudentRequestId(this.studentRequestId)
            .subscribe((res) => {
              this.courseList = res;
            });
        });
        Swal.fire('Thành công!', 'Yêu cầu này đã được xóa', 'success');
        $(function () {
          $('#exampleModal').modal('toggle');
        });
      }
    });
  }

  getDaysArray(start: Date, end: Date, dates: string) {
    var day: number[] = [];
    dates = dates.substring(0, dates.length - 1);
    var dayy = dates.split('$');
    for (let date of dayy) {
      switch (date) {
        case 'Chủ nhật':
          day.push(0);
          break;
        case 'Thứ 2':
          day.push(1);
          break;
        case 'Thứ 3':
          day.push(2);
          break;
        case 'Thứ 4':
          day.push(3);
          break;
        case 'Thứ 5':
          day.push(4);
          break;
        case 'Thứ 6':
          day.push(5);
          break;
        case 'Thứ 7':
          day.push(6);
          break;
      }
    }
    var arr = [];
    for (
      var dt = new Date(start);
      dt < new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      if (day.indexOf(dt.getDay()) > -1) {
        arr.push(new Date(dt));
      }
    }
    return arr;
  }

  accept(event: any) {
    var id = event.currentTarget.id;
    id = id.substring(13, id.length);
    Swal.fire({
      title: 'Đồng ý yêu cầu này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.getById(id).subscribe((res) => {
          res.status = 'Đang diễn ra';
          res.paymentStatus = false;
          res.courseName =
            'Khóa học: ' +
            res.objStudentRequest?.objSubject?.subjectName +
            ' - ' +
            res.objStudentRequest?.objLevel?.levelName +
            ' của học viên: ' +
            (res.objStudentRequest?.objStudent?.fullName as string) +
            ' và gia sư: ' +
            res.objTutorRequest?.objTutor?.fullName;
          this.courseService.updateCourse(res).subscribe();
          var activeDates = this.getDaysArray(
            res.startDate as Date,
            res.endDate as Date,
            res.studyDate as string
          );
          var startTime = new Date(res.startTime as number);
          var endTime = new Date(res.endTime as number);
          activeDates.forEach((date: Date, index: number) => {
            var courseDetail: CourseDetail = {};
            courseDetail.activeDate = date;
            courseDetail.objCourse = res;
            var payTime = res.objStudentRequest?.payTime as number;
            if (index % payTime === 0) {
              courseDetail.payRequest = true;
              if (index != 0 || index === activeDates.length) {
                courseDetail.tutorPay = true;
              }
              if (index === 0) {
                courseDetail.tutorPay = false;
              }
            } else {
              courseDetail.payRequest = false;
              courseDetail.tutorPay = false;
            }
            this.courseDetailService
              .insertCourseDetail(courseDetail)
              .subscribe();
            var schedule: Schedule = {};
            var start = date;
            start.setHours(startTime.getHours());
            start.setMinutes(startTime.getMinutes());
            schedule.startTime = start.getTime();
            var end =
              start.getTime() +
              60 *
                60 *
                1000 *
                (res.objStudentRequest?.durationPerSession as number);
            schedule.endTime = end;
            schedule.subject =
              res.objStudentRequest?.objSubject?.subjectName +
              ' - ' +
              res.objStudentRequest?.objLevel?.levelName;
            schedule.objStudent = res.objStudentRequest?.objStudent;
            schedule.objTutor = res.objTutorRequest?.objTutor;
            this.scheduleService
              .insertSchedule(schedule)
              .subscribe((res) => {});
          });
          if (res.objTutorRequest?.testDate != null) {
            var schedule: Schedule = {};
            schedule.objStudent = res.objStudentRequest?.objStudent;
            schedule.objTutor = res.objTutorRequest?.objTutor;
            var testDate: Date = new Date(res.objTutorRequest?.testDate);
            testDate.setHours(startTime.getHours());
            testDate.setMinutes(startTime.getMinutes());
            schedule.startTime = testDate.getTime();
            var end =
              testDate.getTime() +
              60 *
                60 *
                1000 *
                (res.objStudentRequest?.durationPerSession as number);
            schedule.endTime = end;
            schedule.subject =
              res.objStudentRequest?.objSubject?.subjectName +
              ' - ' +
              res.objStudentRequest?.objLevel?.levelName +
              ' (học thử)';
            this.scheduleService
              .insertSchedule(schedule)
              .subscribe((res) => {});
          }

          var studentRequest = res.objStudentRequest as StudentRequest;
          studentRequest.status = 'Đang diễn ra';
          this.studentRequestService
            .updateStudentRequest(studentRequest)
            .subscribe((res) => {
              this.studentRequestService
                .filter(this.mainQuery, this.pageIndex + 1, this.pageSize)
                .subscribe((res) => {
                  this.studentRequest = res;
                });
              this.studentRequestService
                .getAllFilter(this.mainQuery)
                .subscribe((res) => {
                  this.length = res.length;
                });
            });
          var notification: Notifications = {};
          notification.accountEmail = res.objTutorRequest?.objTutor?.email;
          notification.title = 'Thống báo về đề nghị dạy';
          notification.link =
            '/dashboard-tutor/student-request-detail/' +
            res.objStudentRequest?.studentRequestId;
          notification.content =
            'Học viên: ' +
            res.objStudentRequest?.objStudent?.fullName +
            ' đã châp nhận đề nghị dạy của bạn';
          notification.notificationTime = new Date();
          notification.seen = false;
          this.notificationService.insertNotification(notification).subscribe();
          var tutorAcceptId = res.objTutorRequest?.objTutor?.tutorId;
          var tutorRequest = res.objTutorRequest as TutorRequest;
          tutorRequest.status = 'Đang diễn ra';
          this.tutorRequestService.updateTutorRequest(tutorRequest).subscribe();
          this.tutorRequestService
            .getAllFilter(
              ' studentRequestId = ' +
                res.objStudentRequest?.studentRequestId +
                ' and tutorId<>' +
                tutorAcceptId
            )
            .subscribe((res2) => {
              for (let tutor of res2) {
                var notification: Notifications = {};
                notification.accountEmail = tutor.objTutor?.email;
                notification.title = 'Thống báo về đề nghị dạy';
                notification.link =
                  '/dashboard-tutor/student-request-detail/' +
                  res.objStudentRequest?.studentRequestId;
                notification.content =
                  'Học viên: ' +
                  res.objStudentRequest?.objStudent?.fullName +
                  ' đã tìm được gia sư khác nên yêu cầu của bạn bị xóa';
                this.tutorRequestService
                  .deleteTutorRequest(
                    res.objTutorRequest?.tutorRequestId as number
                  )
                  .subscribe();
                notification.notificationTime = new Date();
                notification.seen = false;
                this.notificationService
                  .insertNotification(notification)
                  .subscribe();
              }
            });
          for (let course of this.courseList) {
            if (course.courseId != id) {
              this.tutorRequestService
                .deleteTutorRequest(
                  course.objTutorRequest?.tutorRequestId as number
                )
                .subscribe((res) => {});
            }
          }
          Swal.fire('Thành công!', 'Khóa học đã được tạo', 'success');
          $(function () {
            $('#exampleModal').modal('toggle');
          });
        });
      }
    });
  }
  getPaginatorData(event: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.studentRequestService
      .filter(this.mainQuery, this.pageIndex + 1, this.pageSize)
      .subscribe((res) => {
        this.studentRequest = res;
      });
    return event;
  }
}
