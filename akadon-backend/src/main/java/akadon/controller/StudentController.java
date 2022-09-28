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

import akadon.dao.StudentDAO;
import akadon.entities.Student;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/student")

public class StudentController {
	@Autowired
	StudentDAO StudentDAO;
	
	@GetMapping(value="/get-all-student")
	public List<Student> getAllStudents(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Student> list = StudentDAO.getAllStudents(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/count-all-student")
	public Long countAllStudent() {
		return StudentDAO.countAllStudent();
	}
	
	@GetMapping(value="/filter")
	public List<Student> filter(@RequestParam("query")String query,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Student> list = StudentDAO.filterStudent(offset,maxResult,query);
		return list;
	}
	
	@GetMapping(value="/login")
	public Student checkEmail(@RequestParam("username")String username,@RequestParam("password")String password) {
		return StudentDAO.login(username, password);
	}
	
	@GetMapping(value="/check-email")
	public Boolean checkEmail(@RequestParam("email")String email) {
		return StudentDAO.checkEmail(email);
	}

	
	@GetMapping(value="/check-code")
	public String checkCode(@RequestParam("code")String code, @RequestParam("email")String email) {
		return StudentDAO.checkVerifyCode(code,email);
	}
	
	@GetMapping(value="/check-phoneNumber")
	public Boolean checkPhoneNumber(@RequestParam("phoneNumber")String phoneNumber) {
		return StudentDAO.checkPhoneNumber(phoneNumber);
	}
		
	@GetMapping(value="/get-student")
	public Student getById(@RequestParam("id")Integer id) {
		return StudentDAO.getById(id);
	}
	
	@GetMapping(value="/get-student-by-email")
	public Student getByByEmail(@RequestParam("email")String email) {
		return StudentDAO.getByEmail(email);
	}
	
	@GetMapping(value="/send-code")
	public String sendCode(@RequestParam("email")String email) {
		return StudentDAO.sendCode(email);
	}
	
	@PostMapping(value="/insert-student")
	public Student insertStudent(@RequestBody Student Student) {
		return StudentDAO.insertStudent(Student);
	}
	
	@PutMapping(value="/update-student")
	public String updateStudent(@RequestBody Student Student) {
		return StudentDAO.updateStudent(Student);
	}
	
	@DeleteMapping(value="/delete-student")
	public String deleteStudent(@RequestParam("id")Integer id) {
		return StudentDAO.deleteStudent(id);
	}
}
