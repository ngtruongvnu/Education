import { Bank } from './bank';
import { Student } from './student';
export class StudentBankInfo {
  studentBankId?: number;
  accountNumber?: string;
  surplus?: number;
  defaultBank?: boolean;
  objStudent?: Student;
  objBank?: Bank;
}
