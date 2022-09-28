package akadon.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.StudentBankInfoDAO;
import akadon.entities.StudentBankInfo;

@Repository
public class StudentBankInfoDAOImpl implements StudentBankInfoDAO{
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<StudentBankInfo> getAllStudentBankInfos(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From StudentBankInfo")
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
	public List<StudentBankInfo> filterStudentBankInfo(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From StudentBankInfo where "+query)
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
	public StudentBankInfo getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			StudentBankInfo StudentBankInfo = session.get(StudentBankInfo.class, id);
			session.getTransaction().commit();
			return StudentBankInfo;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
	

	@Override
	public String insertStudentBankInfo(StudentBankInfo StudentBankInfo) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer numberCheck = session.createQuery("From StudentBankInfo where accountNumber =:accountNumber")
					.setParameter("accountNumber", StudentBankInfo.getAccountNumber())
					.list()
					.size();
			Integer numberCheck2 = session.createQuery("From TutorBankInfo where accountNumber =:accountNumber")
					.setParameter("accountNumber", StudentBankInfo.getAccountNumber())
					.list()
					.size();
			if (numberCheck > 0 || numberCheck2 > 0) {
				result += "Số tài khoản này đã được đăng ký !";
			}
			Integer bankCheck = session.createQuery("From StudentBankInfo where bankId =:bankId")
					.setParameter("bankId", StudentBankInfo.getObjBank().getBankId())
					.list()
					.size();
			if (bankCheck > 0) {
				result += "$Ngân hàng này đã được đăng ký !";
			}
			if (result.length()==0) {
				session.save(StudentBankInfo);
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
	public String updateStudentBankInfo(StudentBankInfo StudentBankInfo) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer numberCheck = session.createQuery("From StudentBankInfo where accountNumber =:accountNumber")
					.setParameter("accountNumber", StudentBankInfo.getAccountNumber())
					.list()
					.size();
			Integer numberCheck2 = session.createQuery("From TutorBankInfo where accountNumber =:accountNumber")
					.setParameter("accountNumber", StudentBankInfo.getAccountNumber())
					.list()
					.size();
			if (numberCheck > 1 || numberCheck2 > 1) {
				result += "Số tài khoản này đã được đăng ký !";
			}
			Integer bankCheck = session.createQuery("From StudentBankInfo where bankId =:bankId")
					.setParameter("bankId", StudentBankInfo.getObjBank().getBankId())
					.list()
					.size();
			if (bankCheck > 1) {
				result += "$Ngân hàng này đã được đăng ký !";
			}
			if (result.length()==0) {
				session.update(StudentBankInfo);
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
	public String deleteStudentBankInfo(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			StudentBankInfo sp = getById(id);
			Long checkTutor = (Long) session.createQuery("Select Count(*) From Transactionn where sendAccountNumber =:sendAccountNumber")
				.setParameter("sendAccountNumber", sp.getAccountNumber())
				.uniqueResult();
			Long checkStudentRequest = (Long) session.createQuery("Select Count(*) From Transactionn where receiveAccountNumber =:receiveAccountNumber")
					.setParameter("receiveAccountNumber", sp.getAccountNumber())
					.uniqueResult();
			if (checkTutor==0 && checkStudentRequest==0) {
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
