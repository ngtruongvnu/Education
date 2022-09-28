import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}
  public loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  ngOnInit(): void {
    if (this.loginUser != null) {
      this.router.navigate(['/dashboard-student/home']);
    }
  }
}
