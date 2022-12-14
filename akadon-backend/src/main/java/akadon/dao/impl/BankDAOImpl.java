package akadon.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.BankDAO;
import akadon.dao.BankDAO;
import akadon.entities.Bank;

@Repository
public class BankDAOImpl implements BankDAO{
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<Bank> getAllBanks() {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Bank")
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
	public List<Bank> filterBank(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Bank where "+query)
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
	public Bank getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Bank Bank = session.get(Bank.class, id);
			session.getTransaction().commit();
			return Bank;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
	

	@Override
	public String insertBank(Bank Bank) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer nameCheck = session.createQuery("From Bank where bankName =:bankName")
					.setParameter("bankName", Bank.getBankName())
					.list()
					.size();
			if (nameCheck > 0) {
				result += "Ng??n h??ng n??y ???? t???n t???i !";
			}
			Integer abbreviationCheck = session.createQuery("From Bank where bankAbbreviations =:bankAbbreviations")
					.setParameter("bankAbbreviations", Bank.getBankAbbreviations())
					.list()
					.size();
			if (abbreviationCheck > 0) {
				result += "T??n vi???t t???t n??y ???? t???n t???i !";
			}
			Integer logoCheck = session.createQuery("From Bank where bankLogo =:bankLogo")
					.setParameter("bankLogo", Bank.getBankLogo())
					.list()
					.size();
			if (logoCheck > 0) {
				result += "Logo ng??n h??ng n??y ???? t???n t???i !";
			}
			
			if (result.length()==0) {
				session.save(Bank);
				session.getTransaction().commit();
				return "Th??nh c??ng";
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
	public String updateBank(Bank Bank) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer nameCheck = session.createQuery("From Bank where bankName =:bankName")
					.setParameter("bankName", Bank.getBankName())
					.list()
					.size();
			if (nameCheck > 1) {
				result += "Ng??n h??ng n??y ???? t???n t???i !";
			}
			Integer abbreviationCheck = session.createQuery("From Bank where bankAbbreviations =:bankAbbreviations")
					.setParameter("bankAbbreviations", Bank.getBankAbbreviations())
					.list()
					.size();
			if (abbreviationCheck > 1) {
				result += "T??n vi???t t???t n??y ???? t???n t???i !";
			}
			Integer logoCheck = session.createQuery("From Bank where bankLogo =:bankLogo")
					.setParameter("bankLogo", Bank.getBankLogo())
					.list()
					.size();
			if (logoCheck > 1) {
				result += "Logo ng??n h??ng n??y ???? t???n t???i !";
			}
			
			if (result.length()==0) {
				session.update(Bank);
				session.getTransaction().commit();
				return "Th??nh c??ng";
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
	public String deleteBank(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Bank sp = getById(id);
			Long checkTutor = (Long) session.createQuery("Select Count(*) From TutorBankInfo where bankId =:bankId")
			.setParameter("bankId", sp.getBankId())
			.uniqueResult();
			Long checkStudent = (Long) session.createQuery("Select Count(*) From StudentBankInfo where bankId =:bankId")
					.setParameter("bankId", sp.getBankId())
					.uniqueResult();
					
			if (checkTutor==0 && checkStudent==0) {
				session.delete(getById(id));
				session.getTransaction().commit();
				return "Th??nh c??ng";
			} else {
				session.getTransaction().rollback();
				return "Kh??ng th??? x??a ! C?? t??i kho???n ??ang s??? d???ng ng??n h??ng n??y !";
			}
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		}
		return null;
	}

}
