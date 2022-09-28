import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Level } from 'src/app/models/level';
import { Subject } from 'src/app/models/subject';
import { LevelService } from 'src/app/services/level.service';
import { StudentRequestService } from 'src/app/services/student-request.service';
import { SubjectService } from 'src/app/services/subject.service';
import { StudentRequest } from '../../models/student-request';
import Swal from 'sweetalert2';
import { TutorService } from 'src/app/services/tutor.service';
declare var $: any;
@Component({
  selector: 'app-tutor-dashboard-request-list',
  templateUrl: './tutor-dashboard-request-list.component.html',
  styleUrls: ['./tutor-dashboard-request-list.component.css'],
})
export class TutorDashboardRequestListComponent implements OnInit {
  constructor(
    private studentRequestService: StudentRequestService,
    private subjectService: SubjectService,
    private levelService: LevelService,
    private tutorService: TutorService
  ) {}
  public loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  subjectFilter: string = '';
  levelFilter: string = '';
  costFilter: string = '';
  methodFilter: string = '';

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
      $('#' + value).css('background', '#eeeeef');
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
  filter() {
    var subjectQuery = '';
    var levelQuery = '';
    var costQuery = '';
    var query = 'SR.levelId = TD.levelId and SR.subjectId = TD.subjectId';
    this.subjectFilter = '';
    this.levelFilter = '';
    this.costFilter = '';
    this.methodFilter = '';
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
      if (item != '< 100000 VNĐ') {
        var min = item.slice(0, 6);
        var max = item.slice(9, item.length - 4);
        costQuery +=
          '(SR.costPerHour >= ' +
          min +
          ' and SR.costPerHour <=' +
          max +
          ') or ';
      } else {
        var min = item.slice(2, 8);
        costQuery += '(SR.costPerHour < ' + min + ') or ';
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
      query += ' and TD.tutorId=' + this.loginUser.tutorId;
      this.mainQuery = query;
      this.pageIndex = 0;
      this.tutorService
        .getStudentRequestForTutor(
          this.mainQuery,
          this.pageIndex + 1,
          this.pageSize
        )
        .subscribe((res) => {
          this.listStudentRequest = res;
        });
      this.tutorService
        .countStudentRequestForTutor(this.mainQuery)
        .subscribe((res) => {
          this.length = res;
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
    $('.filter-result').css('display', 'none');
    $('.filterrr').text('');
    this.mainQuery =
      'SR.levelId = TD.levelId and SR.subjectId = TD.subjectId and TD.tutorId=' +
      this.loginUser.tutorId;
    this.tutorService
      .getStudentRequestForTutor(
        this.mainQuery,
        this.pageIndex + 1,
        this.pageSize
      )
      .subscribe((res) => {
        this.listStudentRequest = res;
      });
    this.tutorService
      .countStudentRequestForTutor(this.mainQuery)
      .subscribe((res) => {
        this.length = res;
      });
  }

  listStudentRequest: StudentRequest[] = [];
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number = 20;
  mainQuery =
    'SR.levelId = TD.levelId and SR.subjectId = TD.subjectId and TD.tutorId=' +
    this.loginUser.tutorId;
  filterResult = '';
  subjectData: Subject[] = [];
  levelData: Level[] = [];
  getPaginatorData(event: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.tutorService
      .getStudentRequestForTutor(
        this.mainQuery,
        this.pageIndex + 1,
        this.pageSize
      )
      .subscribe((res) => {
        this.listStudentRequest = res;
      });
    return event;
  }
  ngOnInit(): void {
    this.tutorService
      .getStudentRequestForTutor(
        this.mainQuery,
        this.pageIndex + 1,
        this.pageSize
      )
      .subscribe((res) => {
        this.listStudentRequest = res;
      });
    this.tutorService
      .countStudentRequestForTutor(this.mainQuery)
      .subscribe((res) => {
        this.length = res;
      });
    this.subjectService.getAll().subscribe((res) => {
      this.subjectData = res;
    });
    this.levelService.getAll().subscribe((res) => {
      this.levelData = res;
    });
  }
}
