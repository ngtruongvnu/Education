package akadon.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.VerifycateImageDAO;
import akadon.dao.VerifycateImageDAO;
import akadon.entities.VerifycateImage;

@Repository
public class VerifycateImageDAOImpl implements VerifycateImageDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<VerifycateImage> getAllVerifycateImages(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From VerifycateImage").setFirstResult(offset).setMaxResults(maxResult)
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
	public List<VerifycateImage> filterVerifycateImage(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From VerifycateImage where " + query).setFirstResult(offset)
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
	public VerifycateImage getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			VerifycateImage VerifycateImage = session.get(VerifycateImage.class, id);
			session.getTransaction().commit();
			return VerifycateImage;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public String insertVerifycateImage(VerifycateImage VerifycateImage) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			if (result.length() == 0) {
				session.save(VerifycateImage);
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
	public String updateVerifycateImage(VerifycateImage VerifycateImage) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			session.update(VerifycateImage);
			session.getTransaction().commit();
			return "Thành công";
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public String deleteVerifycateImage(Integer id) {
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
	public List<VerifycateImage> getByTutorId(Integer tutorId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From VerifycateImage where tutorId=:tutorId")
					.setParameter("tutorId", tutorId)
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
