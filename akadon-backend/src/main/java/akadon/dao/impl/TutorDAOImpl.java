package akadon.dao.impl;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
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
import akadon.dao.TutorDAO;
import akadon.entities.ServicePackage;
import akadon.entities.StudentRequest;
import akadon.entities.Tutor;
import akadon.entities.TutorDetail;
import net.bytebuddy.utility.RandomString;

@Repository
public class TutorDAOImpl implements TutorDAO{
	
	@Autowired
	SessionFactory sessionFactory;
	@Autowired
	JavaMailSender mailSender;

	@Override
	public List<Tutor> getAllTutors(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Tutor").setFirstResult(offset).setMaxResults(maxResult).list();
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
	public List<Tutor> filterTutor(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Tutor where " + query).setFirstResult(offset)
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
	public Tutor getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Tutor Tutor = session.get(Tutor.class, id);
			session.getTransaction().commit();
			return Tutor;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public Tutor insertTutor(Tutor Tutor) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			if (Tutor.getPassword()!=null) {
				Tutor.setPassword(EncrytedPasswordUtils.encrytePassword(Tutor.getPassword()));
				String OTP = sendCode(Tutor.getEmail());
				Tutor.setVerificationCode(OTP);
				Tutor.setOtpRequestTime(new Date());
			}
			session.save(Tutor);
			session.getTransaction().commit();
			return Tutor;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
	
	@Override
	public String updateTutor(Tutor Tutor) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
				Tutor currentTutor = session.get(Tutor.class, Tutor.getTutorId());
				if (Tutor.getPassword()!=null && (!currentTutor.getPassword().trim().equals(Tutor.getPassword().trim()))) {
					Tutor.setPassword(EncrytedPasswordUtils.encrytePassword(Tutor.getPassword()));
					String OTP = sendCode(Tutor.getEmail());
					Tutor.setVerificationCode(OTP);
					Tutor.setOtpRequestTime(new Date());
				}
				if (Tutor.getObjServicePackage() == null) {
					ServicePackage servicePackage = (ServicePackage) session.createQuery("From ServicePackage where servicePackageName=:servicePackageName")
							.setParameter("servicePackageName", "Cơ bản")
							.uniqueResult();
					Tutor.setObjServicePackage(servicePackage);
				}
				session.merge(Tutor);
				session.getTransaction().commit();
				return "Thành công";
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public String deleteTutor(Integer TutorId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Tutor s = getById(TutorId);
			Integer check = session.createQuery("From TutorDetail where tutorId =:tutorId")
					.setParameter("tutorId", s.getTutorId()).list().size();
			if (check > 0) {
				return "Không thể xóa ! Gia sư này đang hoạt động";
			} else {
				session.delete(getById(TutorId));
				session.getTransaction().commit();
				return "Thành công";
			}
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			session.close();
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
			Integer emailCheck2 = session.createQuery("From Tutor where email =:email").setParameter("email", email)
					.list().size();
			Integer emailCheck3 = session.createQuery("From Student where email =:email").setParameter("email", email)
					.list().size();
			if (emailCheck1 > 0 || emailCheck2 > 0 || emailCheck3 > 0) {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
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
			Integer phoneNumberCheck2 = session.createQuery("From Tutor where phonenumber =:phonenumber")
					.setParameter("phonenumber", phoneNumber).list().size();
			Integer phoneNumberCheck3 = session.createQuery("From Tutor where phonenumber =:phonenumber")
					.setParameter("phonenumber", phoneNumber).list().size();
			if (phoneNumberCheck1 > 0 || phoneNumberCheck2 > 0 || phoneNumberCheck3 > 0) {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}

		return true;
	}

	@Override
	public String checkVerifyCode(String code, String email) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Tutor s = (Tutor) session.createQuery("From Tutor where email=:email")
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
		} finally {
			session.close();
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
			Tutor s = (Tutor) session.createQuery("From Tutor where email=:email")
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
	public Tutor getByEmail(String email) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Tutor Tutor = (Tutor) session.createQuery("From Tutor where email=:email")
			.setParameter("email", email)
			.uniqueResult();
			session.getTransaction().commit();
			return Tutor;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
	
	@Override
	public Tutor login(String username, String password) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Tutor Tutor = new Tutor();
			Tutor TutorByEmail = (Tutor) session.createQuery("From Tutor where email=:email")
			.setParameter("email", username)
			.uniqueResult();
			Tutor TutorByPhone = (Tutor) session.createQuery("From Tutor where phonenumber=:phonenumber")
					.setParameter("phonenumber", username)
					.uniqueResult();
			if (TutorByEmail != null) {
				Tutor = TutorByEmail;
			}
			if (TutorByPhone != null) {
				Tutor = TutorByPhone;
			}
			
			session.getTransaction().commit();
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			if (encoder.matches(password, Tutor.getPassword().trim())) {
				return Tutor;
			} 
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public List<StudentRequest> getStudentRequestForTutor(String query,Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<StudentRequest> list = new ArrayList<>();
		try {
			List<Object> listDetailId = session.createSQLQuery("Select "
					+ "SR.studentRequestId as studentRequestId, SR.createdDate as createdDate "
					+ " from StudentRequest SR, TutorDetail TD "
					+ "where "+query+ " and SR.status<>N'Đã gửi, chờ gia sư đồng ý' and SR.status<>N'Đang diễn ra'  "
							+ "except "
							+ "Select "
							+ "SR.studentRequestId as studentRequestId, SR.createdDate as createdDate "
							+ "	from StudentRequest SR, TutorDetail TD, TutorRequest TR  "
							+ " where "+query+" and TR.studentRequestId = SR.studentRequestId and TR.tutorId = TD.tutorId Order By SR.createdDate DESC"
									+ " OFFSET :offset ROWS FETCH NEXT :maxResult ROWS ONLY")
					.setParameter("offset",offset)
					.setParameter("maxResult", maxResult)
					.list();
			for (int i=0;i<listDetailId.size();i++) {
				Object[] object = (Object[]) listDetailId.get(i);
				var id = (Integer) object[0];
				StudentRequest sr = session.get(StudentRequest.class,id);
				list.add(sr);
			}
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
	public Integer countStudentRequestForTutor(String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Integer quantity = (Integer) session.createSQLQuery("Select "
					+ "SR.studentRequestId as studentRequestId"
					+ " from StudentRequest SR, TutorDetail TD "
					+ "where "+query+ " and SR.status<>N'Đã gửi, chờ gia sư đồng ý' and SR.status<>N'Đang diễn ra' "
					+ "except "
					+ "Select "
					+ "SR.studentRequestId as studentRequestId"
					+ "	from StudentRequest SR, TutorDetail TD, TutorRequest TR  "
					+ " where "+query+" and TR.studentRequestId = SR.studentRequestId and TR.tutorId = TD.tutorId")
					.list().size();
			return quantity;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public List<Tutor> getFeaturedTutor(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Tutor Order By rating DESC, taughtCourseNumber DESC")
					.setFirstResult(offset)
					.setMaxResults(maxResult)
					.list();
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
	public Long countAllTutor() {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Long list = (Long) session.createQuery("Select Count (*) From Tutor")
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
