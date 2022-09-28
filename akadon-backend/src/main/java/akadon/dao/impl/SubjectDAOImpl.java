package akadon.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.SubjectDAO;
import akadon.entities.Level;
import akadon.entities.Subject;

@Repository
public class SubjectDAOImpl implements SubjectDAO{
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<Subject> getAllSubjects(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Subject")
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
	public List<Subject> filterSubject(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Subject where "+query)
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
	public Subject getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Subject Subject = session.get(Subject.class, id);
			session.getTransaction().commit();
			return Subject;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
	

	@Override
	public String insertSubject(Subject Subject) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer nameCheck = session.createQuery("From Subject where SubjectName =:SubjectName")
					.setParameter("SubjectName", Subject.getSubjectName())
					.list()
					.size();
			if (nameCheck > 0) {
				result += "Môn này đã tồn tại !";
			}
			if (result.length()==0) {
				session.save(Subject);
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
	public String updateSubject(Subject Subject) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer nameCheck = session.createQuery("From Subject where subjectName =:subjectName")
					.setParameter("subjectName", Subject.getSubjectName())
					.list()
					.size();
			if (nameCheck > 1) {
				result += "Môn này đã tồn tại !";
			}
			if (result.length()==0) {
				session.update(Subject);
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
	public String deleteSubject(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Subject sp = getById(id);
			Long checkTutor = (Long) session.createQuery("Select Count(*) From TutorDetail where subjectId =:subjectId")
				.setParameter("subjectId", sp.getSubjectId())
				.uniqueResult();
			Long checkStudentRequest = (Long) session.createQuery("Select Count(*) From StudentRequest where subjectId =:subjectId")
					.setParameter("subjectId", sp.getSubjectId())
					.uniqueResult();
			Long checkTutorRequest = (Long) session.createQuery("Select Count(*) From TutorRequest where subjectId =:subjectId")
					.setParameter("subjectId", sp.getSubjectId())
					.uniqueResult();
			if (checkTutor==0 && checkStudentRequest==0 && checkTutorRequest==0) {
				session.delete(getById(id));
				session.getTransaction().commit();
				return "Thành công";
			} else {
				session.getTransaction().rollback();
				return "Không thể xóa ! Môn này đang được sử dụng!";
			}
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Subject> getAll() {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Subject Order By subjectId")
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
	public Subject getByName(String name) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Subject Subject = (akadon.entities.Subject) session.createQuery("From Subject where subjectName=:subjectName")
					.setParameter("subjectName", name)
					.uniqueResult();
			session.getTransaction().commit();
			return Subject;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

}
