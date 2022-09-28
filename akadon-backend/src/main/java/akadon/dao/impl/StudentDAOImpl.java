package akadon.dao.impl;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import akadon.EncrytedPasswordUtils;
import akadon.dao.StudentDAO;
import akadon.entities.Student;
import akadon.entities.UserQuestion;
import net.bytebuddy.utility.RandomString;

@Repository
public class StudentDAOImpl implements StudentDAO {

	@Autowired
	SessionFactory sessionFactory;
	@Autowired
	JavaMailSender mailSender;

	@Override
	public List<Student> getAllStudents(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Student").setFirstResult(offset).setMaxResults(maxResult).list();
			session.getTransaction().commit();
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}

		return null;
	}

	@Override
	public List<Student> filterStudent(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Student where " + query).setFirstResult(offset)
					.setMaxResults(maxResult).list();
			session.getTransaction().commit();
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public Student getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Student Student = session.get(Student.class, id);
			session.getTransaction().commit();
			return Student;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public Student insertStudent(Student Student) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			if (Student.getPassword()!=null) {
				Student.setPassword(EncrytedPasswordUtils.encrytePassword(Student.getPassword()));
				String OTP = sendCode(Student.getEmail());
				Student.setVerificationCode(OTP);
				Student.setOtpRequestTime(new Date());
			}
			session.save(Student);
			session.getTransaction().commit();
			return Student;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}
	
	@Override
	public String updateStudent(Student Student) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Student currentStudent = session.get(Student.class, Student.getStudentId());
			if (result.length() == 0) {
				if (Student.getPassword()!=null && (!currentStudent.getPassword().trim().equals(Student.getPassword().trim()))) {
					Student.setPassword(EncrytedPasswordUtils.encrytePassword(Student.getPassword()));
					String OTP = sendCode(Student.getEmail());
					Student.setVerificationCode(OTP);
					Student.setOtpRequestTime(new Date());
				}
				session.merge(Student);
				session.getTransaction().commit();
				return "Thành công";
			} else {
				session.getTransaction().rollback();
				return result;
			}

		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public String deleteStudent(Integer StudentId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Student s = getById(StudentId);
			Integer check = session.createQuery("From StudentRequest where studentId =:studentId")
					.setParameter("studentId", s.getStudentId()).list().size();
			/* session.getTransaction().commit(); */
			if (check > 0) {
				return "Không thể xóa ! Học sinh này đang hoạt động";
			} else {
				session.delete(getById(StudentId));
				session.getTransaction().commit();
				return "Thành công";
			}
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Boolean checkEmail(String email) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Integer emailCheck1 = session.createQuery("From Admin where email =:email").setParameter("email", email)
					.list().size();
			Integer emailCheck2 = session.createQuery("From Student where email =:email").setParameter("email", email)
					.list().size();
			Integer emailCheck3 = session.createQuery("From Tutor where email =:email").setParameter("email", email)
					.list().size();
			if (emailCheck1 > 0 || emailCheck2 > 0 || emailCheck3 > 0) {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}

		return true;
	}

	@Override
	public Boolean checkPhoneNumber(String phoneNumber) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Integer phoneNumberCheck1 = session.createQuery("From Admin where phonenumber =:phonenumber")
					.setParameter("phonenumber", phoneNumber).list().size();
			Integer phoneNumberCheck2 = session.createQuery("From Student where phonenumber =:phonenumber")
					.setParameter("phonenumber", phoneNumber).list().size();
			Integer phoneNumberCheck3 = session.createQuery("From Tutor where phonenumber =:phonenumber")
					.setParameter("phonenumber", phoneNumber).list().size();
			if (phoneNumberCheck1 > 0 || phoneNumberCheck2 > 0 || phoneNumberCheck3 > 0) {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}

		return true;
	}

	@Override
	public String checkVerifyCode(String code, String email) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Student s = (Student) session.createQuery("From Student where email=:email")
					.setParameter("email", email)
					.uniqueResult();
			session.getTransaction().commit();
			long currentTimeInMillis = System.currentTimeMillis();
			if (s.getOtpRequestTime().getTime() + (300 * 1000) >= currentTimeInMillis) {
				BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
				if (encoder.matches(code, s.getVerificationCode().trim())) {
					return "Correct";
				} else {
					return "Incorrect";
				}
			} else {
				s.setVerificationCode(null);
//				s.setOtpRequestTime(null);
				session.beginTransaction();
				session.update(s);
				session.getTransaction().commit();
				return "Time out";
			}
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}
	
	@Override
	public String sendCode(String email) {
		String OTP = RandomString.make(6);
		String subject = "Xác nhận địa chỉ email";
		String senderName = "Akadon Education";
		String mailContent = "<p style='font-size:24px; font-weight:400'>Mã xác nhận của: <b>" + email + "</p>";
		mailContent += "<p style='font-size:30px';color: #2ED8B6;font-weight:500'><b>" + OTP + "</p>";
		mailContent += "<p style='font-size:24px;font-weight:400'>Xin cảm ơn !<br> Akadon Education</p>";
		MimeMessage messege = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(messege);
		try {
			helper.setFrom("th0979175333@gmail.com", senderName);
			helper.setTo(email);
			helper.setSubject(subject);
			helper.setText(mailContent, true);
			mailSender.send(messege);
			Session session = sessionFactory.openSession();
			session.beginTransaction();
			Student s = (Student) session.createQuery("From Student where email=:email")
					.setParameter("email", email)
					.uniqueResult();
			if (s!=null) {
				s.setVerificationCode(EncrytedPasswordUtils.encrytePassword(OTP));
				s.setOtpRequestTime(new Date());
				session.update(s);
				session.getTransaction().commit();
				session.close();
			}
			return EncrytedPasswordUtils.encrytePassword(OTP);
		} catch (UnsupportedEncodingException | MessagingException e) {
			e.printStackTrace();
			return null;
		}

	}

	@Override
	public Student getByEmail(String email) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Student student = (Student) session.createQuery("From Student where email=:email")
			.setParameter("email", email)
			.uniqueResult();
			session.getTransaction().commit();
			return student;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public Student login(String username, String password) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Student student = new Student();
			Student studentByEmail = (Student) session.createQuery("From Student where email=:email")
			.setParameter("email", username)
			.uniqueResult();
			Student studentByPhone = (Student) session.createQuery("From Student where phonenumber=:phonenumber")
					.setParameter("phonenumber", username)
					.uniqueResult();
			if (studentByEmail != null) {
				student = studentByEmail;
			}
			if (studentByPhone != null) {
				student = studentByPhone;
			}
			session.getTransaction().commit();
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			if (encoder.matches(password, student.getPassword().trim())) {
				return student;
			}
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public Long countAllStudent() {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Long list = (Long) session.createQuery("Select Count (*) From Student")
					.uniqueResult();
			session.getTransaction().commit();
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
}
