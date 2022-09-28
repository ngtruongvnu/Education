import { ServicePackage } from './service-package';

export class Tutor {
  tutorId?: number;
  email?: string;
  password?: string;
  fullName?: string;
  gender?: Boolean;
  city?: string;
  district?: string;
  ward?: string;
  phonenumber?: string;
  birthday?: Date;
  role?: string;
  status?: Boolean;
  image?: string;
  rating?: number;
  behaviorPoint?: number;
  verificationCode?: string;
  objServicePackage?: ServicePackage;
  otpRequestTime?: Date;
  taughtStudentNumber?: number;
  taughtCourseNumber?: number;
  lastLogin?: Date;
}
