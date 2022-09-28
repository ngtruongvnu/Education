import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor() {}
  show: boolean = true;
  hideMenu() {
    $('.logo').attr('src', './assets/images/small-logo.svg');
    $('.logo').css('width', '120%');
    $('.fa-chevron-left').css('display', 'none');
    $('.fa-chevron-right').css('display', 'flex');
    $('.fa-chevron-right').css('top', '60px');
    $('nav').css('width', '70px');
    $('.menu-title').css('display', 'none');
    $('.main').css('width', 'calc(100% - 70px)');
  }
  showMenu() {
    $('.logo').attr('src', './assets/images/logo-akadon.png');
    $('.logo').css('width', '100%');
    $('.fa-chevron-left').css('top', '80px');
    $('.fa-chevron-right').css('display', 'none');
    $('.fa-chevron-left').css('display', 'flex');
    $('nav').css('width', '230px');
    $('.menu-title').css('display', 'block');
    $('.main').css('width', 'calc(100% - 230px)');
  }
  ngOnInit(): void {}
}
