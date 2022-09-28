package akadon.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.TutorRequestDAO;
import akadon.entities.ServicePackage;
import akadon.entities.StudentRequest;
import akadon.entities.TutorDetail;
import akadon.entities.TutorRequest;
import akadon.entities.TutorRequest;

@Repository
public class TutorRequestDAOImpl implements TutorRequestDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<TutorRequest> getAllTutorRequests(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From TutorRequest Order By receiveDate DESC").setFirstResult(offset)
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
	public List<TutorRequest> filterTutorRequest(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<TutorRequest> list = new ArrayList<>();
		try {
			if (query.contains("Từ học viên")) {
				List<Integer> listDetailId = session.createSQLQuery("Select "
						+ "TR.tutorRequestId as tutorRequestId"
						+ " from StudentRequest SR, TutorRequest TR where "+query+ " and TR.studentRequestId = SR.studentRequestId and TR.status=N'Chờ xác nhận' Order By receiveDate DESC")
						.setFirstResult(offset)
						.setMaxResults(maxResult)
						.list();
				session.getTransaction().commit();
				for (Integer id : listDetailId) {
					TutorRequest tr = session.get(TutorRequest.class, id);
					list.add(tr);
				}
				return list;
			} else {
				List list2 = session.createQuery("From TutorRequest where "+query+" and status=:status Order By receiveDate ")
				.setParameter("status", "Chờ học viên xác nhận")
				.setFirstResult(offset)
				.setMaxResults(maxResult)
				.list();
				session.getTransaction().commit();
				return list2;
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
	public TutorRequest getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			TutorRequest TutorRequest = session.get(TutorRequest.class, id);
			session.getTransaction().commit();
			return TutorRequest;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public TutorRequest insertTutorRequest(TutorRequest TutorRequest, Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			if (id!=0) {
				TutorDetail tutorDetail = session.get(TutorDetail.class, id);
				TutorRequest.setObjTutor(tutorDetail.getObjTutor());
			}
			session.save(TutorRequest);
			session.getTransaction().commit();
			return TutorRequest;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public String updateTutorRequest(TutorRequest TutorRequest) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			session.update(TutorRequest);
			session.getTransaction().commit();
			return "Thành công";
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public String deleteTutorRequest(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			TutorRequest sp = getById(id);
			if (sp.getStatus().equalsIgnoreCase("Chờ học viên xác nhận")) {
				session.delete(getById(id));
				session.getTransaction().commit();
				return "Thành công";
			} else {
				session.getTransaction().rollback();
				return "Không thể xóa ! Yêu cầu này đã được nhận!";
			}
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<TutorRequest> getAll() {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From TutorRequest Order By createdDate DESC").list();
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
	public List<TutorRequest> getFilterAll(String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<TutorRequest> list = new ArrayList<>();
		try {
			if (query.contains("Từ học viên")) {
				List<Integer> listDetailId = session.createSQLQuery("Select "
						+ "TR.tutorRequestId as tutorRequestId"
						+ " from StudentRequest SR, TutorRequest TR where "+query+ " and TR.studentRequestId = SR.studentRequestId and TR.status=N'Chờ xác nhận' Order By receiveDate DESC")
						.list();
				for (Integer id : listDetailId) {
					TutorRequest tr = session.get(TutorRequest.class, id);
					list.add(tr);
				}
			} else {
				List list2 = session.createQuery("From TutorRequest where "+query+" and status=:status ")
						.setParameter("status", "Chờ học viên xác nhận")
				.list();
				return list2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

}
