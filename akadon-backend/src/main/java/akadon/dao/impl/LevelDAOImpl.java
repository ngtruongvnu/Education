package akadon.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.LevelDAO;
import akadon.entities.Level;

@Repository
public class LevelDAOImpl implements LevelDAO{
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<Level> getAllLevels(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Level")
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
	public List<Level> filterLevel(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Level where "+query)
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
	public Level getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Level Level = session.get(Level.class, id);
			session.getTransaction().commit();
			return Level;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
	

	@Override
	public String insertLevel(Level Level) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer nameCheck = session.createQuery("From Level where levelName =:levelName")
					.setParameter("levelName", Level.getLevelName())
					.list()
					.size();
			if (nameCheck > 0) {
				result += "Lớp này đã tồn tại !";
			}
			if (result.length()==0) {
				session.save(Level);
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
	public String updateLevel(Level Level) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer nameCheck = session.createQuery("From Level where levelName =:levelName")
					.setParameter("levelName", Level.getLevelName())
					.list()
					.size();
			if (nameCheck > 1) {
				result += "Lớp này đã tồn tại !";
			}
			if (result.length()==0) {
				session.update(Level);
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
	public String deleteLevel(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Level sp = getById(id);
			Long checkTutor = (Long) session.createQuery("Select Count(*) From TutorDetail where levelId =:levelId")
				.setParameter("LevelId", sp.getLevelId())
				.uniqueResult();
			Long checkStudentRequest = (Long) session.createQuery("Select Count(*) From StudentRequest where levelId =:levelId")
					.setParameter("levelId", sp.getLevelId())
					.uniqueResult();
			Long checkTutorRequest = (Long) session.createQuery("Select Count(*) From TutorRequest where levelId =:levelId")
					.setParameter("levelId", sp.getLevelId())
					.uniqueResult();
			if (checkTutor==0 && checkStudentRequest==0 && checkTutorRequest==0) {
				session.delete(getById(id));
				session.getTransaction().commit();
				return "Thành công";
			} else {
				session.getTransaction().rollback();
				return "Không thể xóa ! Lớp này đang được sử dụng!";
			}
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Level> getAll() {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Level Order By levelId")
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
	public Level getByName(String name) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Level Level = (akadon.entities.Level) session.createQuery("From Level where levelName=:levelName")
					.setParameter("levelName", name)
					.uniqueResult();
			session.getTransaction().commit();
			return Level;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

}
