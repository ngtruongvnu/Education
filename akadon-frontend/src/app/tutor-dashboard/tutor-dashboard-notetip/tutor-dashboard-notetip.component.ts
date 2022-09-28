import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tutor-dashboard-notetip',
  templateUrl: './tutor-dashboard-notetip.component.html',
  styleUrls: ['./tutor-dashboard-notetip.component.css'],
})
export class TutorDashboardNotetipComponent implements OnInit {
  loading: boolean = true;
  constructor(private router: Router) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.loading = true;
      }
      if (routerEvent instanceof NavigationEnd) {
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {}
}
