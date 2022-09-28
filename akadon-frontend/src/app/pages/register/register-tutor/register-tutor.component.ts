import { TutorDetail } from './../../../models/tutor-detail';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormArray,
} from '@angular/forms';
import { City } from 'src/app/models/city';
import { District } from 'src/app/models/district';
import { Tutor } from 'src/app/models/tutor';
import { Ward } from 'src/app/models/ward';
import { AddressService } from 'src/app/services/address.service';
import { TutorService } from 'src/app/services/tutor.service';
import {
  CityCheck,
  DistrictCheck,
  WardCheck,
  GenderCheck,
  TutorCodeCheck,
  TutorCodeCheckTimeOut,
} from '../../../validator';
import {
  CodeCheck,
  CodeCheckTimeOut,
  TutorEmailCheck,
  TutorPhoneNumberCheck,
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
import { SubjectCheck, LevelCheck } from '../../../validator';
import { Subject } from 'src/app/models/subject';
import { Level } from 'src/app/models/level';
import { LevelService } from 'src/app/services/level.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { TutorDetailService } from 'src/app/services/tutor-detail.service';
declare var $: any;
@Component({
  selector: 'app-register-tutor',
  templateUrl: './register-tutor.component.html',
  styleUrls: ['./register-tutor.component.css'],
})
export class RegisterTutorComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private tutorService: TutorService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private subjectService: SubjectService,
    private levelService: LevelService,
    private uploadFileService: UploadFileService,
    private tutorDetailService: TutorDetailService
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
        TutorEmailCheck('email', this.tutorService),
      ],
    }
  );

  verifyForm = this.fb.group(
    {
      code: ['', [Validators.required]],
    },
    {
      validator: [
        TutorCodeCheck('code', this.tutorService),
        TutorCodeCheckTimeOut('code', this.tutorService),
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
        TutorPhoneNumberCheck('phoneNumber', this.tutorService),
        CityCheck('city'),
        DistrictCheck('district'),
        WardCheck('ward'),
        GenderCheck('gender'),
      ],
    }
  );

  detailForm = this.fb.group({
    details: this.fb.array([]),
  });

  get details(): FormArray {
    return this.detailForm.get('details') as FormArray;
  }

  newDetail(): FormGroup {
    return this.fb.group(
      {
        subject: ['Chọn môn học', [Validators.required]],
        level: ['Chọn trình độ', [Validators.required]],
      },
      {
        validator: [SubjectCheck('subject')],
      }
    );
  }

  addDetail() {
    this.details.push(this.newDetail());
  }

  removeDetail(i: number) {
    this.details.removeAt(i);
  }

  get f() {
    return this.loginForm.controls;
  }

  get v() {
    return this.verifyForm.controls;
  }

  get i() {
    return this.informationForm.controls;
  }

  get d() {
    return this.detailForm.controls;
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
      this.Tutor.email = this.email;
      this.Tutor.password = this.loginForm.value.password;
      sessionStorage.setItem('email', this.email);
      this.tutorService.insertTutor(this.Tutor).subscribe((res: any) => {
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
    this.tutorService.sendCode(this.email).subscribe((res) => {
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
      this.subjectService.getAll().subscribe((res) => {
        this.subjectData = res;
      });
      this.levelService.getAll().subscribe((res) => {
        this.levelData = res;
      });
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
      this.Tutor.behaviorPoint = 50;
      this.Tutor.birthday = this.informationForm.value.birthday;
      this.Tutor.city = this.cityName;
      this.Tutor.district = this.districtName;
      this.Tutor.gender = this.informationForm.value.gender;
      this.Tutor.phonenumber = this.informationForm.value.phoneNumber;
      this.Tutor.role = 'ROLE_TUTOR';
      this.Tutor.status = true;
      this.Tutor.ward = this.informationForm.value.ward;
      this.Tutor.rating = 0;
      this.Tutor.lastLogin = new Date();
      this.Tutor.taughtCourseNumber = 0;
      this.Tutor.taughtStudentNumber = 0;
      var imgUrl = '';
      var email = '';
      if (this.socialLogin) {
        email = this.Tutor.email as string;
        this.Tutor.image = email.substring(0, email.indexOf('@')) + '.jpg';
        imgUrl =
          'https://ui-avatars.com/api/?size=75&name=' + this.Tutor.fullName;
        this.Tutor.otpRequestTime = new Date();
        this.tutorService.insertTutor(this.Tutor).subscribe((res) => {
          this.Tutor = res;
          this.socialAuthService.signOut();
          sessionStorage.setItem('loginUser', JSON.stringify(res));
        });
      } else {
        email = this.loginForm.value.email;
        this.Tutor.image = email.substring(0, email.indexOf('@')) + '.jpg';
        imgUrl =
          'https://ui-avatars.com/api/?size=75&name=' +
          this.informationForm.value.fullName;
        this.Tutor.fullName = this.informationForm.value.fullName;
        this.Tutor.password = this.loginForm.value.password;
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
      this.tutorService.getByEmail(this.email).subscribe((res: any) => {
        this.Tutor.tutorId = res.tutorId;
        this.tutorService.updateTutor(this.Tutor).subscribe((res: any) => {
          sessionStorage.setItem('loginUser', JSON.stringify(this.Tutor));
        });
      });
    }
  }

  submitDetail() {
    if (this.detailForm.valid) {
      var detail = this.detailForm.value.details;
      detail.forEach((value: any, index: number) => {
        var tutorDetail: TutorDetail = {};
        tutorDetail.objSubject = value.subject;
        tutorDetail.objTutor = this.Tutor;
        var levelList: Level[] = value.level;
        levelList.forEach((level: Level) => {
          tutorDetail.objLevel = level;
          this.tutorDetailService
            .insertTutorDetail(tutorDetail)
            .subscribe((res) => {});
        });
      });
    }
  }

  cityData: City[] = [];
  city: City = {};
  districtData: District[] = [];
  wardName: string = '';
  wardData: Ward[] = [];
  Tutor: Tutor = {};
  cityName: string = '';
  districtName: string = '';
  fullName: string = '';
  socialLogin: Boolean = false;
  socialEmailError: Boolean = false;
  subjectData: Subject[] = [];
  levelData: Level[] = [];
  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.socialLogin = true;
      this.tutorService.getByEmail(this.user.email).subscribe((res) => {
        if (res != null && res.password === null) {
          this.socialAuthService.signOut();
          res.lastLogin = new Date();
          var tutor: Tutor = res;
          this.tutorService.updateTutor(res).subscribe((res) => {
            sessionStorage.setItem('loginUser', JSON.stringify(tutor));
            this.router.navigate(['/dashboard-tutor/home']);
          });
        } else {
          this.email = this.user.email;
          this.fullName = this.user.name;
          this.Tutor.email = this.email;
          this.Tutor.fullName = this.fullName;
          this.informationForm.patchValue({
            fullName: this.fullName,
          });
          this.tutorService.checkEmail(this.Tutor.email).subscribe((res) => {
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
      this.tutorService.getByEmail(this.user.email).subscribe((res) => {
        if (res != null && res.password === null) {
          this.socialAuthService.signOut();
          res.lastLogin = new Date();
          this.tutorService.updateTutor(res).subscribe();
          sessionStorage.setItem('loginUser', JSON.stringify(res));
          this.router.navigate(['/dashboard-tutor/home']);
        } else {
          this.email = this.user.email;
          this.fullName = this.user.name;
          this.Tutor.email = this.email;
          this.Tutor.fullName = this.fullName;
          this.informationForm.patchValue({
            fullName: this.fullName,
          });
          this.tutorService.checkEmail(this.Tutor.email).subscribe((res) => {
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
        this.tutorService.getByEmail(this.email).subscribe((res) => {
          this.tutorService
            .deleteTutor(res.tutorId as number)
            .subscribe((res) => {});
        });
        Swal.fire('Xóa thành công!', 'Quá trình đăng ký đã bị hủy.', 'success');
        this.router.navigate(['/user/register']);
      }
    });
  }
  goToDashboard() {
    this.router.navigate(['/dashboard-tutor/home']);
  }
  ngOnInit(): void {
    this.cityData = this.addressService.getAllCities();
    this.subjectService.getAll().subscribe((res) => {
      this.subjectData = res;
    });
    this.levelService.getAll().subscribe((res) => {
      this.levelData = res;
    });
    this.addDetail();
    // this.socialAuthService.signOut();
  }
}
