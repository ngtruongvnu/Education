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

import akadon.dao.StudentRequestDAO;
import akadon.entities.StudentRequest;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/studentRequest")

public class StudentRequestController {
	@Autowired
	StudentRequestDAO StudentRequestDAO;
	
	@GetMapping(value="/get-all-studentRequests")
	public List<StudentRequest> getAllStudentRequests(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<StudentRequest> list = StudentRequestDAO.getAllStudentRequests(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/get-all")
	public List<StudentRequest> getAll(){
		List<StudentRequest> list = StudentRequestDAO.getAll();
		return list;
	}
	
	@GetMapping(value="/check")
	public Boolean check(@RequestParam("subjectId")Integer subjectId, @RequestParam("levelId")Integer levelId, @RequestParam("studentId")Integer studentId){
		return StudentRequestDAO.checkRequest(levelId,subjectId,studentId);
	}
	
	@GetMapping(value="/filter-studentRequest")
	public List<StudentRequest> getAllStudentRequests(@RequestParam("filter")String filter,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<StudentRequest> list = StudentRequestDAO.filterStudentRequest(offset,maxResult,filter);
		return list;
	}
		
	@GetMapping(value="/get-all-filter")
	public List<StudentRequest> getAllByFilter(@RequestParam("filter")String filter){
		List<StudentRequest> list = StudentRequestDAO.getFilterAll(filter);
		return list;
	}
	
	@GetMapping(value="/get-studentRequest")
	public StudentRequest getById(@RequestParam("id")Integer id) {
		return StudentRequestDAO.getById(id);
	}
	
	@PostMapping(value="/insert-studentRequest")
	public StudentRequest insertStudentRequest(@RequestBody StudentRequest StudentRequest) {
		return StudentRequestDAO.insertStudentRequest(StudentRequest);
	}
	
	@PutMapping(value="/update-studentRequest")
	public String updateStudentRequest(@RequestBody StudentRequest StudentRequest) {
		return StudentRequestDAO.updateStudentRequest(StudentRequest);
	}
	
	@DeleteMapping(value="/delete-studentRequest")
	public String deleteStudentRequest(@RequestParam("id") Integer id) {
		return StudentRequestDAO.deleteStudentRequest(id);
	}
	
}
