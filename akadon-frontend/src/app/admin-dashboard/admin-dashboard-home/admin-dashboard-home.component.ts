import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
declare var $: any;
@Component({
  selector: 'app-admin-dashboard-home',
  templateUrl: './admin-dashboard-home.component.html',
  styleUrls: ['./admin-dashboard-home.component.css'],
})
export class AdminDashboardHomeComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  tutors: number = 0;
  students: number = 0;
  courses: number = 0;
  ngOnInit() {
    this.adminService.countData('Tutor').subscribe((res) => {
      this.tutors = res;
    });
    this.adminService.countData('Student').subscribe((res) => {
      this.students = res;
    });
    this.adminService
      .countData("Course where status<>N'Đang chờ học viên'")
      .subscribe((res) => {
        this.courses = res;
      });
    var currentMonth = new Date().getMonth() + 1;
    var dataTutor: number[] = [];
    var dataStudent: number[] = [];
    var dataCourse: number[] = [];
    for (var month = currentMonth - 5; month <= currentMonth; month++) {
      this.lineChartLabels.push('Tháng ' + month);
    }
    this.adminService
      .countDataByMonth('Tutor', currentMonth)
      .subscribe((res) => {
        this.lineChartData[0].data = res;
      });
    this.adminService
      .countDataByMonth('Student', currentMonth)
      .subscribe((res) => {
        this.lineChartData[1].data = res;
      });
    this.adminService
      .countDataByMonth('Course', currentMonth)
      .subscribe((res) => {
        this.lineChartData[2].data = res;
      });
  }

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Gia sư' },
    {
      data: [],
      label: 'Học viên',
    },
    { data: [], label: 'Khóa học' },
  ];

  public lineChartLabels: Label[] = [];

  public lineChartOptions = {
    responsive: true,
  };

  public lineChartLegend = true;
  public lineChartPlugins = [];
}
