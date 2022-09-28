package akadon.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.NotificationDAO;
import akadon.entities.Notification;

@Repository
public class NotificationDAOImpl implements NotificationDAO{
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<Notification> getAllNotifications(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Notification")
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
	public List<Notification> filterNotification(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Notification where "+query)
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
	public Notification getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Notification Notification = session.get(Notification.class, id);
			session.getTransaction().commit();
			return Notification;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
	

	@Override
	public Boolean insertNotification(Notification Notification) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
				session.save(Notification);
				session.getTransaction().commit();
				return true;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public Boolean deleteNotification(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			if (!getById(id).getSeen()) {
				session.delete(getById(id));
				session.getTransaction().commit();
				return true;
			} else {
				return false;
			}
			
			
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		}
		return null;
	}
	
	@Override
	public List<Notification> getReceivedNotificationsByEmail(String email, Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Notification where accountEmail=:accountEmail Order By notificationTime DESC")
					.setParameter("accountEmail", email)
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
	public Boolean viewNotification(Notification notification) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			session.update(notification);
			session.getTransaction().commit();
			return true;
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Long countReceivedNotificationByEmail(String email) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Long quantity = (Long) session.createQuery("Select Count (*) From Notification where accountEmail=:accountEmail")
					.setParameter("accountEmail", email)
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
	public Long countUnseenNotificationByEmail(String email) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Long quantity = (Long) session.createQuery("Select Count (*) From Notification where accountEmail=:accountEmail and seen=false")
					.setParameter("accountEmail", email)
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
	public Boolean viewAll(String email) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List<Notification> list = session.createQuery("From Notification where accountEmail=:accountEmail and seen=false")
					.setParameter("accountEmail", email)
					.list();
			for (Notification notification : list) {
				notification.setSeen(true);
				session.update(notification);
			}
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
