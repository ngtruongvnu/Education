import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
})
export class LoginAdminComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {}

  loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
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
  isLoading: boolean = false;
  login() {
    if (!this.loginForm.valid) {
      this.showErrorPopup('Vui lòng điền đầy đủ thông tin !');
    } else {
      this.isLoading = true;
      this.adminService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe((res) => {
          this.isLoading = false;
          if (res != null) {
            sessionStorage.setItem('loginUser', JSON.stringify(res));
            this.router.navigate(['/dashboard-admin/home']);
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
  ngOnInit(): void {
    if (this.loginUser.role === 'ROLE_ADMIN') {
      this.router.navigate(['/dashboard-admin/home']);
    }
  }
}
