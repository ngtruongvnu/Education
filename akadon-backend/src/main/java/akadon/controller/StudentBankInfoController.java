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

import akadon.dao.StudentBankInfoDAO;
import akadon.entities.StudentBankInfo;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/studentBankInfo")

public class StudentBankInfoController {
	@Autowired
	StudentBankInfoDAO StudentBankInfoDAO;
	
	@GetMapping(value="/get-all-studentBankInfo")
	public List<StudentBankInfo> getAllStudentBankInfos(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<StudentBankInfo> list = StudentBankInfoDAO.getAllStudentBankInfos(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/filter")
	public List<StudentBankInfo> filter(@RequestParam("page")String query, @RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<StudentBankInfo> list = StudentBankInfoDAO.filterStudentBankInfo(offset,maxResult, query);
		return list;
	}
		
	@GetMapping(value="/get-studentBankInfo")
	public StudentBankInfo getById(@RequestParam("id")Integer id) {
		return StudentBankInfoDAO.getById(id);
	}
	
	@PostMapping(value="/insert-studentBankInfo")
	public String insertStudentBankInfo(@RequestBody StudentBankInfo StudentBankInfo) {
		return StudentBankInfoDAO.insertStudentBankInfo(StudentBankInfo);
	}
	
	@PutMapping(value="/update-studentBankInfo")
	public String updateStudentBankInfo(@RequestBody StudentBankInfo StudentBankInfo) {
		return StudentBankInfoDAO.updateStudentBankInfo(StudentBankInfo);
	}
	
	@DeleteMapping(value="/delete-studentBankInfo")
	public String deleteStudentBankInfo(@RequestParam("id")Integer id) {
		return StudentBankInfoDAO.deleteStudentBankInfo(id);
	}
}
