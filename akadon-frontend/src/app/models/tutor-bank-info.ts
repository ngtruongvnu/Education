import { Bank } from './bank';
import { Tutor } from './tutor';

export class TutorBankInfo {
  tutorBankId?: number;
  accountNumber?: string;
  surplus?: string;
  defaultBank?: boolean;
  objTutor?: Tutor;
  objBank?: Bank;
}
