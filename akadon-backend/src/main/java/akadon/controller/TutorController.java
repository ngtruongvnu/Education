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

import akadon.dao.TutorDAO;
import akadon.entities.Student;
import akadon.entities.StudentRequest;
import akadon.entities.Tutor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/tutor")

public class TutorController {
	@Autowired
	TutorDAO TutorDAO;
	
	@GetMapping(value="/get-all-tutors")
	public List<Tutor> getAllTutors(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Tutor> list = TutorDAO.getAllTutors(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/count-all-tutor")
	public Long countAllTutor() {
		return TutorDAO.countAllTutor();
	}
	
	@GetMapping(value="/get-featured-tutors")
	public List<Tutor> getFeaturedTutors(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Tutor> list = TutorDAO.getFeaturedTutor(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/filter")
	public List<Tutor> filter(@RequestParam("query")String query,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Tutor> list = TutorDAO.filterTutor(offset,maxResult,query);
		return list;
	}
	
	@GetMapping(value="/check-email")
	public Boolean checkEmail(@RequestParam("email")String email) {
		return TutorDAO.checkEmail(email);
	}
	
	@GetMapping(value="/check-code")
	public String checkCode(@RequestParam("code")String code, @RequestParam("email")String email) {
		return TutorDAO.checkVerifyCode(code,email);
	}
	
	@GetMapping(value="/check-phoneNumber")
	public Boolean checkPhoneNumber(@RequestParam("phoneNumber")String phoneNumber) {
		return TutorDAO.checkPhoneNumber(phoneNumber);
	}
		
	@GetMapping(value="/get-tutor")
	public Tutor getById(@RequestParam("id")Integer id) {
		return TutorDAO.getById(id);
	}
	
	@GetMapping(value="/get-tutor-by-email")
	public Tutor getByByEmail(@RequestParam("email")String email) {
		return TutorDAO.getByEmail(email);
	}
	
	@GetMapping(value="/send-code")
	public String sendCode(@RequestParam("email")String email) {
		return TutorDAO.sendCode(email);
	}
	
	@GetMapping(value="/get-student-request")
	public List<StudentRequest> sendCode(@RequestParam("query")String query, @RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems) {
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<StudentRequest> list = TutorDAO.getStudentRequestForTutor(query,offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/count-student-request")
	public Integer quantityOfStudentRequest(@RequestParam("query")String query) {
		return TutorDAO.countStudentRequestForTutor(query);
	}
	
	@GetMapping(value="/login")
	public Tutor checkEmail(@RequestParam("username")String username,@RequestParam("password")String password) {
		return TutorDAO.login(username, password);
	}
	
	@PostMapping(value="/insert-tutor")
	public Tutor insertTutor(@RequestBody Tutor Tutor) {
		return TutorDAO.insertTutor(Tutor);
	}
	
	@PutMapping(value="/update-tutor")
	public String updateTutor(@RequestBody Tutor Tutor) {
		return TutorDAO.updateTutor(Tutor);
	}
	
	@DeleteMapping(value="/delete-tutor")
	public String deleteTutor(@RequestParam("id")Integer id) {
		return TutorDAO.deleteTutor(id);
	}
}
