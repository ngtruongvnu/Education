import { Level } from './level';
import { Student } from './student';
import { Subject } from './subject';
export class StudentRequest {
  studentRequestId?: number;
  studentRequestTitle?: string;
  costPerHour?: number;
  beginTime?: number;
  endTime?: number;
  durationPerSession?: number;
  learningDate?: string;
  studentWishes?: string;
  introduction?: string;
  testLearning?: Boolean;
  learningMethod?: Boolean;
  status?: string;
  objStudent?: Student;
  objSubject?: Subject;
  objLevel?: Level;
  createdDate?: Date;
  endDate?: Date;
  quantityTutorRequest?: number;
  payTime?: number;
}
