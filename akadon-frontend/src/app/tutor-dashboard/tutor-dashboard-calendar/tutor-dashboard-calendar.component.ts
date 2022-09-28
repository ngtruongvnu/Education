import { DataManager } from '@syncfusion/ej2-data';
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
import { ScheduleData } from 'src/app/models/schedule-data';
import { TutorData } from 'src/app/models/tutor-data';
import { ScheduleService } from 'src/app/services/schedule.service';
import { StudentData } from 'src/app/models/student-data';
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
  selector: 'app-tutor-dashboard-calendar',
  templateUrl: './tutor-dashboard-calendar.component.html',
  styleUrls: ['./tutor-dashboard-calendar.component.css'],
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
export class TutorDashboardCalendarComponent implements OnInit {
  constructor(private scheduleService: ScheduleService) {}
  public loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  private dataManager: DataManager = new DataManager();
  public eventSettings: EventSettingsModel = { dataSource: this.dataManager };
  scheduleList: Schedule[] = [];
  public teacherDataSource: StudentData[] = [];
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
      .getTutorSchedule(this.loginUser.tutorId)
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
          .getStudentByTutorId(this.loginUser.tutorId)
          .subscribe((res2) => {
            for (let data of res2) {
              var tutor: StudentData = {};
              tutor.name = data.fullName;
              tutor.studentId = data.studentId;
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
