import { StudentRequest } from './student-request';
import { TutorRequest } from './tutor-request';
export class Course {
  courseId?: number;
  startTime?: number;
  startDate?: Date;
  endTime?: number;
  endDate?: Date;
  studyDate?: string;
  status?: string;
  objStudentRequest?: StudentRequest;
  objTutorRequest?: TutorRequest;
  createdDate?: Date;
  courseName?: string;
  paymentStatus?: Boolean;
}
