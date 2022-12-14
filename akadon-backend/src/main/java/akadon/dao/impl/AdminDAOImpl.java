package akadon.dao.impl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import akadon.EncrytedPasswordUtils;
import akadon.dao.AdminDAO;
import akadon.entities.Admin;
import akadon.entities.Course;
import akadon.entities.Level;
import akadon.entities.StudentRequest;
import akadon.entities.Subject;
import akadon.entities.Tutor;
import akadon.entities.UserQuestion;

@Repository
public class AdminDAOImpl implements AdminDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<Admin> getAllAdmins(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Admin").setFirstResult(offset).setMaxResults(maxResult).list();
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
	public List<Admin> filterAdmin(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Admin where " + query).setFirstResult(offset).setMaxResults(maxResult)
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
	public Admin getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Admin admin = session.get(Admin.class, id);
			session.getTransaction().commit();
			return admin;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public List<UserQuestion> userQuestionList(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From UserQuestion").setFirstResult(offset).setMaxResults(maxResult).list();
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
	public String insertAdmin(Admin admin) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer emailCheck = session.createQuery("From Admin where email =:email")
					.setParameter("email", admin.getEmail()).list().size();
			if (emailCheck > 0) {
				result += "Email n??y ???? ???????c s??? d???ng !";
			}
			Integer phoneNumberCheck = session.createQuery("From Admin where phonenumber =:phonenumber")
					.setParameter("phonenumber", admin.getPhonenumber()).list().size();
			if (phoneNumberCheck > 0) {
				result += "$S??? ??i???n tho???i n??y ???? ???????c s??? d???ng !";
			}
			if (result.length() == 0) {
				admin.setPassword(EncrytedPasswordUtils.encrytePassword(admin.getPassword()));
				session.save(admin);
				session.getTransaction().commit();
				return "Th??nh c??ng";
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
	public Admin updateAdmin(Admin admin) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			admin.setPassword(EncrytedPasswordUtils.encrytePassword(admin.getPassword()));
			session.update(admin);
			session.getTransaction().commit();
			return admin;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public Boolean deleteAdmin(Integer adminId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			session.delete(getById(adminId));
			session.getTransaction().commit();
			return true;
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public Boolean checkEmail(String email) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		Integer emailCheck1 = session.createQuery("From Admin where email =:email").setParameter("email", email).list()
				.size();
		Integer emailCheck2 = session.createQuery("From Student where email =:email").setParameter("email", email)
				.list().size();
		Integer emailCheck3 = session.createQuery("From Tutor where email =:email").setParameter("email", email).list()
				.size();
		if (emailCheck1 > 0 || emailCheck2 > 0 || emailCheck3 > 0) {
			return false;
		}

		return true;
	}

	@Override
	public Boolean checkPhoneNumber(String phoneNumber) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		Integer phoneNumberCheck1 = session.createQuery("From Admin where phonenumber =:phonenumber")
				.setParameter("phonenumber", phoneNumber).list().size();
		Integer phoneNumberCheck2 = session.createQuery("From Student where phonenumber =:phonenumber")
				.setParameter("phonenumber", phoneNumber).list().size();
		Integer phoneNumberCheck3 = session.createQuery("From Tutor where phonenumber =:phonenumber")
				.setParameter("phonenumber", phoneNumber).list().size();
		if (phoneNumberCheck1 > 0 || phoneNumberCheck2 > 0 || phoneNumberCheck3 > 0) {
			return false;
		}
		return true;
	}

	@Override
	public Admin login(String email, String password) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Admin admin = (Admin) session.createQuery("From Admin where email=:email")
			.setParameter("email", email)
			.uniqueResult();
			session.getTransaction().commit();
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			if (encoder.matches(password, admin.getPassword().trim())) {
				return admin;
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
	public Integer countData(String type) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Integer quantity = 0;
			if (type.contains("Course")) {
				if (!type.contains("MONTH")) {
					quantity = (Integer) session.createSQLQuery("Select Count(*) from Course where status<>:status")
							.setParameter("status", "??ang ch??? h???c vi??n")
							.uniqueResult();
				} else {
					quantity = (Integer) session.createSQLQuery("Select Count(*) from Course where status<>:status "+type)
							.setParameter("status", "??ang ch??? h???c vi??n")
							.uniqueResult();
				}

			} else {
			System.err.println(type);
				quantity = (Integer) session.createSQLQuery("Select Count(*) from "+type)
						.uniqueResult();
			}
			session.getTransaction().commit();
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
	public List<Integer> countDataByMonth(String type, Integer month) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Integer> result = new ArrayList<>();
		try {
			if (!type.contains("Course")) {
				for (int m=month-5; m<=month;m++) {
					Integer quantity = (Integer) session.createSQLQuery("Select Count(*) from "+type+ " where (MONTH(otpRequestTime) = :month) "
							+ "and (YEAR(otpRequestTime) = 2021)")
							.setParameter("month", m)
							.uniqueResult();
					result.add(quantity);
				}
			} else {
				for (int m=month-5; m<=month;m++) {
					Integer quantity = (Integer) session.createSQLQuery("Select Count(*) from Course"
							+ " where (MONTH(createdDate) = :month) "
							+ " and (YEAR(createdDate) = 2021) "
							+ " and status<>N'??ang ch??? h???c vi??n'")
							.setParameter("month", m)
							.uniqueResult();
					result.add(quantity);
				}
			}
			session.getTransaction().commit();
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public List<Course> getAllCourse(String type, Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Date now = new Date();
			List<Course> list = new ArrayList<>();
			if (type.equals("Ch???")) {
				list = session.createQuery("From Course where "
						+ "startDate > :today and status<>:status Order By createdDate DESC")
						.setParameter("status", "??ang ch??? h???c vi??n")
						.setParameter("today", now)
						.setFirstResult(offset)
						.setMaxResults(maxResult)
				.list();
			}
			if (type.equals("??ang di???n ra")) {
				list = session.createQuery("From Course where "
						+ "startDate <= :today  and endDate >:today and status<>:status Order By createdDate DESC")
						.setParameter("status", "??ang ch??? h???c vi??n")
						.setParameter("today", now)
						.setFirstResult(offset)
						.setMaxResults(maxResult)
				.list();
			}
			if (type.equals("???? ho??n th??nh")) {
				list = session.createQuery("From Course where "
						+ "status=:status Order By createdDate DESC")
						.setParameter("status", "???? ho??n th??nh")
						.setFirstResult(offset)
						.setMaxResults(maxResult)
				.list();
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
	public Integer countAllCourse(String type) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Date now = new Date();
			List<Course> list = new ArrayList<>();
			if (type.equals("Ch???")) {
				list = session.createQuery("From Course where "
						+ "startDate > :today and status<>:status Order By createdDate DESC")
						.setParameter("status", "??ang ch??? h???c vi??n")
						.setParameter("today", now)
				.list();
			}
			if (type.equals("??ang di???n ra")) {
				list = session.createQuery("From Course where "
						+ "startDate <= :today and endDate >:today and status<>:status Order By createdDate DESC")
						.setParameter("status", "??ang ch??? h???c vi??n")
						.setParameter("today", now)
				.list();
			}
			if (type.equals("???? ho??n th??nh")) {
				list = session.createQuery("From Course where "
						+ "status=:status Order By createdDate DESC")
						.setParameter("status", "???? ho??n th??nh")
				.list();
			}
			session.getTransaction().commit();
			return list.size(); 
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public List<Integer> countCourseBySubject() {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Integer> result = new ArrayList<>();
		try {
			List<Subject> listSubject = session.createQuery("From Subject").list();
			for (Subject subject : listSubject) {
				Integer quantity = (Integer) session.createSQLQuery("Select Count(courseId) "
						+ " from Course C, StudentRequest SR "
						+ " where C.studentRequestId = SR.studentRequestId "
						+ " and SR.subjectId=:subjectId "
						+ " and C.status<>N'Ch??? h???c vi??n ?????ng ??'")
				.setParameter("subjectId", subject.getSubjectId())
				.uniqueResult();
				result.add(quantity);
			}
			session.getTransaction().commit();
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public List<Integer> countCourseByLevel() {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Integer> result = new ArrayList<>();
		try {
			List<Level> listLevel = session.createQuery("From Level").list();
			for (Level Level : listLevel) {
				Integer quantity = (Integer) session.createSQLQuery("Select Count(courseId) "
						+ " from Course C, StudentRequest SR "
						+ " where C.studentRequestId = SR.studentRequestId "
						+ " and SR.levelId=:LevelId "
						+ " and C.status<>N'Ch??? h???c vi??n ?????ng ??'")
				.setParameter("LevelId", Level.getLevelId())
				.uniqueResult();
				result.add(quantity);
			}
			session.getTransaction().commit();
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public List<Long> countRequestBySubject() {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Long> result = new ArrayList<>();
		try {
			List<Subject> listSubject = session.createQuery("From Subject").list();
			for (Subject subject : listSubject) {
				Long quantity = (Long) session.createQuery("Select Count(*) From StudentRequest "
						+ " where subjectId=:subjectId")
				.setParameter("subjectId", subject.getSubjectId())
				.uniqueResult();
				result.add(quantity);
			}
			session.getTransaction().commit();
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public List<Long> countRequestByLevel() {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Long> result = new ArrayList<>();
		try {
			List<Level> listLevel = session.createQuery("From Level").list();
			for (Level Level : listLevel) {
				Long quantity = (Long) session.createQuery("Select Count(*) From StudentRequest "
						+ " where levelId=:LevelId")
				.setParameter("LevelId", Level.getLevelId())
				.uniqueResult();
				result.add(quantity);
			}
			session.getTransaction().commit();
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public List<Integer> countTutorBySubject() {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Integer> result = new ArrayList<>();
		try {
			List<Subject> listSubject = session.createQuery("From Subject").list();
			for (Subject subject : listSubject) {
				Integer quantity = 
						(Integer) session.createSQLQuery("Select Count(distinct(T.tutorId)) "
						+ "From TutorDetail TD, Tutor T"
						+ " where TD.subjectId=:subjectId "
						+ " and T.tutorId = TD.tutorId")
				.setParameter("subjectId", subject.getSubjectId())
				.uniqueResult();
				result.add(quantity);
			}
			session.getTransaction().commit();
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public List<Integer> countTutorByLevel() {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Integer> result = new ArrayList<>();
		try {
			List<Level> listLevel = session.createQuery("From Level").list();
			for (Level Level : listLevel) {
				Integer quantity = (Integer) session.createSQLQuery("Select Count(distinct(T.tutorId)) "
						+ "From TutorDetail TD, Tutor T"
						+ " where TD.levelId=:levelId "
						+ " and T.tutorId = TD.tutorId ")
				.setParameter("levelId", Level.getLevelId())
				.uniqueResult();
				result.add(quantity);
			}
			session.getTransaction().commit();
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public List<StudentRequest> listStudentRequest(String query, Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<StudentRequest> result = new ArrayList<>();
		try {
			List<Integer> list = 
					session.createSQLQuery("Select studentRequestId as id "
							+ "From StudentRequest where status<>N'??ang di???n ra' "+query+" Order By createdDate DESC")
					.setFirstResult(offset)
					.setMaxResults(maxResult)
					.list();
			for (Integer id : list) {
				StudentRequest studentRequest = session.get(StudentRequest.class, id);
				result.add(studentRequest);
			}
			session.getTransaction().commit();
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public Integer countStudentRequest(String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Integer quantity = 
					(Integer) session.createSQLQuery("Select Count(studentRequestId) "
					+ "From StudentRequest where status<>N'??ang di???n ra' "+query)
			.uniqueResult();
			session.getTransaction().commit();
			return quantity;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	
	
}
