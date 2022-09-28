package akadon.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.ScheduleDAO;
import akadon.dao.ScheduleDAO;
import akadon.entities.Schedule;
import akadon.entities.ScheduleData;
import akadon.entities.Student;
import akadon.entities.Tutor;

@Repository
public class ScheduleDAOImpl implements ScheduleDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<Schedule> getAllSchedules(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Schedule").setFirstResult(offset).setMaxResults(maxResult).list();
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
	public List<Schedule> filterSchedule(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Schedule where " + query).setFirstResult(offset)
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
	public Schedule getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Schedule Schedule = session.get(Schedule.class, id);
			session.getTransaction().commit();
			return Schedule;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public String insertSchedule(Schedule schedule) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			session.save(schedule);
			session.getTransaction().commit();
			return "Thành công";
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public String updateSchedule(Schedule Schedule) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			session.update(Schedule);
			session.getTransaction().commit();
			return "Thành công";
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public String deleteSchedule(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			session.delete(getById(id));
			session.getTransaction().commit();
			return "Thành công";
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Schedule> getByTutorId(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Schedule where tutorId=:tutorId")
					.setParameter("tutorId", id)
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
	public List<Schedule> getByStudentId(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List<Schedule> list = session.createQuery("From Schedule where studentId=:studentId")
					.setParameter("studentId", id)
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
	public List<Tutor> getTutorByStudentId(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Tutor> result = new ArrayList<>();
		try {
			List<Integer> list = session.createSQLQuery("Select distinct(SC.tutorId) From Schedule SC, Tutor T"
					+ " where studentId=:id and T.tutorId = SC.tutorId")
					.setParameter("id", id)
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
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public List<Student> getStudentByTutorId(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<Student> result = new ArrayList<>();
		try {
			List<Integer> list = session.createSQLQuery("Select distinct(SC.studentId) From Schedule SC, Student S"
					+ " where tutorId=:id and S.studentId = SC.studentId")
					.setParameter("id", id)
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
		} finally {
			session.close();
		}
		return null;
	}

}
