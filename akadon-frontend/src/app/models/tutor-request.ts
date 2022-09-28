import { StudentRequest } from './student-request';
import { Tutor } from './tutor';
export class TutorRequest {
  tutorRequestId?: number;
  objTutor?: Tutor;
  objStudentRequest?: StudentRequest;
  receiveDate?: Date;
  requestType?: String;
  status?: string;
  testDate?: number;
}
