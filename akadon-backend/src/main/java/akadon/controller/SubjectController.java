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

import akadon.dao.SubjectDAO;
import akadon.entities.Level;
import akadon.entities.Subject;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/subject")

public class SubjectController {
	@Autowired
	SubjectDAO SubjectDAO;
	
	@GetMapping(value="/get-all-subjects")
	public List<Subject> getAllSubjects(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Subject> list = SubjectDAO.getAllSubjects(offset,maxResult);
		return list;
	}
	
	
	@GetMapping(value="/get-by-name")
	public Subject getByName(@RequestParam("name")String name) {
		return SubjectDAO.getByName(name);
	}
	
	@GetMapping(value="/get-all")
	public List<Subject> getAll(){
		List<Subject> list = SubjectDAO.getAll();
		return list;
	}

	
	@GetMapping(value="/get-subject")
	public Subject getById(@RequestParam("id")Integer id) {
		return SubjectDAO.getById(id);
	}
	
	@PostMapping(value="/insert-subject")
	public String insertSubject(@RequestBody Subject Subject) {
		return SubjectDAO.insertSubject(Subject);
	}
	
	@PutMapping(value="/update-subject")
	public String updateSubject(@RequestBody Subject Subject) {
		return SubjectDAO.updateSubject(Subject);
	}
	
	@DeleteMapping(value="/delete-subject")
	public String deleteSubject(@RequestParam("id")Integer id) {
		return SubjectDAO.deleteSubject(id);
	}
}
