import { Component, OnInit } from '@angular/core';
import { TutorScheduleServiceService } from '../../services/tutor-schedule-service.service';
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
  TimelineViewsService,
  TimelineMonthService,
  EventSettingsModel,
  DragAndDropService,
  ResizeService,
  ActionEventArgs,
  ToolbarActionArgs,
  ExportOptions,
  Schedule,
} from '@syncfusion/ej2-angular-schedule';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ScheduleData } from '../../models/schedule-data';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { TutorData } from 'src/app/models/tutor-data';
import { loadCldr } from '@syncfusion/ej2-base';
declare var $: any;
declare let require: Function;
loadCldr(
  require('../../../../node_modules/cldr-data/supplemental/numberingSystems.json'),
  require('../../../../node_modules/cldr-data/main/vi/ca-gregorian.json'),
  require('../../../../node_modules/cldr-data/main/vi/currencies.json'),
  require('../../../../node_modules/cldr-data/main/vi/numbers.json'),
  require('../../../../node_modules/cldr-data/main/vi/timeZoneNames.json')
);
@Component({
  selector: 'app-student-dashboard-calendar',
  templateUrl: './student-dashboard-calendar.component.html',
  styleUrls: ['./student-dashboard-calendar.component.css'],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    TimelineViewsService,
    TimelineMonthService,
    DragAndDropService,
    ResizeService,
  ],
})
export class StudentDashboardCalendarComponent implements OnInit {
  constructor(private scheduleService: ScheduleService) {}
  public loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  private dataManager: DataManager = new DataManager();
  public eventSettings: EventSettingsModel = { dataSource: this.dataManager };
  scheduleList: Schedule[] = [];
  public teacherDataSource: TutorData[] = [];
  isLoading: Boolean = false;
  getDarkColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }
  ngOnInit(): void {
    var listSchedule: ScheduleData[] = [];
    var listTutorData: TutorData[] = [];
    this.isLoading = true;
    this.scheduleService
      .getStudentSchedule(this.loginUser.studentId)
      .subscribe((res) => {
        for (let data of res) {
          var scheduleData: ScheduleData = {};
          scheduleData.Id = data.id;
          scheduleData.EndTime = new Date(data.endTime as number);
          scheduleData.StartTime = new Date(data.startTime as number);
          scheduleData.Subject = data.subject;
          scheduleData.tutorId = data.objTutor?.tutorId;
          scheduleData.studentId = data.objStudent?.studentId;
          listSchedule.push(scheduleData);
        }
        this.dataManager.dataSource.json = listSchedule;
        this.scheduleService
          .getTutorByStudentId(this.loginUser.studentId)
          .subscribe((res) => {
            for (let data of res) {
              var tutor: TutorData = {};
              tutor.name = data.fullName;
              tutor.tutorId = data.tutorId;
              tutor.color = this.getDarkColor();
              listTutorData.push(tutor);
            }
            this.teacherDataSource = listTutorData;
            setTimeout(() => {
              this.isLoading = false;
            }, 300);
          });
      });
  }
}
