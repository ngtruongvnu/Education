package akadon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import akadon.dao.UserQuestionDAO;
import akadon.entities.UserQuestion;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/user-question")

public class UserQuestionController {
	@Autowired
	UserQuestionDAO UserQuestionDAO;
	
	@GetMapping(value="/get-all-questions")
	public List<UserQuestion> getAllQuestions(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<UserQuestion> list = UserQuestionDAO.getAllUserQuestions(offset,maxResult);
		return list;
	}
	
	@PostMapping(value="/insert-question")
	public Boolean insertQuestion(@RequestBody UserQuestion sp) {
		System.out.println(sp.getFullName());
		return UserQuestionDAO.insertUserQuestion(sp);
	}
	
	
	@RequestMapping(value="/delete-question")
	public Boolean deleteQuestion(@RequestParam("id")Integer id) {
		return UserQuestionDAO.deleteUserQuestion(id);
	}
}
