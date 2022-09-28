import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { StudentRequest } from 'src/app/models/student-request';
import { TutorRequest } from 'src/app/models/tutor-request';
import { CourseService } from 'src/app/services/course.service';
import { LevelService } from 'src/app/services/level.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StudentRequestService } from 'src/app/services/student-request.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TutorRequestService } from 'src/app/services/tutor-request.service';
import Swal from 'sweetalert2';
import { Notifications } from '../../models/notifications';

@Component({
  selector: 'app-student-request-detail',
  templateUrl: './student-request-detail.component.html',
  styleUrls: ['./student-request-detail.component.css'],
})
export class StudentRequestDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentRequestService: StudentRequestService,
    private subjectService: SubjectService,
    private levelService: LevelService,
    private tutorRequestService: TutorRequestService,
    private courseService: CourseService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}
  public loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
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
  studentRequestId: number = 0;
  studentRequest: StudentRequest = {};
  participateTime: number = 0;
  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }
  monthDiff(d1: Date, d2: Date) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  sent: string = '';
  learningDate: string = '';
  ngOnInit(): void {
    this.studentRequestId = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe((res) => {
      this.sent = res.status;
    });
    this.studentRequestService
      .getById(this.studentRequestId)
      .subscribe((res) => {
        this.studentRequest = res;
        this.learningDate = res.learningDate as string;
        this.learningDate = this.learningDate.substring(
          0,
          this.learningDate.length - 1
        );
        var ld = this.learningDate.split('$');
        this.learningDate = '';
        for (date of ld) {
          this.learningDate += date + ', ';
        }
        this.learningDate = this.learningDate.substring(
          0,
          this.learningDate.length - 2
        );
        var today: Date = new Date();
        var date = this.getFormatedDate(
          res.objStudent?.otpRequestTime as Date,
          'dd'
        );
        var month = this.getFormatedDate(
          res.objStudent?.otpRequestTime as Date,
          'MM'
        );
        var year = this.getFormatedDate(
          res.objStudent?.otpRequestTime as Date,
          'yyyy'
        );
        var participateDate = new Date(year + '/' + month + '/' + date);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        this.participateTime = this.monthDiff(today, participateDate);
      });
  }
  startTime: any;
  endTime: any;
  minTime: any;
  maxTime: any;
  tutorRequestView: TutorRequest = {};
  learningDateData: any;
  openCourse() {
    this.tutorRequestView.objStudentRequest = this.studentRequest;
    this.tutorRequestView.objTutor = this.loginUser;
    this.tutorRequestView.requestType = 'Từ gia sư';
    var startTime = new Date();
    startTime.setTime(this.studentRequest?.beginTime as number);
    var endTime = new Date();
    var duration = this.studentRequest?.durationPerSession;
    endTime.setTime(
      (this.studentRequest?.beginTime as number) +
        (duration as number) * 60 * 60000
    );
    var date = this.studentRequest?.learningDate;
    date = date?.substring(0, date.length - 1) as string;
    this.learningDateData = date.split('$');
    this.endTime = endTime.getTime();
    this.startTime = startTime.getHours() + ':' + startTime.getMinutes();
    this.minTime = this.studentRequest?.beginTime as number;
    this.maxTime =
      (this.studentRequest?.endTime as number) -
      (duration as number) * 60 * 60000;
  }
  changeTime() {
    if (this.courseEditForm.value.startTime != undefined) {
      var startHour = this.courseEditForm.value.startTime.substring(0, 2);
      var startMinute = this.courseEditForm.value.startTime.substring(3, 5);
      var duration = this.studentRequest?.durationPerSession;
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
    course.startTime =
      this.endTime -
      (this.studentRequest.durationPerSession as number) * 60 * 60000;
    course.endTime = this.endTime;
    course.status = 'Đang chờ học viên';
    course.createdDate = new Date();
    this.tutorRequestView.status = 'Chờ học viên xác nhận';
    this.tutorRequestView.receiveDate = new Date();
    if (this.courseEditForm.value.tryDate != '')
      this.tutorRequestView.testDate =
        this.courseEditForm.value.tryDate.getTime();
    course.objStudentRequest = this.tutorRequestView.objStudentRequest;
    var studentRequest: StudentRequest = this.tutorRequestView
      .objStudentRequest as StudentRequest;
    var quantity = (this.studentRequest.quantityTutorRequest as number) + 1;
    this.studentRequest.quantityTutorRequest = quantity;
    studentRequest.status = 'Có ' + quantity + ' gia sư yêu cầu';
    this.tutorRequestService
      .insertTutorRequest(this.tutorRequestView, 0)
      .subscribe((res) => {
        course.objTutorRequest = res;
        this.courseService.insertCourse(course).subscribe((res) => {
          if (res === 'Thành công') {
            Swal.fire(
              'Thành công !',
              'Thông tin khóa học đã được gửi !',
              'success'
            );
            var notification: Notifications = {};
            notification.accountEmail = this.studentRequest?.objStudent?.email;
            notification.content =
              'Gia sư: ' +
              this.tutorRequestView?.objTutor?.fullName +
              ' đã gửi yêu cầu cho môn: ' +
              this.studentRequest.objSubject?.subjectName +
              ' - ' +
              this.studentRequest.objLevel?.levelName +
              ' của bạn';
            notification.link = '/dashboard-student/request/receive';
            notification.title = 'Thông báo về yêu cầu học';
            notification.seen = false;
            notification.notificationTime = new Date();
            this.notificationService
              .insertNotification(notification)
              .subscribe();
            this.studentRequestService
              .updateStudentRequest(studentRequest)
              .subscribe();
            this.router.navigate(['/dashboard-tutor/request-list']);
          }
        });
      });
  }
}
