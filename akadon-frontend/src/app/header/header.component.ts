import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  page: string = "";
  changeLanguage(event: any) {
    var value = event.target.value;
    if (value === 'vn') {
      $('.flag').attr('src', './assets/images/vietnam.png');
    } else {
      $('.flag').attr('src', './assets/images/america.png');
    }
  }
  ngOnInit(): void {
    this.page = this.router.url;
  }

}
