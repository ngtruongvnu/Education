package akadon.dao.impl;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.CourseDAO;
import akadon.entities.Course;
import akadon.entities.Student;
import akadon.entities.Tutor;

@Repository
public class CourseDAOImpl implements CourseDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<Course> getAllCourses(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Course").setFirstResult(offset).setMaxResults(maxResult).list();
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
	public List<Course> filterCourse(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Course where " + query).setFirstResult(offset)
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
	public Course getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Course Course = session.get(Course.class, id);
			session.getTransaction().commit();
			return Course;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public String insertCourse(Course Course) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			session.save(Course);
			session.getTransaction().commit();
			return "Thành công";
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public String updateCourse(Course Course) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			session.update(Course);
			session.getTransaction().commit();
			return "Thành công";
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public String deleteCourse(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Course sp = getById(id);
			if (!sp.getStatus().equalsIgnoreCase("Đang diễn ra")) {
				session.delete(getById(id));
				session.getTransaction().commit();
				return "Thành công";
			} else {
				session.getTransaction().rollback();
				return "Không thể xóa ! Khóa học này đang diễn ra !";
			}
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Course> getCourseOfStudent(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Course> result = new ArrayList<>();
		try {
			List<Integer> list = session.createSQLQuery("Select courseId as id from Course C, " + "TutorRequest TR, "
					+ "StudentRequest SR, " + "Tutor T " + " where TR.tutorRequestId = C.tutorRequestId "
					+ " and SR.studentRequestId = TR.studentRequestId " + " and T.tutorId = TR.tutorId "
					+ " and SR.studentRequestId =:id" + " and C.status<>N'Đang diễn ra' " + " Order By T.rating DESC")
					.setParameter("id", id).list();
			for (Integer courseId : list) {
				Course course = session.get(Course.class, courseId);
				result.add(course);
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
	public Course getCourseByTutorRequestId(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Course course = (Course) session.createQuery("From Course where tutorRequestId =:id").setParameter("id", id)
					.uniqueResult();
			session.getTransaction().commit();
			return course;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public List<Course> getWaitingCourseByTutorId(Integer offset, Integer maxResult, Integer tutorId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Course> result = new ArrayList<>();
		try {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
			LocalDateTime now = LocalDateTime.now();
			List<Integer> listId = session
					.createSQLQuery("Select C.courseId from Course C, Tutor T, TutorRequest TR"
							+ " where C.tutorRequestId =TR.tutorRequestId " + " and T.tutorId = TR.tutorId "
							+ " and T.tutorId = :tutorId " + " and C.startDate > :today" + " and C.status=N'Đang diễn ra' Order By startDate DESC")
					.setParameter("tutorId", tutorId).setParameter("today", dtf.format(now)).setFirstResult(offset)
					.setMaxResults(maxResult).list();
			for (Integer integer : listId) {
				Course course = session.get(Course.class, integer);
				result.add(course);
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
	public List<Course> getHappenCourseByTutorId(Integer offset, Integer maxResult, Integer tutorId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Course> result = new ArrayList<>();
		try {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
			LocalDateTime now = LocalDateTime.now();
			List<Integer> listId = session
					.createSQLQuery("Select C.courseId from Course C, Tutor T, TutorRequest TR"
							+ " where C.tutorRequestId =TR.tutorRequestId " + " and T.tutorId = TR.tutorId "
							+ " and T.tutorId = :tutorId " + " and C.startDate <= :today" + " and C.endDate >= :today" + " and C.status=N'Đang diễn ra' Order By startDate DESC")
					.setParameter("tutorId", tutorId).setParameter("today", dtf.format(now)).setFirstResult(offset)
					.setMaxResults(maxResult).list();
			for (Integer integer : listId) {
				Course course = session.get(Course.class, integer);
				result.add(course);
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
	public List<Course> getFinishedCourseByTutorId(Integer offset, Integer maxResult, Integer tutorId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Course> result = new ArrayList<>();
		try {
			List<Integer> listId = session
					.createSQLQuery("Select C.courseId from Course C, Tutor T, TutorRequest TR"
							+ " where C.tutorRequestId =TR.tutorRequestId " + " and T.tutorId = TR.tutorId "
							+ " and T.tutorId = :tutorId " + " and C.status=N'Đã hoàn thành' Order By endDate DESC")
					.setParameter("tutorId", tutorId).setFirstResult(offset)
					.setMaxResults(maxResult).list();
			for (Integer integer : listId) {
				Course course = session.get(Course.class, integer);
				result.add(course);
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
	public List<Course> getWaitingCourseByStudentId(Integer offset, Integer maxResult, Integer StudentId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Course> result = new ArrayList<>();
		try {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
			LocalDateTime now = LocalDateTime.now();
			List<Integer> listId = session
					.createSQLQuery("Select C.courseId from Course C, Student T, StudentRequest TR"
							+ " where C.StudentRequestId =TR.StudentRequestId " + " and T.studentId = TR.studentId "
							+ " and T.studentId = :studentId " + " and C.startDate > :today" + " and C.status=N'Đang diễn ra' Order By startDate DESC")
					.setParameter("studentId", StudentId).setParameter("today", dtf.format(now)).setFirstResult(offset)
					.setMaxResults(maxResult).list();
			for (Integer integer : listId) {
				Course course = session.get(Course.class, integer);
				result.add(course);
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
	public List<Course> getHappenCourseByStudentId(Integer offset, Integer maxResult, Integer StudentId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Course> result = new ArrayList<>();
		try {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
			LocalDateTime now = LocalDateTime.now();
			List<Integer> listId = session
					.createSQLQuery("Select C.courseId from Course C, Student T, StudentRequest TR"
							+ " where C.StudentRequestId =TR.StudentRequestId " + " and T.studentId = TR.studentId "
							+ " and T.studentId = :studentId " + " and C.startDate <= :today" + " and C.endDate >= :today" + " and C.status=N'Đang diễn ra' Order By startDate DESC")
					.setParameter("studentId", StudentId).setParameter("today", dtf.format(now)).setFirstResult(offset)
					.setMaxResults(maxResult).list();
			for (Integer integer : listId) {
				Course course = session.get(Course.class, integer);
				result.add(course);
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
	public List<Course> getFinishedCourseByStudentId(Integer offset, Integer maxResult, Integer StudentId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Course> result = new ArrayList<>();
		try {
			List<Integer> listId = session
					.createSQLQuery("Select C.courseId from Course C, Student T, StudentRequest TR"
							+ " where C.StudentRequestId =TR.StudentRequestId " + " and T.studentId = TR.studentId "
							+ " and T.studentId = :studentId " + " and C.status=N'Đã hoàn thành' Order By C.endDate DESC")
					.setParameter("studentId", StudentId).setFirstResult(offset)
					.setMaxResults(maxResult).list();
			System.err.println(StudentId);
			for (Integer integer : listId) {
				Course course = session.get(Course.class, integer);
				result.add(course);
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
	public Integer countfilterCourse(Integer offset, Integer maxResult, String query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer countgetWaitingCourseByTutorId(Integer tutorId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
			LocalDateTime now = LocalDateTime.now();
			Integer quantity = (Integer) session
					.createSQLQuery("Select Count(C.courseId) from Course C, Tutor T, TutorRequest TR"
							+ " where C.tutorRequestId =TR.tutorRequestId " + " and T.tutorId = TR.tutorId "
							+ " and T.tutorId = :tutorId " + " and C.startDate > :today" + " and C.status=N'Đang diễn ra'")
					.setParameter("tutorId", tutorId).setParameter("today", dtf.format(now))
					.uniqueResult();
			session.getTransaction().commit();
			return quantity;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public Integer countgetHappenCourseByTutorId(Integer tutorId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
			LocalDateTime now = LocalDateTime.now();
			Integer quantity = (Integer) session
					.createSQLQuery("Select count(C.courseId) from Course C, Tutor T, TutorRequest TR"
							+ " where C.tutorRequestId =TR.tutorRequestId " + " and T.tutorId = TR.tutorId "
							+ " and T.tutorId = :tutorId " + " and C.startDate <= :today" + " and C.endDate >= :today" + " and C.status=N'Đang diễn ra'")
					.setParameter("tutorId", tutorId).setParameter("today", dtf.format(now))
					.uniqueResult();
			session.getTransaction().commit();
			return quantity;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public Integer countgetFinishedCourseByTutorId(Integer tutorId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Integer quantity = (Integer) session
					.createSQLQuery("Select count(C.courseId) from Course C, Tutor T, TutorRequest TR"
							+ " where C.tutorRequestId =TR.tutorRequestId " + " and T.tutorId = TR.tutorId "
							+ " and T.tutorId = :tutorId " + " and C.status=N'Đã hoàn thành'")
					.setParameter("tutorId", tutorId)
					.uniqueResult();
			session.getTransaction().commit();
			return quantity;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public Integer countgetWaitingCourseByStudentId(Integer StudentId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
			LocalDateTime now = LocalDateTime.now();
			Integer quantity = (Integer) session
					.createSQLQuery("Select count(C.courseId) from Course C, Student T, StudentRequest TR"
							+ " where C.StudentRequestId =TR.StudentRequestId " + " and T.studentId = TR.studentId "
							+ " and T.studentId = :studentId " + " and C.startDate > :today" + " and C.status=N'Đang diễn ra'")
					.setParameter("studentId", StudentId).setParameter("today", dtf.format(now))
					.uniqueResult();
			session.getTransaction().commit();
			return quantity;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public Integer countgetHappenCourseByStudentId(Integer StudentId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
			LocalDateTime now = LocalDateTime.now();
			Integer quantity = (Integer) session
					.createSQLQuery("Select count(C.courseId) from Course C, Student T, StudentRequest TR"
							+ " where C.StudentRequestId =TR.StudentRequestId " + " and T.studentId = TR.studentId "
							+ " and T.studentId = :studentId " + " and C.startDate <= :today" + " and C.endDate >= :today" + " and C.status=N'Đang diễn ra'")
					.setParameter("studentId", StudentId).setParameter("today", dtf.format(now)).uniqueResult();
			session.getTransaction().commit();
			return quantity;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public Integer countgetFinishedCourseByStudentId(Integer StudentId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Integer quantity = (Integer) session
					.createSQLQuery("Select count(C.courseId) from Course C, Student T, StudentRequest TR"
							+ " where C.StudentRequestId =TR.StudentRequestId " + " and T.studentId = TR.studentId "
							+ " and T.studentId = :studentId " + " and C.status=N'Đã hoàn thành'")
					.setParameter("studentId", StudentId).uniqueResult();
			session.getTransaction().commit();
			return quantity;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public List<Tutor> learntTutorByStudentId(Integer studentId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Tutor> result = new ArrayList<>();
		try {
			List<Integer> list = session.createSQLQuery("Select distinct(TR.tutorId) from"
					+ " Course C, StudentRequest SR, Student S, TutorRequest TR "
					+ " where C.studentRequestId = SR.studentRequestId and SR.studentId = S.studentId and TR.tutorRequestId = C.tutorRequestId "
					+ " and S.studentId = :studentId and C.status<>N'Đang chờ học viên' "
					+ " except  "
					+ "select "
					+ "	distinct(T.tutorId)  "
					+ "    from "
					+ "        Review R, "
					+ "        Tutor T, "
					+ "        Student S   "
					+ "    where "
					+ "	R.receiveCommentEmail = T.email and R.sendCommentEmail = S.email and S.studentId=:studentId")
					.setParameter("studentId", studentId)
					.list();
			for (Integer integer : list) {
				Tutor tutor = session.get(Tutor.class, integer);
				result.add(tutor);
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
	public List<Student> taughtStudentByTutorId(Integer tutorId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Student> result = new ArrayList<>();
		try {
			List<Integer> list = session.createSQLQuery("Select distinct(SR.studentId) from"
					+ " Course C, TutorRequest TR, Tutor T, StudentRequest SR "
					+ " where C.tutorRequestId = TR.tutorRequestId and TR.tutorId = T.tutorId and SR.studentRequestId = C.studentRequestId "
					+ " and T.tutorId = :tutorId and C.status<>N'Đang chờ học viên' "
					+ " except "
					+ " select "
					+ "	distinct(S.studentId)"
					+ " from"
					+ " Review R,"
					+ " Tutor T,"
					+ " Student S  "
					+ " where"
					+ "	R.receiveCommentEmail = S.email and R.sendCommentEmail = T.email and T.tutorId=:tutorId")
					.setParameter("tutorId", tutorId)
					.list();
			for (Integer integer : list) {
				Student student = session.get(Student.class, integer);
				result.add(student);
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
	public Boolean setTutorTaughtData(Tutor tutor) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Integer courseNumber = (Integer) session.createSQLQuery("Select Count(courseId) "
					+ "From Course C, TutorRequest TR, Tutor T"
					+ " where C.tutorRequestId = TR. tutorRequestId"
					+ " and TR.tutorId = T.tutorId "
					+ " and T.tutorId = :tutorId"
					+ " and C.status = N'Đã hoàn thành'")
					.setParameter("tutorId", tutor.getTutorId())
					.uniqueResult();
			tutor.setTaughtCourseNumber(courseNumber);
			Integer studentNumber = (Integer) session.createSQLQuery("Select Count(distinct(S.studentId)) "
					+ "From Course C, TutorRequest TR, Tutor T, Student S, StudentRequest SR"
					+ " where C.tutorRequestId = TR.tutorRequestId"
					+ " and TR.tutorId = T.tutorId "
					+ " and TR.studentRequestId = SR.studentRequestId "
					+ " and SR.studentId = S.studentId "
					+ " and T.tutorId = :tutorId"
					+ " and C.status = N'Đã hoàn thành'")
					.setParameter("tutorId", tutor.getTutorId())
					.uniqueResult();
			tutor.setTaughtStudentNumber(studentNumber);
			session.update(tutor);
			session.getTransaction().commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public Boolean setStudentLearntData(Student student) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Integer courseNumber = (Integer) session.createSQLQuery("Select Count(courseId) "
					+ "From Course C, TutorRequest TR, Tutor T"
					+ " where C.tutorRequestId = TR. tutorRequestId"
					+ " and TR.tutorId = T.tutorId "
					+ " and T.tutorId = :tutorId"
					+ " and status = N'Đã hoàn thành'")
					.setParameter("tutorId", student.getStudentId())
					.uniqueResult();
			student.setLearntCourseNumber(courseNumber);
			session.update(student);
			session.getTransaction().commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	

}
