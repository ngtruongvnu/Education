import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { City } from 'src/app/models/city';
import { District } from 'src/app/models/district';
import { Student } from 'src/app/models/student';
import { Ward } from 'src/app/models/ward';
import { AddressService } from 'src/app/services/address.service';
import { StudentService } from 'src/app/services/student.service';
import {
  CityCheck,
  DistrictCheck,
  WardCheck,
  GenderCheck,
} from '../../../validator';
import {
  CodeCheck,
  CodeCheckTimeOut,
  StudentEmailCheck,
  StudentPhoneNumberCheck,
} from '../../../validator';
import {
  ConfirmedValidator,
  NumberValidator,
  SpecialValidator,
  TransformValidator,
} from 'src/app/validator';
import {
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UploadFileService } from 'src/app/services/upload-file.service';
declare var $: any;
@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css'],
})
export class RegisterStudentComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private studentService: StudentService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private uploadFileService: UploadFileService
  ) {}

  email: string = '';
  code: string = '';
  id: number = 0;
  user: any = SocialUser;
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
  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: [
        ConfirmedValidator('password', 'confirmPassword'),
        NumberValidator('password'),
        TransformValidator('password'),
        SpecialValidator('password'),
        StudentEmailCheck('email', this.studentService),
      ],
    }
  );

  verifyForm = this.fb.group(
    {
      code: ['', [Validators.required]],
    },
    {
      validator: [
        CodeCheck('code', this.studentService),
        CodeCheckTimeOut('code', this.studentService),
      ],
    }
  );

  informationForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      gender: ['Chọn giới tính', [Validators.required]],
      city: ['Tỉnh / Thành phố', [Validators.required]],
      district: ['Quận / Huyện', [Validators.required]],
      ward: ['Phường / Xã', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      ],
    },
    {
      validator: [
        StudentPhoneNumberCheck('phoneNumber', this.studentService),
        CityCheck('city'),
        DistrictCheck('district'),
        WardCheck('ward'),
        GenderCheck('gender'),
      ],
    }
  );

  get f() {
    return this.loginForm.controls;
  }

  get v() {
    return this.verifyForm.controls;
  }

  get i() {
    return this.informationForm.controls;
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
    if (id === 'hide') {
      $('#hide').css('display', 'none');
      $('#show').css('display', 'block');
      $('#password').prop('type', 'password');
    } else if (id === 'show') {
      $('#hide').css('display', 'block');
      $('#show').css('display', 'none');
      $('#password').prop('type', 'text');
    } else if (id === 'confirm-hide') {
      $('#confirm-hide').css('display', 'none');
      $('#confirm-show').css('display', 'block');
      $('#confirmPassword').prop('type', 'password');
    } else {
      $('#confirm-show').css('display', 'none');
      $('#confirm-hide').css('display', 'block');
      $('#confirmPassword').prop('type', 'text');
    }
  }
  timeOut: boolean = false;
  login() {
    if (!this.loginForm.valid) {
      this.showErrorPopup('Vui lòng điền đầy đủ thông tin !');
    } else {
      this.isLoading = true;
      this.email = this.loginForm.value.email;
      this.student.email = this.email;
      this.student.password = this.loginForm.value.password;
      sessionStorage.setItem('email', this.email);
      this.studentService.insertStudent(this.student).subscribe((res: any) => {
        this.isLoading = false;
        this.timeOut = true;
        this.config = { leftTime: 30, format: 'm:s' };
        setTimeout(() => {
          $('#timeout').css('display', 'block');
        }, 30000);
      });
    }
  }
  config: any;
  resend: Boolean = false;
  sendCode() {
    this.resend = true;
    this.isLoading = true;
    $('#timeout').css('display', 'none');
    this.studentService.sendCode(this.email).subscribe((res) => {
      this.isLoading = false;
      this.config = { leftTime: 30, format: 'm:s' };
      setTimeout(() => {
        $('#timeout').css('display', 'block');
      }, 30000);
    });
  }

  verify() {
    if (!this.verifyForm.valid) {
      this.showErrorPopup('Vui lòng điền mã OTP !');
    } else {
      this.cityData = this.addressService.getAllCities();
      this.city = this.addressService.getCityById('01');
    }
  }
  chooseCity(event: any) {
    var cityId = event.target.value;
    this.city = this.addressService.getCityById(cityId);
    this.cityName = this.city.Name as string;
    this.districtData = this.city.Districts as District[];
  }
  chooseDistrict(event: any) {
    var districtId = event.target.value;
    this.wardData = this.districtData.filter(
      (district: District) => district.id === districtId
    )[0].Wards as Ward[];
    this.districtName = this.districtData.filter(
      (district: District) => district.id === districtId
    )[0].Name as string;
  }

  isLoading: Boolean = false;
  submitInfo() {
    if (!this.informationForm.valid) {
      this.showErrorPopup('Vui lòng điền đầy đủ thông tin !');
    } else {
      this.student.behaviorPoint = 50;
      this.student.birthday = this.informationForm.value.birthday;
      this.student.city = this.cityName;
      this.student.district = this.districtName;
      this.student.gender = this.informationForm.value.gender;
      this.student.phonenumber = this.informationForm.value.phoneNumber;
      this.student.role = 'ROLE_STUDENT';
      this.student.status = true;
      this.student.ward = this.informationForm.value.ward;
      this.student.rating = 0;
      this.student.lastLogin = new Date();
      this.student.learntCourseNumber = 0;
      var imgUrl = '';
      var email = '';
      if (this.socialLogin) {
        email = this.student.email as string;
        this.student.image = email.substring(0, email.indexOf('@')) + '.jpg';
        imgUrl =
          'https://ui-avatars.com/api/?size=75&name=' + this.student.fullName;
        this.student.otpRequestTime = new Date();

        this.studentService.insertStudent(this.student).subscribe((res) => {
          this.socialAuthService.signOut();
        });
      } else {
        email = this.loginForm.value.email;
        this.student.image = email.substring(0, email.indexOf('@')) + '.jpg';
        imgUrl =
          'https://ui-avatars.com/api/?size=75&name=' +
          this.informationForm.value.fullName;
        this.student.fullName = this.informationForm.value.fullName;
        this.student.password = this.loginForm.value.password;
      }
      fetch(imgUrl)
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          let objectURL = URL.createObjectURL(blob);
          let myImage = new Image();
          myImage.src = objectURL;
          var file = new File(
            [blob],
            email.substring(0, email.indexOf('@')) + '.jpg'
          );
          this.uploadFileService.uploadFile(file).subscribe((res) => {});
        });
      this.studentService.getByEmail(this.email).subscribe((res: any) => {
        this.student.studentId = res.studentId;
        this.studentService
          .updateStudent(this.student)
          .subscribe((res: any) => {
            sessionStorage.setItem('loginUser', JSON.stringify(this.student));
          });
      });
    }
  }

  cityData: City[] = [];
  city: City = {};
  districtData: District[] = [];
  wardName: string = '';
  wardData: Ward[] = [];
  student: Student = {};
  cityName: string = '';
  districtName: string = '';
  fullName: string = '';
  socialLogin: Boolean = false;
  socialEmailError: Boolean = false;
  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.socialLogin = true;
      this.studentService.getByEmail(this.user.email).subscribe((res) => {
        if (res != null && res.password === null) {
          this.socialAuthService.signOut();
          res.lastLogin = new Date();
          var student: Student = res;
          this.studentService.updateStudent(res).subscribe((res) => {
            sessionStorage.setItem('loginUser', JSON.stringify(student));
            this.router.navigate(['/dashboard-student/home']);
          });
        } else {
          this.email = this.user.email;
          this.fullName = this.user.name;
          this.student.email = this.email;
          this.student.fullName = this.fullName;
          this.informationForm.patchValue({
            fullName: this.fullName,
          });
          this.studentService
            .checkEmail(this.student.email)
            .subscribe((res) => {
              if (!res) {
                this.socialEmailError = true;
                this.informationForm.disable();
              }
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
      this.studentService.getByEmail(this.user.email).subscribe((res) => {
        if (res != null && res.password === null) {
          this.socialAuthService.signOut();
          res.lastLogin = new Date();
          var student: Student = res;
          this.studentService.updateStudent(res).subscribe((res) => {
            sessionStorage.setItem('loginUser', JSON.stringify(student));
          });
          this.router.navigate(['/dashboard-student/home']);
        } else {
          this.email = this.user.email;
          this.fullName = this.user.name;
          this.student.email = this.email;
          this.student.fullName = this.fullName;
          this.informationForm.patchValue({
            fullName: this.fullName,
          });
          this.studentService
            .checkEmail(this.student.email)
            .subscribe((res) => {
              if (!res) {
                this.socialEmailError = true;
                this.informationForm.disable();
              }
            });
        }
      });
    });
  }
  cancel() {
    Swal.fire({
      title: 'Hủy đăng ký tài khoản này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.getByEmail(this.email).subscribe((res) => {
          this.studentService
            .deleteStudent(res.studentId as number)
            .subscribe((res) => {});
        });
        Swal.fire('Xóa thành công!', 'Quá trình đăng ký đã bị hủy.', 'success');
        this.router.navigate(['/user/register']);
      }
    });
  }
  goToDashboard() {
    this.router.navigate(['/dashboard-student/home']);
  }
  ngOnInit(): void {
    this.cityData = this.addressService.getAllCities();
    // this.socialAuthService.signOut();
  }
}
