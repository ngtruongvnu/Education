import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Level } from 'src/app/models/level';
import { Subject } from 'src/app/models/subject';
import { LevelService } from 'src/app/services/level.service';
import { SubjectService } from 'src/app/services/subject.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
declare var $: any;
import {
  CostCheck,
  LevelCheck,
  SubjectCheck,
  DurationCheck,
  PayTimeCheck,
} from '../../../validator';
import { StudentRequest } from 'src/app/models/student-request';
import { StudentRequestService } from 'src/app/services/student-request.service';
import { TutorRequestService } from '../../../services/tutor-request.service';
import { TutorDetail } from 'src/app/models/tutor-detail';
import { TutorDetailService } from '../../../services/tutor-detail.service';
import { PageEvent } from '@angular/material/paginator';
import { TutorRequest } from '../../../models/tutor-request';
import { MatStepper } from '@angular/material/stepper';
import { Notifications } from 'src/app/models/notifications';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-student-dashboard-request-form',
  templateUrl: './student-dashboard-request-form.component.html',
  styleUrls: ['./student-dashboard-request-form.component.css'],
})
export class StudentDashboardRequestFormComponent implements OnInit {
  isLinear = false;
  public loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  subjectInfoForm = this._formBuilder.group(
    {
      requestTitle: ['', Validators.required],
      subject: ['Chọn môn học', Validators.required],
      level: ['Chọn trình độ', Validators.required],
    },
    {
      validator: [SubjectCheck('subject'), LevelCheck('level')],
    }
  );

  get s() {
    return this.subjectInfoForm.controls;
  }
  timeCostForm = this._formBuilder.group(
    {
      cost: ['Chọn ngân sách', Validators.required],
      duration: ['Chọn thời lượng buổi học', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      payTime: ['Thanh toán học phí', Validators.required],
      learningDate: ['', Validators.required],
      endDate: [''],
      try: [''],
      learningMethod: ['', Validators.required],
    },
    {
      validator: [
        CostCheck('cost'),
        DurationCheck('duration'),
        PayTimeCheck('payTime'),
      ],
    }
  );

  get t() {
    return this.timeCostForm.controls;
  }

  studentInfoForm = this._formBuilder.group({
    introduction: ['', Validators.required],
    wish: ['', Validators.required],
  });

  get si() {
    return this.studentInfoForm.controls;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private levelService: LevelService,
    private studentRequestService: StudentRequestService,
    private tutorDetailService: TutorDetailService,
    private tutorRequestService: TutorRequestService,
    private notificationService: NotificationService
  ) {}
  subjectData: Subject[] = [];
  levelData: Level[] = [];
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings!: IDropdownSettings;
  studentRequest: StudentRequest = {};
  suitableTutor: TutorDetail[] = [];
  @ViewChild('subStepper')
  subStepper!: MatStepper;

  submitSubject() {
    var subjectId = this.subjectInfoForm.value.subject.subjectId;
    var levelId = this.subjectInfoForm.value.level.levelId;
    this.studentRequestService
      .checkRequest(subjectId, levelId, this.loginUser.studentId)
      .subscribe((res) => {
        if (!res) {
          this.subStepper.selectedIndex = 0;
          $('.exist').css('display', 'block');
        } else {
          $('.exist').css('display', 'none');
        }
      });
  }
  submitStep1() {
    var start: Date = new Date('01/01/2000');
    var end: Date = new Date('01/01/2000');
    var startHour = this.timeCostForm.value.startTime;
    startHour = startHour.toString().slice(0, 2);
    var startMinute = this.timeCostForm.value.startTime.toString().slice(3, 5);
    var endHour = this.timeCostForm.value.endTime;
    endHour = endHour.toString().slice(0, 2);
    var endMinute = this.timeCostForm.value.endTime.toString().slice(3, 5);
    start.setHours(startHour);
    start.setMinutes(startMinute);
    start.setSeconds(0);
    end.setHours(endHour);
    end.setMinutes(endMinute);
    end.setSeconds(0);
    this.studentRequest.beginTime = start.getTime();
    this.studentRequest.endTime = end.getTime();
    this.studentRequest.durationPerSession = this.timeCostForm.value.duration;
    this.studentRequest.introduction = this.studentInfoForm.value.introduction;
    var learningDate: string = '';
    for (let data of this.timeCostForm.value.learningDate) {
      learningDate += data.item_text + '$';
    }
    learningDate.slice(0, learningDate.length - 1);
    this.studentRequest.learningDate = learningDate;
    this.studentRequest.objLevel = this.subjectInfoForm.value.level;
    this.studentRequest.objSubject = this.subjectInfoForm.value.subject;
    this.studentRequest.objStudent = this.loginUser;
    this.studentRequest.status = 'Đã gửi, chờ gia sư đồng ý';
    this.studentRequest.costPerHour = this.timeCostForm.value.cost;
    this.studentRequest.studentRequestTitle =
      this.subjectInfoForm.value.requestTitle;
    this.studentRequest.studentWishes = this.studentInfoForm.value.wish;
    if (this.timeCostForm.value.try === '') {
      this.studentRequest.testLearning = false;
    } else {
      this.studentRequest.testLearning = this.timeCostForm.value.try;
    }
    this.studentRequest.learningMethod = this.timeCostForm.value.learningMethod;
    this.studentRequest.createdDate = new Date();
    this.studentRequest.quantityTutorRequest = 0;
    this.studentRequest.endDate = this.timeCostForm.value.endDate;
    this.studentRequest.payTime = this.timeCostForm.value.payTime;
    this.studentRequestService
      .insertStudentRequest(this.studentRequest)
      .subscribe((res) => {
        this.studentRequest = res;
      });
    this.tutorDetailService
      .getSuitableTutor(
        this.studentRequest.objLevel?.levelId as number,
        this.studentRequest.objSubject?.subjectId as number,
        this.pageIndex + 1,
        this.pageSize
      )
      .subscribe((res) => {
        this.suitableTutor = res;
      });
    this.tutorDetailService
      .countSuitableTutor(
        this.studentRequest.objLevel?.levelId as number,
        this.studentRequest.objSubject?.subjectId as number
      )
      .subscribe((res) => {
        this.length = res;
      });
  }
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 3;
  length: number = 20;
  getPaginatorData(event: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.tutorDetailService
      .getSuitableTutor(
        this.studentRequest.objLevel?.levelId as number,
        this.studentRequest.objSubject?.subjectId as number,
        this.pageIndex + 1,
        this.pageSize
      )
      .subscribe((res) => {
        this.suitableTutor = res;
      });

    return event;
  }
  sendRequest(event: any) {
    var tutorRequest: TutorRequest = {};
    tutorRequest.objStudentRequest = this.studentRequest;
    tutorRequest.receiveDate = new Date();
    tutorRequest.requestType = 'Từ học viên';
    tutorRequest.status = 'Chờ xác nhận';
    this.tutorRequestService
      .insertTutorRequest(tutorRequest, event.currentTarget.id)
      .subscribe((res) => {
        var notification: Notifications = {};
        notification.accountEmail = res?.objTutor?.email;
        notification.title = 'Yêu cầu từ học viên';
        notification.link =
          '/dashboard-tutor/student-request-detail/' +
          this.studentRequest.studentRequestId;
        ('?status=sent');
        notification.content =
          'Học viên: ' +
          this.loginUser.fullName +
          ' đã gửi cho bạn 1 yêu cầu dạy học';
        notification.notificationTime = new Date();
        notification.seen = false;
        this.notificationService.insertNotification(notification).subscribe();
      });
  }
  skip() {
    this.studentRequest.status = 'Chưa có gia sư nào yêu cầu';
    this.studentRequest.quantityTutorRequest = 0;
    console.log(this.studentRequest);
    this.studentRequestService
      .updateStudentRequest(this.studentRequest)
      .subscribe();
  }
  ngOnInit() {
    this.subjectService.getAll().subscribe((res) => {
      this.subjectData = res;
    });
    this.levelService.getAll().subscribe((res) => {
      this.levelData = res;
    });

    this.dropdownList = [
      { item_id: 1, item_text: 'Thứ 2' },
      { item_id: 2, item_text: 'Thứ 3' },
      { item_id: 3, item_text: 'Thứ 4' },
      { item_id: 4, item_text: 'Thứ 5' },
      { item_id: 5, item_text: 'Thứ 6' },
      { item_id: 6, item_text: 'Thứ 7' },
      { item_id: 7, item_text: 'Chủ nhật' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
    };
  }
}
