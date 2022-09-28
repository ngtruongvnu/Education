		package akadon.dao.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.TutorDetailDAO;
import akadon.entities.ServicePackage;
import akadon.entities.StudentRequest;
import akadon.entities.Tutor;
import akadon.entities.TutorDetail;

@Repository
public class TutorDetailDAOImpl implements TutorDetailDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<TutorDetail> getAllTutorDetails(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From TutorDetail").setFirstResult(offset).setMaxResults(maxResult).list();
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
	public List<TutorDetail> filterTutorDetail(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From TutorDetail where " + query).setFirstResult(offset)
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
	public TutorDetail getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			TutorDetail TutorDetail = session.get(TutorDetail.class, id);
			session.getTransaction().commit();
			return TutorDetail;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public String insertTutorDetail(TutorDetail TutorDetail) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			System.err.println(TutorDetail.getObjSubject().getSubjectName());
			System.err.println(TutorDetail.getObjLevel().getLevelName());
			session.save(TutorDetail);
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
	public String updateTutorDetail(TutorDetail TutorDetail) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			session.update(TutorDetail);
			session.getTransaction().commit();
			return "Thành công";
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		finally {
			session.close();
		}
		return null;
	}

	@Override
	public List<TutorDetail> getTutorDetailsById(Integer id, Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From TutorDetail where tutorId=:tutorId")
					.setParameter("tutorId", id)
					.setFirstResult(offset).setMaxResults(maxResult).list();
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
	public String deleteTutorDetail(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			TutorDetail s = getById(id);
			Integer check = session.createQuery("From TutorRequest where tutorId =:tutorId")
					.setParameter("tutorId", s.getObjTutor().getTutorId())
					.list()
					.size();
			session.getTransaction().commit();
			if (check > 0) {
				return "Chuyên môn này đang được dùng";
			} else {
				session.delete(getById(id));
				session.getTransaction().commit();
				return "Thành công";
			}
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		}finally {
			session.close();
		}
		return null;
	}

	@Override
	public List<TutorDetail> getSuitableTutor(Integer offset, Integer maxResult, Integer subjectId, Integer levelId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<TutorDetail> listDetail = new ArrayList<>();
		try {
			List<Integer> list = session.createSQLQuery("Select TT.tutorDetailId as tutorDetailId"
					+ " From TutorDetail TT, Tutor T "
					+ "where levelId=:levelId and subjectId=:subjectId and TT.tutorId = T.tutorId "
					+ "Order By T.rating DESC")
					.setParameter("levelId", levelId)
					.setParameter("subjectId", subjectId)
					.setFirstResult(offset)
					.setMaxResults(maxResult)
					.list();
			for (Integer id : list) {
				TutorDetail tutorDetail = session.get(TutorDetail.class, id);
				listDetail.add(tutorDetail);
			}
			session.getTransaction().commit();
			return listDetail;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public Integer countSuitableTutor(Integer subjectId, Integer levelId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Integer quantity = (Integer) session.createSQLQuery("Select Count(*)"
					+ " From TutorDetail TT, Tutor T "
					+ "where levelId=:levelId and subjectId=:subjectId and TT.tutorId = T.tutorId "
					)
					.setParameter("levelId", levelId)
					.setParameter("subjectId", subjectId)
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

	@Override
	public List<TutorDetail> getAllTutorDetailsById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From TutorDetail where tutorId=:tutorId Order By levelId")
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

}
