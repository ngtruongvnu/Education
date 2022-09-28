import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { CourseService } from 'src/app/services/course.service';
import { TutorService } from 'src/app/services/tutor.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-login-tutor',
  templateUrl: './login-tutor.component.html',
  styleUrls: ['./login-tutor.component.css'],
})
export class LoginTutorComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tutorService: TutorService,
    private socialAuthService: SocialAuthService,
    private courseService: CourseService
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
      this.isLoading = true;
      this.tutorService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe((res) => {
          this.isLoading = false;
          if (res != null) {
            res.lastLogin = new Date();
            this.tutorService.updateTutor(res).subscribe();
            this.courseService.setTutorTaughtData(res).subscribe();
            sessionStorage.setItem('loginUser', JSON.stringify(res));
            this.router.navigate(['/dashboard-tutor/home']);
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
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.socialLogin = true;
      this.tutorService.getByEmail(this.user.email).subscribe((res) => {
        if (res != null) {
          res.lastLogin = new Date();
          this.tutorService.updateTutor(res).subscribe();
          sessionStorage.setItem('loginUser', JSON.stringify(res));
          this.router.navigate(['/dashboard-tutor/home']);
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
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.socialLogin = true;
      this.tutorService.getByEmail(this.user.email).subscribe((res) => {
        if (res != null) {
          res.lastLogin = new Date();
          this.tutorService.updateTutor(res).subscribe();
          sessionStorage.setItem('loginUser', JSON.stringify(res));
          this.router.navigate(['/dashboard-tutor/home']);
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
  ngOnInit(): void {
    // this.socialAuthService.signOut();
  }
}
