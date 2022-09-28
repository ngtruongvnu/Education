import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css'],
})
export class TutorComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

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
  submitQuestion() {
    if (!this.questionForm.valid) {
      this.showErrorPopup('Vui lòng điền đầy đủ thông tin !');
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
