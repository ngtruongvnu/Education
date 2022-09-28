import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Level } from 'src/app/models/level';
import { Subject } from 'src/app/models/subject';
import { LevelService } from 'src/app/services/level.service';
import { StudentRequestService } from 'src/app/services/student-request.service';
import { SubjectService } from 'src/app/services/subject.service';
import { StudentRequest } from '../../models/student-request';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
declare var $: any;
@Component({
  selector: 'app-student-dashboard-request',
  templateUrl: './student-dashboard-request.component.html',
  styleUrls: ['./student-dashboard-request.component.css'],
})
export class StudentDashboardRequestComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}
}
