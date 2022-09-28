package akadon.dao.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.TransactionDAO;
import akadon.entities.Transaction;

@Repository
public class TransactionDAOImpl implements TransactionDAO{
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<Transaction> getAllTransactions(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Transaction")
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
	public List<Transaction> filterTransaction(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Transaction where "+query)
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
	public Transaction getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Transaction Transaction = session.get(Transaction.class, id);
			session.getTransaction().commit();
			return Transaction;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
	

	@Override
	public Boolean insertTransaction(Transaction Transaction) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
				session.save(Transaction);
				session.getTransaction().commit();
				return true;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public List<Transaction> getReceivedTransactionByAccountNumber(String number, Integer offset, Integer maxResult, Long startDate, Long endDate) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		Date start = new Date(startDate);
		start.setHours(0);
		start.setMinutes(0);
		Date end = new Date(endDate);
		end.setHours(0);
		end.setMinutes(0);
		try {
			if (startDate == 0) {
				List list = session.createQuery("From Transaction"
						+ " where receiveEmail=:receiveEmail"
						+ " Order By dateTransaction DESC")
						.setParameter("receiveEmail", number)
						.setFirstResult(offset)
						.setMaxResults(maxResult)
						.list();
				session.getTransaction().commit();
				return list;
			} else {
				List list = session.createQuery("From Transaction"
						+ " where receiveEmail=:receiveEmail"
						+ " and dateTransaction >= :startDate"
						+ " and dateTransaction <= :endDate"
						+ " Order By dateTransaction DESC")
						.setParameter("receiveEmail", number)
						.setParameter("startDate", start)
						.setParameter("endDate", end)
						.setFirstResult(offset)
						.setMaxResults(maxResult)
						.list();
				session.getTransaction().commit();
				return list;
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
	public List<Transaction> getSentTransactionByAccountNumber(String number, Integer offset, Integer maxResult, Long startDate, Long endDate) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		Date start = new Date(startDate);
		start.setHours(0);
		start.setMinutes(0);
		Date end = new Date(endDate);
		end.setHours(0);
		end.setMinutes(0);
		try {
			if (startDate == 0) {
				List list = session.createQuery("From Transaction"
						+ " where sentEmail=:sentEmail"
						+ " Order By dateTransaction DESC")
						.setParameter("sentEmail", number)
						.setFirstResult(offset)
						.setMaxResults(maxResult)
						.list();
				session.getTransaction().commit();
				return list;
			} else {
				List list = session.createQuery("From Transaction"
						+ " where sentEmail=:sentEmail"
						+ " and dateTransaction >= :startDate"
						+ " and dateTransaction <= :endDate"
						+ " Order By dateTransaction DESC")
						.setParameter("sentEmail", number)
						.setParameter("startDate", start)
						.setParameter("endDate", end)
						.setFirstResult(offset)
						.setMaxResults(maxResult)
						.list();
				session.getTransaction().commit();
				return list;
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
	public Long countSentTransaction(String email, Long startDate, Long endDate) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		Date start = new Date(startDate);
		start.setHours(0);
		start.setMinutes(0);
		Date end = new Date(endDate);
		end.setHours(0);
		end.setMinutes(0);
		try {
			if (startDate == 0) {
				Long quantity = (Long) session.createQuery("Select Count (*) From Transaction"
						+ " where sentEmail=:sentEmail")
						.setParameter("sentEmail", email)
						.uniqueResult();	
				session.getTransaction().commit();
				return quantity;
			} else {
				Long quantity = (Long) session.createQuery("Select Count (*) From Transaction"
						+ " where sentEmail=:sentEmail"
						+ " and dateTransaction >= :startDate"
						+ " and dateTransaction <= :endDate")
						.setParameter("startDate", start)
						.setParameter("endDate", end)
						.setParameter("sentEmail", email)
						.uniqueResult();
				session.getTransaction().commit();
				return quantity;
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
	public Long countReceiveTransaction(String email, Long startDate, Long endDate) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		Date start = new Date(startDate);
		start.setHours(0);
		start.setMinutes(0);
		Date end = new Date(endDate);
		end.setHours(0);
		end.setMinutes(0);
		try {
			if (startDate == 0) {
				Long quantity = (Long) session.createQuery("Select Count (*) From Transaction"
						+ " where receiveEmail=:receiveEmail")
						.setParameter("receiveEmail", email)
						.uniqueResult();	
				session.getTransaction().commit();
				return quantity;
			} else {
				Long quantity = (Long) session.createQuery("Select Count (*) From Transaction"
						+ " where receiveEmail=:receiveEmail"
						+ " and dateTransaction >= :startDate"
						+ " and dateTransaction <= :endDate")
						.setParameter("receiveEmail", email)
						.setParameter("startDate", start)
						.setParameter("endDate", end)
						.uniqueResult();
				session.getTransaction().commit();
				return quantity;
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
