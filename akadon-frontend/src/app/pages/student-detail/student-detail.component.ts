import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review';
import { Student } from 'src/app/models/student';
import { ReviewService } from 'src/app/services/review.service';
import { StudentService } from 'src/app/services/student.service';
declare var $: any;
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
})
export class StudentDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private reviewService: ReviewService
  ) {}
  Student: Student = {};
  StudentId: number = 0;
  rotate = '';
  point: number = 0;
  average: number = 0;
  oneStarReview: number = 0;
  twoStarReview: number = 0;
  threeStarReview: number = 0;
  fourStarReview: number = 0;
  fiveStarReview: number = 0;
  allReview: number = 0;
  ngOnInit(): void {
    this.StudentId = this.route.snapshot.params['id'];
    this.studentService.getById(this.StudentId).subscribe((res) => {
      this.Student = res;
      this.point = this.Student?.behaviorPoint as number;
      if (this.point >= 50) {
        this.rotate =
          'translate(-50%, -50%) rotate(' + (this.point - 50) * 2 + 'deg)';
      } else {
        this.rotate =
          'translate(-50%, -50%) rotate(' +
          (Math.abs(this.point) * 2 - 100) +
          'deg)';
      }
      this.reviewService
        .getCommentByEmailAndRate(this.Student.email as string, 6)
        .subscribe((res) => {
          this.listReview = res;
        });
      this.reviewService
        .getAverageRate(this.Student.email as string)
        .subscribe((res) => {
          if (res != null) {
            this.average = res;
          }
        });
      this.reviewService
        .getCommentByEmailAndRate(this.Student.email as string, 6)
        .subscribe((res) => {
          this.listReview = res;
          this.allReview = res.length;
        });
      this.reviewService
        .getCommentByEmailAndRate(this.Student.email as string, 5)
        .subscribe((res) => {
          this.fiveStarReview = res.length;
        });
      this.reviewService
        .getCommentByEmailAndRate(this.Student.email as string, 4)
        .subscribe((res) => {
          this.fourStarReview = res.length;
        });
      this.reviewService
        .getCommentByEmailAndRate(this.Student.email as string, 3)
        .subscribe((res) => {
          this.threeStarReview = res.length;
        });
      this.reviewService
        .getCommentByEmailAndRate(this.Student.email as string, 2)
        .subscribe((res) => {
          this.twoStarReview = res.length;
        });
      this.reviewService
        .getCommentByEmailAndRate(this.Student.email as string, 1)
        .subscribe((res) => {
          this.oneStarReview = res.length;
        });
    });
  }

  listReview: Review[] = [];
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
    this.reviewService
      .getCommentByEmailAndRate(this.Student.email as string, rate)
      .subscribe((res) => {
        setTimeout(() => {
          this.listReview = res;
          this.isLoading = false;
        }, 500);
      });
  }
}
