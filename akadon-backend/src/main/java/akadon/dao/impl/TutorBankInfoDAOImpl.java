package akadon.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.TutorBankInfoDAO;
import akadon.entities.TutorBankInfo;

@Repository
public class TutorBankInfoDAOImpl implements TutorBankInfoDAO{
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<TutorBankInfo> getAllTutorBankInfos(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From TutorBankInfo")
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
	public List<TutorBankInfo> filterTutorBankInfo(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From TutorBankInfo where "+query)
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
	public TutorBankInfo getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			TutorBankInfo TutorBankInfo = session.get(TutorBankInfo.class, id);
			session.getTransaction().commit();
			return TutorBankInfo;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
	

	@Override
	public String insertTutorBankInfo(TutorBankInfo TutorBankInfo) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer numberCheck = session.createQuery("From TutorBankInfo where accountNumber =:accountNumber")
					.setParameter("accountNumber", TutorBankInfo.getAccountNumber())
					.list()
					.size();
			Integer numberCheck2 = session.createQuery("From TutorBankInfo where accountNumber =:accountNumber")
					.setParameter("accountNumber", TutorBankInfo.getAccountNumber())
					.list()
					.size();
			if (numberCheck > 0 || numberCheck2 > 0) {
				result += "Số tài khoản này đã được đăng ký !";
			}
			Integer bankCheck = session.createQuery("From TutorBankInfo where bankId =:bankId")
					.setParameter("bankId", TutorBankInfo.getObjBank().getBankId())
					.list()
					.size();
			if (bankCheck > 0) {
				result += "$Ngân hàng này đã được đăng ký !";
			}
			if (result.length()==0) {
				session.save(TutorBankInfo);
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
	public String updateTutorBankInfo(TutorBankInfo TutorBankInfo) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer numberCheck = session.createQuery("From TutorBankInfo where accountNumber =:accountNumber")
					.setParameter("accountNumber", TutorBankInfo.getAccountNumber())
					.list()
					.size();
			Integer numberCheck2 = session.createQuery("From TutorBankInfo where accountNumber =:accountNumber")
					.setParameter("accountNumber", TutorBankInfo.getAccountNumber())
					.list()
					.size();
			if (numberCheck > 1 || numberCheck2 > 1) {
				result += "Số tài khoản này đã được đăng ký !";
			}
			Integer bankCheck = session.createQuery("From TutorBankInfo where bankId =:bankId")
					.setParameter("bankId", TutorBankInfo.getObjBank().getBankId())
					.list()
					.size();
			if (bankCheck > 1) {
				result += "$Ngân hàng này đã được đăng ký !";
			}
			if (result.length()==0) {
				session.update(TutorBankInfo);
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
	public String deleteTutorBankInfo(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			TutorBankInfo sp = getById(id);
			Long checkTutor = (Long) session.createQuery("Select Count(*) From Transactionn where sendAccountNumber =:sendAccountNumber")
				.setParameter("sendAccountNumber", sp.getAccountNumber())
				.uniqueResult();
			Long checkTutorRequest = (Long) session.createQuery("Select Count(*) From Transactionn where receiveAccountNumber =:receiveAccountNumber")
					.setParameter("receiveAccountNumber", sp.getAccountNumber())
					.uniqueResult();
			if (checkTutor==0 && checkTutorRequest==0) {
				session.delete(getById(id));
				session.getTransaction().commit();
				return "Thành công";
			} else {
				session.getTransaction().rollback();
				return "Không thể xóa ! Tài khoản này đang được sử dụng!";
			}
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		}
		return null;
	}

}
