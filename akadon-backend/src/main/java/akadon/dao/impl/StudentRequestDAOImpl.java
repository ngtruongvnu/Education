package akadon.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.StudentRequestDAO;
import akadon.entities.StudentRequest;

@Repository
public class StudentRequestDAOImpl implements StudentRequestDAO{
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<StudentRequest> getAllStudentRequests(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From StudentRequest Order By createdDate DESC")
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
	public List<StudentRequest> filterStudentRequest(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		List<StudentRequest> result = new ArrayList<>();
		try {
			List<Integer> list = session.createSQLQuery("Select studentRequestId as id From StudentRequest where "+query +" Order By createdDate DESC")
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
	public StudentRequest getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			StudentRequest StudentRequest = session.get(StudentRequest.class, id);
			session.getTransaction().commit();
			return StudentRequest;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
	

	@Override
	public StudentRequest insertStudentRequest(StudentRequest StudentRequest) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			if (result.length()==0) {
				session.save(StudentRequest);
				session.getTransaction().commit();
				return StudentRequest;
			} else {
				session.getTransaction().rollback();
				return null;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public String updateStudentRequest(StudentRequest StudentRequest) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			if (result.length()==0) {
				session.update(StudentRequest);
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
	public String deleteStudentRequest(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			StudentRequest sp = getById(id);
			if (!sp.getStatus().equalsIgnoreCase("Đang diễn ra")) {
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
	public List<StudentRequest> getAll() {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From StudentRequest Order By createdDate DESC")
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
	public List<StudentRequest> getFilterAll(String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		System.err.println(query);
		try {
			List list = session.createSQLQuery("Select * From StudentRequest where "+query +" Order By createdDate DESC")
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
	public Boolean checkRequest(Integer levelId, Integer subjectId, Integer studentId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer check = session.createQuery("From StudentRequest where studentId=:studentId and subjectId =:subjectId and levelId=:levelId")
					.setParameter("subjectId", subjectId)
					.setParameter("levelId", levelId)
					.setParameter("studentId", studentId)
					.list()
					.size();
			if (check > 0) {
				return false;
			}
		}catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return true;
	}

}
