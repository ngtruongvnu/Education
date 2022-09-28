import { Student } from './student';
import { Tutor } from './tutor';

export class Schedule {
  id?: number;
  subject?: String;
  startTime?: number;
  endTime?: number;
  objTutor?: Tutor;
  objStudent?: Student;
}
