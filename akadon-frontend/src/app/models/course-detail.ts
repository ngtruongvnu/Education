import { Course } from './course';

export class CourseDetail {
  courseDetailId?: number;
  activeDate?: Date;
  tutorComment?: string;
  studentComment?: string;
  teacherRate?: number;
  studentRate?: number;
  objCourse?: Course;
  status?: boolean;
  payRequest?: boolean;
  tutorPay?: boolean;
}
