package akadon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import akadon.dao.ServicePackageDAO;
import akadon.entities.ServicePackage;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/service-package")

public class ServicePackageController {
	@Autowired
	ServicePackageDAO servicePackageDAO;
	
	@GetMapping(value="/get-all-packages")
	public List<ServicePackage> getAllAdmins(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<ServicePackage> list = servicePackageDAO.getAllServicePackages(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/get-package")
	public ServicePackage getById(@RequestParam("id")Integer id) {
		return servicePackageDAO.getById(id);
	}
	
	@GetMapping(value="/get-package-by-tutorId")
	public ServicePackage getByTutorId(@RequestParam("id")Integer id) {
		return servicePackageDAO.getByTutorId(id);
	}
	
	@PostMapping(value="/insert-package")
	public String insertAdmin(@RequestBody ServicePackage sp) {
		return servicePackageDAO.insertServicePackage(sp);
	}
	
	@PutMapping(value="/update-package")
	public String updateAdmin(@RequestBody ServicePackage sp) {
		return servicePackageDAO.updateServicePackage(sp);
	}
	
	@DeleteMapping(value="/delete-package")
	public String deleteAdmin(@RequestParam("id")Integer id) {
		return servicePackageDAO.deleteServicePackage(id);
	}
}
