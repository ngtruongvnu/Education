import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Level } from 'src/app/models/level';
import { Subject } from 'src/app/models/subject';
import { LevelService } from 'src/app/services/level.service';
import { TutorRequestService } from 'src/app/services/tutor-request.service';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { TutorRequest } from 'src/app/models/tutor-request';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { StudentRequestService } from 'src/app/services/student-request.service';
import { StudentRequest } from 'src/app/models/student-request';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { Notifications } from 'src/app/models/notifications';
import { NotificationService } from 'src/app/services/notification.service';
declare var $: any;
@Component({
  selector: 'app-tutor-dashboard-request-receive',
  templateUrl: './tutor-dashboard-request-receive.component.html',
  styleUrls: [
    './tutor-dashboard-request-receive.component.css',
    '../tutor-dashboard-request.component.css',
  ],
})
export class TutorDashboardRequestReceiveComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService,
    private levelService: LevelService,
    private tutorRequestService: TutorRequestService,
    private courseService: CourseService,
    private studentRequestService: StudentRequestService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {}
  public loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  courseEditForm = this.fb.group({
    startTime: ['', Validators.required],
    learningDate: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    tryDate: [''],
  });

  get t() {
    return this.courseEditForm.controls;
  }
  tutorRequest: TutorRequest[] = [];
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
      'TR.tutorId=' +
      this.loginUser.tutorId +
      " and TR.requestType= N'T??? h???c vi??n'";
    this.tutorRequestService
      .filter(filter, 1, this.pageSize)
      .subscribe((res) => {
        this.tutorRequest = res;
        this.length = res.length;
      });
    this.tutorRequestService
      .getAllFilter(
        'TR.tutorId=' +
          this.loginUser.tutorId +
          " and TR.requestType= N'T??? h???c vi??n'"
      )
      .subscribe((res) => {
        this.length = res.length;
      });
    // interval(3000).subscribe((x) => {
    //   this.tutorRequestService
    //     .filter(filter, 1, this.pageSize)
    //     .subscribe((res) => {
    //       this.tutorRequest = res;
    //       this.length = res.length;
    //     });
    //   this.tutorRequestService
    //     .getAllFilter(
    //       'TR.tutorId=' +
    //         this.loginUser.tutorId +
    //         " and TR.requestType= N'T??? h???c vi??n'"
    //     )
    //     .subscribe((res) => {
    //       this.length = res.length;
    //     });
    // });
  }

  lastId: string = 'save';
  change(event: any) {
    var id = event.currentTarget.id;
    $('#' + this.lastId).removeClass('active');
    $('#' + id).addClass('active');
    $('#main-' + id).css('display', 'block');
    $('#main-' + this.lastId).css('display', 'none');
    this.pageIndex = 0;
    if (id === 'save') {
      this.tutorRequestService.getAll().subscribe((res) => {
        this.length = res.length;
      });
    }
    if (id === 'pre-accept-bid') {
    }
    this.lastId = id;
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
      $('.error-popup').addClass('animate__fadeOutDown');
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
      checkbox.css('overflow', 'hidden');
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
    'tutorId = ' +
    this.loginUser.tutorId +
    " and TR.requestType=N'T??? h???c vi??n'";
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
      subjectQuery += 'SR.subjectId=' + item + ' or ';
    }
    for (let item of levelFilter) {
      this.levelFilter += item + ', ';
    }
    for (let item of levelIdFilter) {
      levelQuery += 'SR.levelId=' + item + ' or ';
    }
    for (let item of costFilter) {
      let re = /\,/gi;
      item = item.replace(re, '');
      if (item != '< 100000 VN??') {
        var min = item.slice(0, 6);
        var max = item.slice(9, item.length - 4);
        costQuery +=
          '(SR.costPerSession >= ' +
          min +
          ' and SR.costPerSession <=' +
          max +
          ') or ';
      } else {
        var min = item.slice(2, 8);
        costQuery += '(SR.costPerSession < ' + min + ') or ';
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
        'T??? ng??y: ' +
        this.startDate.getDate() +
        '/' +
        (this.startDate.getMonth() + 1) +
        '/' +
        this.startDate.getFullYear() +
        ' ?????n ng??y: ' +
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
        '(TR.receiveDate >= ' +
        minDate +
        ' and TR.receiveDate <= ' +
        maxDate +
        ')';
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
      this.subjectFilter = 'M??n h???c: ' + this.subjectFilter;
      result += this.subjectFilter + '; ';
    }
    if (this.levelFilter.length > 0) {
      this.levelFilter = 'Tr??nh ?????: ' + this.levelFilter;
      result += this.levelFilter + '; ';
    }
    if (this.costFilter.length > 0) {
      this.costFilter = 'Ng??n s??ch: ' + this.costFilter;
      result += this.costFilter + '; ';
    }
    if (result.length > 0) {
      result = result.slice(0, result.length - 2);
      $('.filter-result').css('display', 'block');
      $('.filterrr').text(result);
      this.filterResult = result;
      query +=
        ' and TR.tutorId=' +
        this.loginUser.tutorId +
        " and TR.requestType=N'T??? h???c vi??n'";
      this.mainQuery = query;
      this.pageIndex = 0;
      this.tutorRequestService.getAllFilter(query).subscribe((res) => {
        this.length = res.length;
      });
      this.tutorRequestService
        .filter(query, this.pageIndex + 1, this.pageSize)
        .subscribe((res) => {
          this.tutorRequest = res;
          this.length = res.length;
        });
    } else {
      this.showErrorPopup('B???n ch??a ch???n b??? l???c !');
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
    this.mainQuery = 'TR.tutorId=' + this.loginUser.tutorId;
    this.tutorRequestService
      .getAllFilter('TR.tutorId=' + this.loginUser.tutorId)
      .subscribe((res) => {
        this.length = res.length;
      });
    this.tutorRequestService
      .filter(
        'TR.tutorId=' + this.loginUser.tutorId,
        this.pageIndex + 1,
        this.pageSize
      )
      .subscribe((res) => {
        this.tutorRequest = res;
      });
  }
  requestView: TutorRequest = {};
  viewRequest(event: any) {
    var id = event.currentTarget.id;
    id = id.toString().slice(8, id.length);
    this.tutorRequestService.getById(id).subscribe((res) => {
      this.requestView = res;
    });
  }
  startTime: any;
  endTime: any;
  minTime: any;
  maxTime: any;
  tutorRequestView: TutorRequest = {};
  learningDateData: any;
  openCourse(event: any) {
    var id = event.currentTarget.id;
    id = id.toString().slice(13, id.length);
    this.tutorRequestService.getById(id).subscribe((res) => {
      this.tutorRequestView = res;
      var startTime = new Date();
      startTime.setTime(res.objStudentRequest?.beginTime as number);
      var endTime = new Date();
      var duration = res.objStudentRequest?.durationPerSession;
      endTime.setTime(
        (res.objStudentRequest?.beginTime as number) +
          (duration as number) * 60 * 60000
      );
      var date = res.objStudentRequest?.learningDate;
      date = date?.substring(0, date.length - 1) as string;
      this.learningDateData = date.split('$');
      this.endTime = endTime.getTime();
      this.startTime = startTime.getHours() + ':' + startTime.getMinutes();
      this.minTime = res.objStudentRequest?.beginTime as number;
      this.maxTime =
        (res.objStudentRequest?.endTime as number) -
        (duration as number) * 60 * 60000;
    });
  }
  changeTime() {
    if (this.courseEditForm.value.startTime != undefined) {
      var startHour = this.courseEditForm.value.startTime.substring(0, 2);
      var startMinute = this.courseEditForm.value.startTime.substring(3, 5);
      var duration =
        this.tutorRequestView.objStudentRequest?.durationPerSession;
      var endTime: Date = new Date();
      endTime.setHours(startHour);
      endTime.setMinutes(startMinute);
      endTime.setTime(endTime.getTime() + (duration as number) * 60 * 60000);
      this.endTime = endTime.getTime();
    }
  }

  submitEditForm() {
    this.courseEditForm.value.startDate;
    this.courseEditForm.value.learningDate;
    this.courseEditForm.value.startDate;
    this.courseEditForm.value.endDate;
    var course: Course = {};
    course.endDate = this.courseEditForm.value.endDate;
    course.startDate = this.courseEditForm.value.startDate;
    var studyDate: string = '';
    for (let date of this.courseEditForm.value.learningDate) {
      studyDate += date + '$';
    }
    course.studyDate = studyDate;
    var startHour = this.courseEditForm.value.startTime.substring(0, 2);
    var startMinute = this.courseEditForm.value.startTime.substring(3, 5);
    var startTime: Date = new Date();
    startTime.setHours(startHour);
    startTime.setMinutes(startMinute);
    course.startTime = startTime.getTime();
    course.endTime = this.endTime;
    course.status = '??ang ch??? h???c vi??n';
    course.createdDate = new Date();
    this.tutorRequestView.status = 'Ch??? h???c vi??n x??c nh???n';
    if (this.courseEditForm.value.tryDate != '') {
      this.tutorRequestView.testDate =
        this.courseEditForm.value.tryDate.getTime();
    }
    course.objStudentRequest = this.tutorRequestView.objStudentRequest;
    course.objTutorRequest = this.tutorRequestView;
    var studentRequest: StudentRequest = this.tutorRequestView
      .objStudentRequest as StudentRequest;
    studentRequest.status = '???? ???????c nh???n, vui l??ng ki???m tra';
    this.courseService.insertCourse(course).subscribe((res) => {
      if (res === 'Th??nh c??ng') {
        Swal.fire(
          'Th??nh c??ng !',
          'Th??ng tin kh??a h???c ???? ???????c g???i !',
          'success'
        );
        this.studentRequestService
          .updateStudentRequest(studentRequest)
          .subscribe();
        this.tutorRequestService
          .updateTutorRequest(this.tutorRequestView)
          .subscribe((res) => {
            this.tutorRequestService
              .getAllFilter(this.mainQuery)
              .subscribe((res) => {
                this.length = res.length;
              });
            this.tutorRequestService
              .filter(this.mainQuery, this.pageIndex + 1, this.pageSize)
              .subscribe((res) => {
                this.tutorRequest = res;
              });
          });

        var notification: Notifications = {};
        notification.accountEmail =
          this.tutorRequestView?.objStudentRequest?.objStudent?.email;
        notification.content =
          'Gia s??: ' +
          this.tutorRequestView?.objTutor?.fullName +
          ' ???? ?????ng ?? y??u c???u cho m??n: ' +
          this.tutorRequestView?.objStudentRequest?.objSubject?.subjectName +
          ' - ' +
          this.tutorRequestView?.objStudentRequest?.objLevel?.levelName +
          ' c???a b???n';
        notification.title = 'Th???ng b??o v??? y??u c???u h???c';
        notification.link = '/dashboard-student/request/receive';
        notification.seen = false;
        notification.notificationTime = new Date();
        this.notificationService.insertNotification(notification).subscribe();
      }
    });
  }

  deleteRequest(event: any) {
    var id = event.currentTarget.id;
    id = id.toString().slice(13, id.length);
    Swal.fire({
      title: 'X??a y??u c???u n??y?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '?????ng ??!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tutorRequestService.getById(id).subscribe((res) => {
          var studentRequest = res.objStudentRequest as StudentRequest;
          studentRequest.status = 'Ch??a c?? gia s?? n??o y??u c???u';
          this.studentRequestService
            .updateStudentRequest(studentRequest)
            .subscribe();
          var notification: Notifications = {};
          notification.title = 'Th???ng b??o v??? y??u c???u h???c';
          notification.accountEmail = res?.objStudentRequest?.objStudent?.email;
          notification.content =
            'Gia s??: ' +
            res?.objTutor?.fullName +
            ' ???? t??? ch???i y??u c???u cho m??n: ' +
            res?.objStudentRequest?.objSubject?.subjectName +
            ' - ' +
            res?.objStudentRequest?.objLevel?.levelName +
            ' c???a b???n';
          notification.link = '/dashboard-student/request/send';
          notification.seen = false;
          notification.notificationTime = new Date();
          this.notificationService.insertNotification(notification).subscribe();
          res.status = '???? x??a';
          this.tutorRequestService.updateTutorRequest(res).subscribe((res) => {
            if (res === 'Th??nh c??ng') {
              Swal.fire(
                'X??a th??nh c??ng!',
                'Y??u c???u n??y ???? ???????c x??a',
                'success'
              );
              this.tutorRequestService
                .filter(this.mainQuery, this.pageIndex, this.pageSize)
                .subscribe((res) => {
                  this.tutorRequest = res;
                  this.length = res.length;
                });
              this.tutorRequestService
                .filter(this.mainQuery, this.pageIndex + 1, this.pageSize)
                .subscribe((res) => {
                  this.tutorRequest = res;
                });
            }
          });
        });
      }
    });
  }
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number = 20;
  getPaginatorData(event: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.tutorRequestService
      .filter(this.mainQuery, this.pageIndex + 1, this.pageSize)
      .subscribe((res) => {
        this.tutorRequest = res;
      });
    return event;
  }
}
