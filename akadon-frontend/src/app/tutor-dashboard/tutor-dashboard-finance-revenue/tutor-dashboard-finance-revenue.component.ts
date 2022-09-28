import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-tutor-dashboard-finance-revenue',
  templateUrl: './tutor-dashboard-finance-revenue.component.html',
  styleUrls: ['./tutor-dashboard-finance-revenue.component.css'],
})
export class TutorDashboardFinanceRevenueComponent implements OnInit {
  constructor() {}

  emptyTransaction: boolean = true;
  lastId: string = 'all';
  change(event: any) {
    var id = event.currentTarget.id;
    $('#' + this.lastId).removeClass('active');
    $('#' + id).addClass('active');
    $('#main-' + id).css('display', 'flex');
    $('#main-' + this.lastId).css('display', 'none');
    this.lastId = id;
  }
  ngOnInit(): void {
    $('#transaction-date').daterangepicker();
  }
}
