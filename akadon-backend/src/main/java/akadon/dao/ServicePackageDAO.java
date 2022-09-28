package akadon.dao;

import java.util.List;

import akadon.entities.ServicePackage;


public interface ServicePackageDAO {
	public List<ServicePackage> getAllServicePackages(Integer offset, Integer maxResult);
	public List<ServicePackage> filterServicePackage(Integer offset, Integer maxResult, String query);
	public ServicePackage getById(Integer id);
	public ServicePackage getByTutorId(Integer id);
	public String insertServicePackage(ServicePackage servicePackage);
	public String updateServicePackage(ServicePackage servicePackage);
	public String deleteServicePackage(Integer id);
}
