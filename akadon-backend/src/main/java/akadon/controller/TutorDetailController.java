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

import akadon.dao.TutorDetailDAO;
import akadon.entities.TutorDetail;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/tutor-detail")

public class TutorDetailController {
	@Autowired
	TutorDetailDAO tutorDetailDAO;
	
	@GetMapping(value="/get-all-tutorDetails")
	public List<TutorDetail> getAllTutorDetails(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<TutorDetail> list = tutorDetailDAO.getAllTutorDetails(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/get-tutorDetail")
	public List<TutorDetail> getTutorDetailsById(@RequestParam("id")Integer id, @RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<TutorDetail> list = tutorDetailDAO.getTutorDetailsById(id,offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/get-tutorDetailById")
	public List<TutorDetail> getTutorDetailsById(@RequestParam("id")Integer id){
		List<TutorDetail> list = tutorDetailDAO.getAllTutorDetailsById(id);
		return list;
	}
	
	@GetMapping(value="/get-suitableTutor")
	public List<TutorDetail> getSuitableTutor(@RequestParam("levelId")Integer levelId, @RequestParam("subjectId")Integer subjectId, @RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<TutorDetail> list = tutorDetailDAO.getSuitableTutor(offset,maxResult,subjectId,levelId);
		return list;
	}
	
	@GetMapping(value="/count-suitableTutor")
	public Integer countSuitableTutor(@RequestParam("levelId")Integer levelId, @RequestParam("subjectId")Integer subjectId){
		return tutorDetailDAO.countSuitableTutor(subjectId, levelId);
	}
	
	@PostMapping(value="/insert-tutorDetail")
	public String insertTutorDetail(@RequestBody TutorDetail sp) {
		return tutorDetailDAO.insertTutorDetail(sp);
	}
	
	@PutMapping(value="/update-tutorDetail")
	public String updateTutorDetail(@RequestBody TutorDetail sp) {
		return tutorDetailDAO.updateTutorDetail(sp);
	}
	
	@DeleteMapping(value="/delete-tutorDetail")
	public String deleteTutorDetail(@RequestParam("id")Integer id) {
		return tutorDetailDAO.deleteTutorDetail(id);
	}
}
