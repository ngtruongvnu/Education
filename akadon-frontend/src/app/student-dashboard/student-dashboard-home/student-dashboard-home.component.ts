import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subject } from 'src/app/models/subject';
import { Tutor } from 'src/app/models/tutor';
import { SubjectService } from 'src/app/services/subject.service';
import { TutorService } from '../../services/tutor.service';
declare var $: any;
@Component({
  selector: 'app-student-dashboard-home',
  templateUrl: './student-dashboard-home.component.html',
  styleUrls: ['./student-dashboard-home.component.css'],
})
export class StudentDashboardHomeComponent implements OnInit {
  constructor(
    private subjectService: SubjectService,
    private tutorService: TutorService
  ) {}
  public loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  subjectData: Subject[] = [];
  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    navSpeed: 600,
    autoplay: true,
    margin: 25,
    navText: [
      '<i class="fas fa-angle-left previous"></i>',
      '<i class="fas fa-angle-right next"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
    nav: true,
  };
  listTutor: Tutor[] = [];
  featuredTutor: OwlOptions = {
    loop: true,
    dots: false,
    navSpeed: 600,
    autoplay: true,
    margin: 30,
    navText: [
      '<i class="fas fa-angle-left previous"></i>',
      '<i class="fas fa-angle-right next"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this.subjectService.getAll().subscribe((res) => {
      this.subjectData = res;
    });
    this.tutorService.getFeaturedTutors(1, 10).subscribe((res) => {
      this.listTutor = res;
    });
  }
}
