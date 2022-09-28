import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Notifications } from 'src/app/models/notifications';
import { Tutor } from 'src/app/models/tutor';
import { NotificationService } from 'src/app/services/notification.service';
import { ServicePackageService } from 'src/app/services/service-package.service';
import { TutorService } from 'src/app/services/tutor.service';
import {
  ConfirmedValidator,
  NumberValidator,
  TransformValidator,
  SpecialValidator,
  TutorEmailCheck,
} from 'src/app/validator';
import Swal from 'sweetalert2';
import { ServicePackage } from '../../models/service-package';
declare var $: any;
@Component({
  selector: 'app-tutor-dashboard-header',
  templateUrl: './tutor-dashboard-header.component.html',
  styleUrls: ['./tutor-dashboard-header.component.css'],
})
export class TutorDashboardHeaderComponent implements OnInit {
  constructor(
    private servicePackageService: ServicePackageService,
    private notificationService: NotificationService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private fb: FormBuilder,
    private tutorService: TutorService
  ) {}
  public loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  loginForm = this.fb.group(
    {
      currentPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: [
        ConfirmedValidator('password', 'confirmPassword'),
        NumberValidator('password'),
        TransformValidator('password'),
        SpecialValidator('password'),
      ],
    }
  );

  get f() {
    return this.loginForm.controls;
  }
  onPasswordChange(event: any) {
    var password = event.target.value;
    var special = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var uppercase = /['A-Z']/;
    var lowercase = /['a-z']/;
    var number = /[0-9]/;
    if (special.test(password)) {
      $('#specialCharacterCheck').css('color', 'rgb(0 183 23)');
    } else {
      $('#specialCharacterCheck').css('color', '#8f8f8f');
    }
    if (password.length >= 8) {
      $('#lengthCheck').css('color', 'rgb(0 183 23)');
    } else {
      $('#lengthCheck').css('color', '#8f8f8f');
    }
    if (uppercase.test(password) && lowercase.test(password)) {
      $('#transformCheck').css('color', 'rgb(0 183 23)');
    } else {
      $('#transformCheck').css('color', '#8f8f8f');
    }
    if (number.test(password)) {
      $('#numberCheck').css('color', 'rgb(0 183 23)');
    } else {
      $('#numberCheck').css('color', '#8f8f8f');
    }
  }
  change(event: any) {
    var id = event.currentTarget.id;
    if (id === 'hidee') {
      $('#hidee').css('display', 'none');
      $('#showw').css('display', 'block');
      $('#password').prop('type', 'password');
    } else if (id === 'showw') {
      $('#hidee').css('display', 'block');
      $('#showw').css('display', 'none');
      $('#password').prop('type', 'text');
    } else if (id === 'confirm-hide') {
      $('#confirm-hide').css('display', 'none');
      $('#confirm-show').css('display', 'block');
      $('#confirmPassword').prop('type', 'password');
    } else if (id === 'confirm-show') {
      $('#confirm-show').css('display', 'none');
      $('#confirm-hide').css('display', 'block');
      $('#confirmPassword').prop('type', 'text');
    } else if (id === 'hideee') {
      $('#hideee').css('display', 'none');
      $('#showww').css('display', 'block');
      $('#currentPassword').prop('type', 'password');
    } else {
      $('#showww').css('display', 'none');
      $('#hideee').css('display', 'block');
      $('#currentPassword').prop('type', 'text');
    }
  }
  isUpdateLoading: boolean = false;
  changePassword() {
    var currentPassword = this.loginForm.value.currentPassword;
    var password = this.loginForm.value.password;
    this.tutorService
      .login(this.loginUser.email, currentPassword)
      .subscribe((res) => {
        if (res != null) {
          this.isUpdateLoading = true;
          var tutor = res;
          tutor.password = password;
          this.tutorService.updateTutor(tutor).subscribe((res) => {
            this.isUpdateLoading = false;
            Swal.fire('Thành công!', 'Mật khẩu đã được thay đổi!', 'success');
            this.tutorService
              .login(tutor.email as string, tutor.password as string)
              .subscribe((res) => {
                sessionStorage.setItem('loginUser', JSON.stringify(res));
              });
            this.loginForm.reset();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Thất bại',
            text: 'Mật khẩu hiện tại không đúng!',
          });
        }
      });
  }
  today: Date = new Date();
  day: any;
  date: any;
  month: any;
  year: any;
  servicePackage: ServicePackage = {};
  notificationList: Notifications[] = [];
  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
    this.date = this.today.getDate();
    this.month = this.today.getMonth() + 1;
    this.year = this.today.getFullYear();
    switch (this.today.getDay()) {
      case 0:
        this.day = 'Chủ Nhật';
        break;
      case 1:
        this.day = 'Thứ Hai';
        break;
      case 2:
        this.day = 'Thứ Ba';
        break;
      case 3:
        this.day = 'Thứ Tư';
        break;
      case 4:
        this.day = 'Thứ Năm';
        break;
      case 5:
        this.day = 'Thứ Sáu';
        break;
      case 6:
        this.day = 'Thứ Bảy';
        break;
    }
    if (this.date < 10) {
      this.date = '0' + this.date;
    }
    if (this.month < 10) {
      this.month = '0' + this.month;
    }
    this.notificationService
      .countUnseenNotifications(this.loginUser.email as string)
      .subscribe((res) => {
        this.unseenLength = res;
      });
    this.notificationService
      .countNotifications(this.loginUser.email as string)
      .subscribe((res) => {
        this.maxLength = res;
      });
    this.notificationService
      .getByEmail(this.loginUser.email as string, 1, this.length)
      .subscribe((res) => {
        this.notificationList = res;
      });
    $('.fa-bell').click(function () {
      $('#notifications').toggle();
    });
    $('.tutor-name').click(function () {
      $('#menu').toggle();
    });
    $(window).click(function (e: any) {
      if (
        e.target.id !== 'bell' &&
        e.target.id !== 'notifications' &&
        e.target.id !== 'viewAll'
      ) {
        $('#notifications').hide();
      }
      if (e.target.id !== 'information' && e.target.id !== 'menu') {
        $('#menu').hide();
      }
    });
  }
  isLoading: boolean = false;
  maxLength: number = 0;
  unseenLength: number = 0;
  scrollEvent() {
    var currentHeight = $('#notifications').scrollTop();
    var maxHeight =
      $('#notifications').prop('scrollHeight') -
      $('#notifications').prop('offsetHeight');
    if (currentHeight === maxHeight && this.length < this.maxLength) {
      if (this.length + 5 < this.maxLength) {
        this.length += 5;
      } else {
        this.length = this.maxLength;
      }

      this.isLoading = true;
      setTimeout(() => {
        this.notificationService
          .getByEmail(this.loginUser.email as string, 1, this.length)
          .subscribe((res) => {
            this.notificationList = res;
          });
        this.isLoading = false;
      }, 800);
    }
  }
  id: any;
  length: number = 5;
  viewNotification(notification: Notifications) {
    notification.seen = true;
    this.notificationService.viewNotification(notification).subscribe((res) => {
      this.notificationService
        .countUnseenNotifications(this.loginUser.email as string)
        .subscribe((res) => {
          this.unseenLength = res;
        });
      this.notificationService
        .countNotifications(this.loginUser.email as string)
        .subscribe((res) => {
          this.maxLength = res;
        });
      this.notificationService
        .getByEmail(this.loginUser.email as string, 1, this.length)
        .subscribe((res) => {
          this.notificationList = res;
        });
    });
  }
  viewAll() {
    this.notificationService
      .viewAll(this.loginUser.email as string)
      .subscribe((res) => {
        this.notificationService
          .countUnseenNotifications(this.loginUser.email as string)
          .subscribe((res) => {
            this.unseenLength = res;
          });
        this.notificationService
          .countNotifications(this.loginUser.email as string)
          .subscribe((res) => {
            this.maxLength = res;
          });
        this.notificationService
          .getByEmail(this.loginUser.email as string, 1, this.length)
          .subscribe((res) => {
            this.notificationList = res;
          });
      });
  }
  signOut() {
    sessionStorage.removeItem('loginUser');
    this.socialAuthService.signOut();
    this.router.navigate(['/']);
  }
}
