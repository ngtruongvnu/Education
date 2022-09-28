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
import { AdminService } from 'src/app/services/admin.service';
declare var $: any;
@Component({
  selector: 'app-admin-dashboard-student-request',
  templateUrl: './admin-dashboard-student-request.component.html',
  styleUrls: ['./admin-dashboard-student-request.component.css'],
})
export class AdminDashboardStudentRequestComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService,
    private levelService: LevelService,
    private adminService: AdminService
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
    var filter = ' ';
    this.adminService
      .getStudentRequest(filter, 1, this.pageSize)
      .subscribe((res) => {
        this.studentRequest = res;
      });
    this.adminService.countStudentRequest(filter).subscribe((res) => {
      this.length = res;
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
  mainQuery: string = ' ';
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
      this.mainQuery = ' and ' + query;
      this.pageIndex = 0;
      this.adminService.countStudentRequest(this.mainQuery).subscribe((res) => {
        this.length = res;
      });
      this.adminService
        .getStudentRequest(this.mainQuery, this.pageIndex + 1, this.pageSize)
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
    this.mainQuery = '';
    this.adminService
      .getStudentRequest(this.mainQuery, 1, this.pageSize)
      .subscribe((res) => {
        this.studentRequest = res;
      });
    this.adminService.countStudentRequest(this.mainQuery).subscribe((res) => {
      this.length = res;
    });
  }
  requestView: StudentRequest = {};
  viewRequest(event: any) {
    var id = event.currentTarget.id;
    // id = id.toString().slice(8, id.length);
    // this.studentRequestService.getById(id).subscribe((res) => {
    //   this.requestView = res;
    // });
  }

  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number = 20;

  getPaginatorData(event: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.adminService
      .getStudentRequest(this.mainQuery, this.pageIndex + 1, this.pageSize)
      .subscribe((res) => {
        this.studentRequest = res;
      });
    return event;
  }
}
