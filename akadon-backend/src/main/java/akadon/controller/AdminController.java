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

import akadon.dao.AdminDAO;
import akadon.entities.Admin;
import akadon.entities.Course;
import akadon.entities.StudentRequest;
import akadon.entities.Tutor;
import akadon.entities.UserQuestion;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/admin")

public class AdminController {
	@Autowired
	AdminDAO adminDAO;
	
	@GetMapping(value="/get-all-admins")
	public List<Admin> getAllAdmins(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Admin> list = adminDAO.getAllAdmins(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/get-user-questions")
	public List<UserQuestion> getUserQuestions(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<UserQuestion> list = adminDAO.userQuestionList(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/check-email")
	public Boolean checkEmail(@RequestParam("email")String email) {
		return adminDAO.checkEmail(email);
	}
	
	@GetMapping(value="/check-phoneNumber")
	public Boolean checkPhoneNumber(@RequestParam("phoneNumber")String phoneNumber) {
		return adminDAO.checkPhoneNumber(phoneNumber);
	}
	
	@GetMapping(value="/get-admin")
	public Admin getById(@RequestParam("id")Integer id) {
		return adminDAO.getById(id);
	}
	
	@GetMapping(value="/login")
	public Admin login(@RequestParam("username")String username,@RequestParam("password")String password) {
		return adminDAO.login(username, password);
	}
	
	@GetMapping(value="/count-data")
	public Integer login(@RequestParam("type")String type) {
		return adminDAO.countData(type);
	}
	
	@GetMapping(value="/count-data-by-month")
	public List<Integer> login(@RequestParam("type")String type, @RequestParam("month")Integer month) {
		return adminDAO.countDataByMonth(type, month);
	}
	
	@GetMapping(value="/get-course")
	public List<Course> getCourse(@RequestParam("type")String type, @RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Course> list = adminDAO.getAllCourse(type,offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/count-course")
	public Integer countCourse(@RequestParam("type")String type) {
		return adminDAO.countAllCourse(type);
	}
	
	@PostMapping(value="/insert-admin")
	public String insertAdmin(@RequestBody Admin admin) {
		return adminDAO.insertAdmin(admin);
	}
	
	@PutMapping(value="/update-admin")
	public Admin updateAdmin(@RequestBody Admin admin) {
		return adminDAO.updateAdmin(admin);
	}
	
	@DeleteMapping(value="/delete-admin")
	public Boolean deleteAdmin(@RequestParam("id")Integer id) {
		return adminDAO.deleteAdmin(id);
	}
	
	@GetMapping(value="/count-course-by-subject")
	public List<Integer> countCourseBySubject() {
		return adminDAO.countCourseBySubject();
	}
	
	@GetMapping(value="/count-course-by-level")
	public List<Integer> countCourseByLevel() {
		return adminDAO.countCourseByLevel();
	}
	
	@GetMapping(value="/count-request-by-subject")
	public List<Long> countRequestBySubject() {
		return adminDAO.countRequestBySubject();
	}
	
	@GetMapping(value="/count-request-by-level")
	public List<Long> countRequestByLevel() {
		return adminDAO.countRequestByLevel();
	}
	
	@GetMapping(value="/count-tutor-by-subject")
	public List<Integer> countTutorBySubject() {
		return adminDAO.countTutorBySubject();
	}
	
	@GetMapping(value="/count-tutor-by-level")
	public List<Integer> countTutorByLevel() {
		return adminDAO.countTutorByLevel();
	}
	
	@GetMapping(value="/get-student-request")
	public List<StudentRequest> listStudentRequest(@RequestParam("query")String query, @RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<StudentRequest> list = adminDAO.listStudentRequest(query,offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/count-student-request")
	public Integer countStudentRequest(@RequestParam("query")String query) {
		return adminDAO.countStudentRequest(query);
	}
}
