package akadon.dao.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.CourseDetailDAO;
import akadon.entities.Course;
import akadon.entities.CourseDetail;

@Repository
public class CourseDetailDAOImpl implements CourseDetailDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<CourseDetail> getAllCourseDetails(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From CourseDetail").setFirstResult(offset).setMaxResults(maxResult).list();
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
	public List<CourseDetail> filterCourseDetail(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From CourseDetail where " + query).setFirstResult(offset)
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
	public CourseDetail getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			CourseDetail CourseDetail = session.get(CourseDetail.class, id);
			session.getTransaction().commit();
			return CourseDetail;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public String insertCourseDetail(CourseDetail CourseDetail) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			session.save(CourseDetail);
			session.getTransaction().commit();
			return "Thành công";
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public String updateCourseDetail(CourseDetail CourseDetail) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			session.update(CourseDetail);
			session.getTransaction().commit();
			return "Thành công";
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public String insertCourseDetailByCourseId(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Course course = session.get(Course.class,id);
			CourseDetail courseDetail = new CourseDetail();
			session.getTransaction().commit();
			return "Thành công";
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public List<CourseDetail> getByCourseId(Integer offset, Integer maxResult, Integer courseId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			List<CourseDetail> listCourse = session.createQuery("From CourseDetail"
					+ " where courseId=:courseId and activeDate <= :today")
					.setParameter("courseId", courseId)
					.setParameter("today", new Date())
					.setFirstResult(offset)
					.setMaxResults(maxResult)
					.list();
			session.getTransaction().commit();
			return listCourse;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public Long countByCourseId(Integer courseId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Long quantity = (Long) session.createQuery("Select Count (*) From CourseDetail"
					+ " where courseId=:courseId and activeDate <= :today")
					.setParameter("courseId", courseId)
					.setParameter("today", new Date())
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
	public List<CourseDetail> payDate(Integer studentId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<CourseDetail> result = new ArrayList<>();
		try {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
			LocalDateTime begin = LocalDate.now().atTime(0,0);
			LocalDateTime end = LocalDate.now().atTime(23,59);
			
			List<Integer> courseDetailId = session.createSQLQuery("Select courseDetailId "
					+ "From CourseDetail CD, Course C, StudentRequest SR "
					+ "where C.courseId = CD.courseId "
					+ "and CD.activeDate >= :begin "
					+ "and CD.activeDate <= :end "
					+ "and CD.payRequest = :pay "
					+ "and C.studentRequestId = SR.studentRequestId "
					+ "and SR.studentId = :studentId")
					.setParameter("begin", dtf.format(begin))
					.setParameter("end", dtf.format(end))
					.setParameter("pay", true)
					.setParameter("studentId", studentId)
					.list();
			for (Integer integer : courseDetailId) {
				CourseDetail courseDetail = session.get(CourseDetail.class, integer);
				result.add(courseDetail);
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
	public CourseDetail getPayDates(Integer studentId, Integer courseId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<CourseDetail> result = new ArrayList<>();
		try {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
			LocalDateTime end = LocalDate.now().atTime(23,59);
			List<Integer> listPayDate = session.createSQLQuery("Select courseDetailId "
					+ "From CourseDetail CD, Course C, StudentRequest SR "
					+ "where CD.courseId = C.courseId "
					+ "and CD.activeDate > :end "
					+ "and CD.payRequest = :pay "
					+ "and C.studentRequestId = SR.studentRequestId "
					+ "and C.courseId = :courseId "
					+ "and C.paymentStatus = :paymentStatus "
					+ "and SR.studentId = :studentId")
					.setParameter("end", dtf.format(end))
					.setParameter("pay", true)
					.setParameter("paymentStatus", false)
					.setParameter("studentId", studentId)
					.setParameter("courseId", courseId)
					.setFirstResult(0)
					.setMaxResults(1)
					.list();
			if (listPayDate.size()>0) {
				CourseDetail courseDetail = session.get(CourseDetail.class, listPayDate.get(0));
				session.getTransaction().commit();
				return courseDetail;
			}
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public List<CourseDetail> getPayForTutorDates(Integer courseId) {
		// TODO Auto-generated method stub
		return null;
	}

	

}
