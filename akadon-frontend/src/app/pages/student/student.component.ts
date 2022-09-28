import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserQuestion } from 'src/app/models/user-question';
import { UserQuestionService } from '../../services/user-question.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userQuestionService: UserQuestionService
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
  questionForm = this.fb.group({
    fullname: ['', [Validators.required]],
    phonenumber: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    content: ['', [Validators.required]],
  });
  get f() {
    return this.questionForm.controls;
  }
  isLoading: Boolean = false;
  submitQuestion() {
    if (!this.questionForm.valid) {
      this.showErrorPopup('Vui lòng điền đầy đủ thông tin !');
    } else {
      var userQuestion: UserQuestion = {};
      userQuestion.fullName = this.questionForm.value.fullname;
      userQuestion.sendEmail = this.questionForm.value.email;
      userQuestion.askDate = new Date();
      userQuestion.content = this.questionForm.value.content;
      userQuestion.phoneNumber = this.questionForm.value.phonenumber;
      userQuestion.seen = false;
      this.isLoading = true;
      $('mask').blurjs({
        customClass: 'blurjs',
        radius: 5,
        persist: false,
      });
      this.userQuestionService.sendQuestion(userQuestion).subscribe((res) => {
        this.isLoading = false;
        this.questionForm.reset();
        $.blurjs('reset');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Câu hỏi của bạn đã được gửi !',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  }
  ngOnInit(): void {
    $(document).ready(function () {
      $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        responsiveClass: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
            nav: true,
          },
          600: {
            items: 3,
            nav: false,
          },
          1000: {
            items: 5,
            nav: true,
            loop: false,
          },
        },
        navText: [
          '<i class="fas fa-angle-left previous"></i>',
          '<i class="fas fa-angle-right next"></i>',
        ],
      });
    });
  }
}
