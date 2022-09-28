package akadon.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.ServicePackageDAO;
import akadon.entities.ServicePackage;

@Repository
public class ServicePackageDAOImpl implements ServicePackageDAO{
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<ServicePackage> getAllServicePackages(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From ServicePackage")
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
	public List<ServicePackage> filterServicePackage(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From ServicePackage where "+query)
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
	public ServicePackage getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			ServicePackage ServicePackage = session.get(ServicePackage.class, id);
			session.getTransaction().commit();
			return ServicePackage;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
	
	@Override
	public ServicePackage getByTutorId(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			ServicePackage ServicePackage = (akadon.entities.ServicePackage) session.createQuery("From ServicePackage where tutorId =:tutorId")
					.setParameter("tutorId", id)
					.uniqueResult();
			session.getTransaction().commit();
			return ServicePackage;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
	

	@Override
	public String insertServicePackage(ServicePackage servicePackage) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer emailCheck = session.createQuery("From ServicePackage where servicePackageName =:servicePackageName")
					.setParameter("servicePackageName", servicePackage.getServicePackageName())
					.list()
					.size();
			if (emailCheck > 0) {
				result += "Gói này đã tồn tại !";
			}
			
			if (result.length()==0) {
				session.save(servicePackage);
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
	public String updateServicePackage(ServicePackage servicePackage) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer emailCheck = session.createQuery("From ServicePackage where servicePackageName =:servicePackageName")
					.setParameter("servicePackageName", servicePackage.getServicePackageName())
					.list()
					.size();
			if (emailCheck > 1) {
				result += "Gói này đã tồn tại !";
			}
			
			if (result.length()==0) {
				session.update(servicePackage);
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
	public String deleteServicePackage(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			ServicePackage sp = getById(id);
			Long check = (Long) session.createQuery("Select Count(*) From Tutor where servicePackageId =:servicePackageId")
			.setParameter("servicePackageId", sp.getServicePackageId())
			.uniqueResult();
			if (check==0) {
				session.delete(getById(id));
				session.getTransaction().commit();
				return "Thành công";
			} else {
				session.getTransaction().rollback();
				return "Không thể xóa ! Có gia sư đang sử dụng gói dịch vụ này !";
			}
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		}
		return null;
	}

}
