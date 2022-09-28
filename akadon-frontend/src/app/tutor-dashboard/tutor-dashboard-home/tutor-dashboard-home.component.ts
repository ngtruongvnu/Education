import { Component, OnInit } from '@angular/core';
import { StudentRequest } from 'src/app/models/student-request';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-tutor-dashboard-home',
  templateUrl: './tutor-dashboard-home.component.html',
  styleUrls: ['./tutor-dashboard-home.component.css'],
})
export class TutorDashboardHomeComponent implements OnInit {
  constructor(private tutorService: TutorService) {}
  public loginUser = JSON.parse(sessionStorage.getItem('loginUser') as string);
  listStudentRequest: StudentRequest[] = [];
  ngOnInit(): void {
    var query: string =
      'SR.levelId = TD.levelId and SR.subjectId = TD.subjectId and TD.tutorId=' +
      this.loginUser.tutorId;
    this.tutorService
      .getStudentRequestForTutor(query, 1, 5)
      .subscribe((res) => {
        this.listStudentRequest = res;
      });
  }
}
