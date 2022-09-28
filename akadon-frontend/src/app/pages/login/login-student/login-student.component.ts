import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { CourseDetailService } from 'src/app/services/course-detail.service';
import { CourseService } from 'src/app/services/course.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { Notifications } from '../../../models/notifications';
declare var $: any;
@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css'],
})
export class LoginStudentComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private courseService: CourseService,
    private courseDetailService: CourseDetailService,
    private notificationService: NotificationService
  ) {}

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
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get f() {
    return this.loginForm.controls;
  }
  change(event: any) {
    var id = event.currentTarget.id;
    if (id === 'hide') {
      $('#hide').css('display', 'none');
      $('#show').css('display', 'block');
      $('#password').prop('type', 'password');
    } else {
      $('#hide').css('display', 'block');
      $('#show').css('display', 'none');
      $('#password').prop('type', 'text');
    }
  }
  login() {
    if (!this.loginForm.valid) {
      this.showErrorPopup('Vui lòng điền đầy đủ thông tin !');
    } else {
      this.studentService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe((res) => {
          if (res != null) {
            res.lastLogin = new Date();
            this.studentService.updateStudent(res).subscribe();
            // this.courseService.setStudentLearntData(res).subscribe();
            // this.courseDetailService
            //   .checkPayRequest(res.studentId as number)
            //   .subscribe((res2) => {
            //     if (res2 != null) {
            //       var notification: Notifications = {};
            //       notification.accountEmail = res.email;
            //       notification.content =
            //         'Vui lòng thanh toán học phí cho khóa học ' +
            //         res2.objCourse?.courseName;
            //       notification.title = 'Thanh toán học phí';
            //       notification.link = '';
            //       notification.notificationTime = new Date();
            //       notification.seen = false;
            //       console.log(notification);
            //     }
            //   });
            sessionStorage.setItem('loginUser', JSON.stringify(res));
            this.router.navigate(['/dashboard-student/home']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Đăng nhập thất bại !',
              text: 'Vui lòng kiểm tra lại thông tin !',
            });
          }
        });
    }
  }
  user: any = SocialUser;
  socialLogin: Boolean = false;
  isLoading = false;
  facebookLogin() {
    this.isLoading = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.socialLogin = true;
      this.studentService.getByEmail(this.user.email).subscribe((res) => {
        this.isLoading = false;
        if (res != null) {
          this.socialAuthService.signOut();
          res.lastLogin = new Date();
          this.studentService.updateStudent(res).subscribe();
          // this.courseDetailService
          //   .checkPayRequest(res.studentId as number)
          //   .subscribe((res2) => {
          //     if (res2 != null) {
          //       var notification: Notifications = {};
          //       notification.accountEmail = res.email;
          //       notification.content =
          //         'Vui lòng thanh toán học phí cho khóa học ' +
          //         res2.objCourse?.courseName;
          //       notification.title = 'Thanh toán học phí';
          //       notification.link = '';
          //       notification.notificationTime = new Date();
          //       notification.seen = false;
          //     }
          //   });
          sessionStorage.setItem('loginUser', JSON.stringify(res));
          this.router.navigate(['/dashboard-student/home']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Đăng nhập thất bại !',
            text: 'Tài khoản này chưa được tạo !',
          });
        }
      });
    });
  }
  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.isLoading = false;
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.socialLogin = true;
      this.studentService.getByEmail(this.user.email).subscribe((res) => {
        this.isLoading = false;
        if (res != null) {
          this.socialAuthService.signOut();
          res.lastLogin = new Date();
          this.studentService.updateStudent(res).subscribe();
          // this.courseDetailService
          //   .checkPayRequest(res.studentId as number)
          //   .subscribe((res2) => {
          //     if (res2 != null) {
          //       var notification: Notifications = {};
          //       notification.accountEmail = res.email;
          //       notification.content =
          //         'Vui lòng thanh toán học phí cho khóa học ' +
          //         res2.objCourse?.courseName;
          //       notification.title = 'Thanh toán học phí';
          //       notification.link = '';
          //       notification.notificationTime = new Date();
          //       notification.seen = false;
          //     }
          //   });
          sessionStorage.setItem('loginUser', JSON.stringify(res));
          this.router.navigate(['/dashboard-student/home']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Đăng nhập thất bại !',
            text: 'Tài khoản này chưa được tạo !',
          });
        }
      });
    });
  }
  ngOnInit(): void {}
}
