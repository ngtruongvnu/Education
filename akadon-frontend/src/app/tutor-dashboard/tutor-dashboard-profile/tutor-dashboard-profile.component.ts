import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { CertificateType } from 'src/app/models/certificate-type';
import { City } from 'src/app/models/city';
import { District } from 'src/app/models/district';
import { Level } from 'src/app/models/level';
import { Review } from 'src/app/models/review';
import { Subject } from 'src/app/models/subject';
import { Tutor } from 'src/app/models/tutor';
import { TutorDetail } from 'src/app/models/tutor-detail';
import { VerifycateImage } from 'src/app/models/verifycate-image';
import { Ward } from 'src/app/models/ward';
import { AddressService } from 'src/app/services/address.service';
import { LevelService } from 'src/app/services/level.service';
import { ReviewService } from 'src/app/services/review.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TutorDetailService } from 'src/app/services/tutor-detail.service';
import { TutorService } from 'src/app/services/tutor.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { VerifycateImageService } from 'src/app/services/verifycate-image.service';
import {
  TutorPhoneNumberCheck,
  CityCheck,
  DistrictCheck,
  WardCheck,
  GenderCheck,
  TutorEmailCheck,
  EditTutorEmailCheck,
  EditTutorPhoneNumberCheck,
  SubjectCheck,
  TutorCodeCheck,
  TutorCodeCheckTimeOut,
} from 'src/app/validator';
import CertificateTypeData from '../../../../certificateType.json';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-tutor-dashboard-profile',
  templateUrl: './tutor-dashboard-profile.component.html',
  styleUrls: ['./tutor-dashboard-profile.component.css'],
})
export class TutorDashboardProfileComponent implements OnInit {
  constructor(
    private tutorDetailService: TutorDetailService,
    private tutorService: TutorService,
    private fb: FormBuilder,
    private addressService: AddressService,
    private subjectService: SubjectService,
    private levelService: LevelService,
    private uploadFileService: UploadFileService,
    private verifyService: VerifycateImageService,
    private reviewService: ReviewService
  ) {}
  loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  msg: any;
  url: any;

  infoEditForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
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
        EditTutorPhoneNumberCheck(
          'phoneNumber',
          this.tutorService,
          this.loginUser.phonenumber
        ),
        CityCheck('city'),
        DistrictCheck('district'),
        WardCheck('ward'),
        GenderCheck('gender'),
      ],
    }
  );

  certificateForm = this.fb.group({
    verifycateType: ['Chọn thành tích', Validators.required],
    verifyImage: ['', Validators.required],
    verifyValue: ['', Validators.required],
    verifyYear: ['', Validators.required],
  });

  get c() {
    return this.certificateForm.controls;
  }

  get i() {
    return this.infoEditForm.controls;
  }
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

  get d() {
    return this.detailForm.controls;
  }

  submitDetail() {
    if (this.detailForm.valid) {
      var detail = this.detailForm.value.details;
      detail.forEach((value: any, index: number) => {
        var tutorDetail: TutorDetail = {};
        tutorDetail.objSubject = value.subject;
        tutorDetail.objTutor = this.tutor;
        var levelList: Level[] = value.level;
        levelList.forEach((level: Level) => {
          tutorDetail.objLevel = level;
          this.tutorDetailService
            .insertTutorDetail(tutorDetail)
            .subscribe((res) => {
              Swal.fire(
                'Thành công!',
                'Thông tin của bạn đã được thay đổi!',
                'success'
              );
              this.tutorDetailService
                .getAllById(this.loginUser.tutorId)
                .subscribe((res) => {
                  this.detailAll = res;
                });
              this.tutorDetailService
                .getById(this.loginUser.tutorId, 1, 5)
                .subscribe((res) => {
                  this.listTutorDetail = res;
                });
              this.detailForm.reset();
            });
        });
      });
    }
  }

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
  isAvatarLoading: boolean = false;
  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      this.showErrorPopup('Vui lòng chọn định dạng ảnh !');
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
    this.isAvatarLoading = true;
    var file = new File([event.target.files[0]], this.loginUser.image);
    this.uploadFileService.uploadFile(file).subscribe((res) => {
      setTimeout(() => {
        this.isAvatarLoading = false;
        $('.account-image').attr(
          'src',
          'http://localhost:8888/upload/images/' + this.tutor.image
        );
      }, 500);
    });
  }
  isCertificateLoading: boolean = false;
  imageSrc: string = '';
  certificateImage: string = '';
  certificateFile!: File;
  selectCertificate(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      var email = this.loginUser.email;
      email = email.substring(0, email.indexOf('@'));
      let r = (Math.random() + 1).toString(36).substring(7);
      var certificateFile = new File(
        [file],
        email + '-certificate-' + r + '.jpg'
      );
      this.certificateFile = certificateFile;
      this.certificateImage = email + '-certificate-' + r + '.jpg';
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.certificateForm.patchValue({
          verifyImage: certificateFile,
        });
      };
    }
  }
  tutor: Tutor = this.loginUser;
  updateInfo() {
    var fullName = this.infoEditForm.value.fullName;
    var birthday = $("input[name='birthday']").val();
    var gender = this.infoEditForm.value.gender;
    this.tutor.city = this.cityName;
    this.tutor.district = this.districtName;
    this.tutor.ward = this.infoEditForm.value.ward;
    this.tutor.gender = this.infoEditForm.value.gender;
    var dob = moment(birthday, 'DD/MM/YYYY').toDate();
    this.tutor.fullName = fullName;
    this.tutor.birthday = dob;
    this.tutor.phonenumber = this.infoEditForm.value.phoneNumber;
    this.tutor.gender = this.infoEditForm.value.gender;
    this.tutorService.updateTutor(this.tutor).subscribe((res) => {
      if (res === 'Thành công') {
        sessionStorage.setItem('loginUser', JSON.stringify(this.tutor));
        this.loginUser = JSON.parse(
          sessionStorage.getItem('loginUser') as string
        );
        Swal.fire(
          'Thành công!',
          'Thông tin của bạn đã được thay đổi!',
          'success'
        );
        this.infoEditForm.reset();
      }
    });
  }
  resend: Boolean = false;
  config: any;
  timeOut: boolean = false;
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

  rotate = '';
  listTutorDetail: TutorDetail[] = [];
  cityData: City[] = [];
  city: City = {};
  districtData: District[] = [];
  wardName: string = '';
  wardData: Ward[] = [];
  Tutor: Tutor = {};
  cityName: string = '';
  districtName: string = '';
  subjectData: Subject[] = [];
  levelData: Level[] = [];
  detailAll: TutorDetail[] = [];
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

  deleteDetail(tutorDetail: TutorDetail) {
    this.tutorDetailService
      .deleteTutorDetail(tutorDetail.tutorDetailId as number)
      .subscribe((res) => {
        if (res != 'Thành công') {
          Swal.fire({
            icon: 'error',
            title: 'Xóa thất bại',
            text: res as string,
          });
        } else {
          this.tutorDetailService
            .getAllById(this.loginUser.tutorId)
            .subscribe((res) => {
              this.detailAll = res;
            });
          this.tutorDetailService
            .getById(this.loginUser.tutorId, 1, 5)
            .subscribe((res) => {
              this.listTutorDetail = res;
            });
        }
      });
  }
  listCertificate: VerifycateImage[] = [];
  certificateDetail: VerifycateImage = {};
  viewDetail(verifycate: VerifycateImage) {
    this.certificateDetail = verifycate;
  }
  deleteCertificate(verifycate: VerifycateImage) {
    Swal.fire({
      title: 'Xóa chứng chỉ này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.verifyService
          .deleteVerifycateImage(verifycate.verifycateImageId as number)
          .subscribe((res) => {
            this.verifyService
              .getVerifycateImageByTutorId(this.loginUser.tutorId)
              .subscribe((res) => {
                this.listCertificate = res;
              });
            Swal.fire('Xóa thành công!', 'success');
          });
      }
    });
  }
  lastId: string = 'all-comments';
  isCommentLoading: boolean = false;
  chooseComment(event: any) {
    var id = event.currentTarget.id;
    $('#' + this.lastId).removeClass('active');
    $('#' + id).addClass('active');
    this.lastId = id;
    var rate = 6;
    if (id != 'all-comments') {
      rate = parseInt(id.charAt(0));
    }
    this.isCommentLoading = true;
    this.reviewService
      .getCommentByEmailAndRate(this.tutor.email as string, rate)
      .subscribe((res) => {
        setTimeout(() => {
          this.listReview = res;
          this.isCommentLoading = false;
        }, 500);
      });
  }

  certificateType: CertificateType[] = [];
  type1: boolean = false;
  type2: boolean = false;
  type3: boolean = false;
  chooseType(event: any) {
    var id = event.target.value;
    if (id < 4) {
      this.type1 = true;
      this.type2 = false;
      this.type3 = false;
      this.certificateForm.patchValue({
        verifyValue: 'Loại',
        verifyYear: 'null',
      });
    } else if (id < 17) {
      this.type2 = true;
      this.type1 = false;
      this.type3 = false;
      this.certificateForm.patchValue({
        verifyValue: '',
      });
    } else {
      this.type3 = true;
      this.type2 = false;
      this.type1 = false;
      this.certificateForm.patchValue({
        verifyValue: 'Chọn kết quả',
      });
    }
  }
  addVerificate() {
    var verificateImage: VerifycateImage = {};
    verificateImage.verifycateType = this.certificateType.filter(
      (c) => c.id === parseInt(this.certificateForm.value.verifycateType)
    )[0].type;
    for (let type of this.certificateType) {
      if (type.id === this.certificateForm.value.verifycateType) {
        verificateImage.verifycateType = type.type;
        break;
      }
    }
    verificateImage.verifyValue = this.certificateForm.value.verifyValue;
    verificateImage.verifyYear = this.certificateForm.value.verifyYear;
    verificateImage.verifyImage = this.certificateImage;
    verificateImage.objTutor = this.tutor;
    this.verifyService
      .insertVerifycateImage(verificateImage)
      .subscribe((res) => {
        this.uploadFileService
          .uploadFile(this.certificateFile)
          .subscribe((res) => {
            Swal.fire(
              'Thành công!',
              'Chứng chỉ của bạn đã được thêm!',
              'success'
            );
            this.verifyService
              .getVerifycateImageByTutorId(this.loginUser.tutorId)
              .subscribe((res) => {
                this.listCertificate = res;
              });
          });
        this.verifyForm.reset();
      });
  }
  listReview: Review[] = [];
  average: number = 0;
  oneStarReview: number = 0;
  twoStarReview: number = 0;
  threeStarReview: number = 0;
  fourStarReview: number = 0;
  fiveStarReview: number = 0;
  allReview: number = 0;
  ngOnInit(): void {
    this.certificateType = CertificateTypeData.certificateType;
    this.cityData = this.addressService.getAllCities();
    var cityId: any;
    for (let city of this.cityData) {
      if (city.Name?.toLowerCase() === this.loginUser.city.toLowerCase()) {
        cityId = city.id;
        this.city = city;
        this.cityName = city.Name as string;
        break;
      }
    }
    this.districtData = this.city.Districts as District[];
    var districtId: any;
    for (let district of this.districtData) {
      if (
        district.Name?.toLowerCase() === this.loginUser.district.toLowerCase()
      ) {
        districtId = district.id;
        this.wardData = district.Wards as Ward[];
        this.districtName = district.Name as string;
        break;
      }
    }
    var wardName: any;
    for (let ward of this.wardData) {
      if (ward.Name?.toLowerCase() === this.loginUser.ward.toLowerCase()) {
        wardName = ward.Name;
        break;
      }
    }
    this.infoEditForm.patchValue({
      fullName: this.loginUser.fullName,
      birthday: this.loginUser.birthday,
      email: this.loginUser.email,
      gender: this.loginUser.gender,
      phoneNumber: this.loginUser.phonenumber,
      city: cityId,
      district: districtId,
      ward: wardName,
    });
    this.tutorDetailService
      .getById(this.loginUser.tutorId, 1, 5)
      .subscribe((res) => {
        this.listTutorDetail = res;
      });
    this.tutorDetailService
      .getAllById(this.loginUser.tutorId)
      .subscribe((res) => {
        this.detailAll = res;
      });
    this.subjectService.getAll().subscribe((res) => {
      this.subjectData = res;
    });
    this.levelService.getAll().subscribe((res) => {
      this.levelData = res;
    });
    this.addDetail();
    this.verifyService
      .getVerifycateImageByTutorId(this.loginUser.tutorId)
      .subscribe((res) => {
        this.listCertificate = res;
      });
    if (this.loginUser.behaviorPoint >= 50) {
      this.rotate =
        'translate(-50%, -50%) rotate(' +
        (this.loginUser.behaviorPoint - 50) * 2 +
        'deg)';
    } else {
      this.rotate =
        'translate(-50%, -50%) rotate(' +
        (Math.abs(this.loginUser.behaviorPoint) * 2 - 100) +
        'deg)';
    }
    var birthday = new Date(this.loginUser.birthday);
    var dob =
      birthday.getDate() +
      '/' +
      (birthday.getMonth() + 1) +
      '/' +
      birthday.getFullYear();
    $('#birthday')
      .datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
      })
      .datepicker('setDate', dob);
    $('#gender').val(this.loginUser.gender.toString());
    $('.round').css('transform', 'rotate(0 deg)');
    this.reviewService
      .getCommentByEmailAndRate(this.loginUser.email as string, 6)
      .subscribe((res) => {
        this.listReview = res;
      });
    this.reviewService
      .getAverageRate(this.loginUser.email as string)
      .subscribe((res) => {
        this.average = res;
      });
    this.reviewService
      .getCommentByEmailAndRate(this.loginUser.email as string, 6)
      .subscribe((res) => {
        this.listReview = res;
        this.allReview = res.length;
      });
    this.reviewService
      .getCommentByEmailAndRate(this.loginUser.email as string, 5)
      .subscribe((res) => {
        this.fiveStarReview = res.length;
      });
    this.reviewService
      .getCommentByEmailAndRate(this.loginUser.email as string, 4)
      .subscribe((res) => {
        this.fourStarReview = res.length;
      });
    this.reviewService
      .getCommentByEmailAndRate(this.loginUser.email as string, 3)
      .subscribe((res) => {
        this.threeStarReview = res.length;
      });
    this.reviewService
      .getCommentByEmailAndRate(this.loginUser.email as string, 2)
      .subscribe((res) => {
        this.twoStarReview = res.length;
      });
    this.reviewService
      .getCommentByEmailAndRate(this.loginUser.email as string, 1)
      .subscribe((res) => {
        this.oneStarReview = res.length;
      });
  }
}
