import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { TutorDetailService } from 'src/app/services/tutor-detail.service';
import { TutorService } from 'src/app/services/tutor.service';
import { VerifycateImageService } from 'src/app/services/verifycate-image.service';
import { Tutor } from '../../models/tutor';
import { TutorDetail } from '../../models/tutor-detail';
import { VerifycateImage } from '../../models/verifycate-image';
declare var $: any;
@Component({
  selector: 'app-tutor-detail',
  templateUrl: './tutor-detail.component.html',
  styleUrls: ['./tutor-detail.component.css'],
})
export class TutorDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private tutorService: TutorService,
    private tutorDetailService: TutorDetailService,
    private verifyService: VerifycateImageService,
    private reviewService: ReviewService
  ) {}
  tutor: Tutor = {};
  listTutorDetail: TutorDetail[] = [];
  listCertificate: VerifycateImage[] = [];
  certificateDetail: VerifycateImage = {};
  tutorId: number = 0;
  detailAll: TutorDetail[] = [];
  rotate = '';
  point: number = 0;
  listReview: Review[] = [];
  average: number = 0;
  oneStarReview: number = 0;
  twoStarReview: number = 0;
  threeStarReview: number = 0;
  fourStarReview: number = 0;
  fiveStarReview: number = 0;
  allReview: number = 0;
  ngOnInit(): void {
    this.tutorId = this.route.snapshot.params['id'];
    this.tutorService.getById(this.tutorId).subscribe((res) => {
      this.tutor = res;
      this.point = this.tutor?.behaviorPoint as number;
      if (this.point >= 50) {
        this.rotate =
          'translate(-50%, -50%) rotate(' + (this.point - 50) * 2 + 'deg)';
      } else {
        this.rotate =
          'translate(-50%, -50%) rotate(' +
          (Math.abs(this.point) * 2 - 100) +
          'deg)';
      }
    });
    this.tutorDetailService.getById(this.tutorId, 1, 5).subscribe((res) => {
      this.listTutorDetail = res;
    });
    this.tutorDetailService.getAllById(this.tutorId).subscribe((res) => {
      this.detailAll = res;
    });
    this.tutorService.getById(this.tutorId).subscribe((res) => {
      this.tutor = res;
      this.reviewService
        .getCommentByEmailAndRate(this.tutor.email as string, 6)
        .subscribe((res) => {
          this.listReview = res;
        });
      this.reviewService
        .getAverageRate(this.tutor.email as string)
        .subscribe((res) => {
          if (res != null) {
            this.average = res;
          }
        });
      this.reviewService
        .getCommentByEmailAndRate(this.tutor.email as string, 6)
        .subscribe((res) => {
          this.listReview = res;
          this.allReview = res.length;
        });
      this.reviewService
        .getCommentByEmailAndRate(this.tutor.email as string, 5)
        .subscribe((res) => {
          this.fiveStarReview = res.length;
        });
      this.reviewService
        .getCommentByEmailAndRate(this.tutor.email as string, 4)
        .subscribe((res) => {
          this.fourStarReview = res.length;
        });
      this.reviewService
        .getCommentByEmailAndRate(this.tutor.email as string, 3)
        .subscribe((res) => {
          this.threeStarReview = res.length;
        });
      this.reviewService
        .getCommentByEmailAndRate(this.tutor.email as string, 2)
        .subscribe((res) => {
          this.twoStarReview = res.length;
        });
      this.reviewService
        .getCommentByEmailAndRate(this.tutor.email as string, 1)
        .subscribe((res) => {
          this.oneStarReview = res.length;
        });
    });
    this.verifyService
      .getVerifycateImageByTutorId(this.tutorId)
      .subscribe((res) => {
        this.listCertificate = res;
      });
  }
  viewDetail(verifycate: VerifycateImage) {
    this.certificateDetail = verifycate;
  }
  listComment: Review[] = [];
  lastId: string = 'all-comments';
  isLoading: boolean = false;
  chooseComment(event: any) {
    var id = event.currentTarget.id;
    $('#' + this.lastId).removeClass('active');
    $('#' + id).addClass('active');
    this.lastId = id;
    var rate = 6;
    if (id != 'all-comments') {
      rate = parseInt(id.charAt(0));
    }
    this.isLoading = true;
    this.tutorService.getById(this.tutorId).subscribe((res) => {
      this.tutor = res;
      this.reviewService
        .getCommentByEmailAndRate(this.tutor.email as string, rate)
        .subscribe((res) => {
          setTimeout(() => {
            this.listReview = res;
            this.isLoading = false;
          }, 500);
        });
    });
  }
}
