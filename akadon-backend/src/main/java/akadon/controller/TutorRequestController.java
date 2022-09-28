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

import akadon.dao.TutorRequestDAO;
import akadon.entities.StudentRequest;
import akadon.entities.TutorRequest;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/tutorRequest")

public class TutorRequestController {
	@Autowired
	TutorRequestDAO TutorRequestDAO;
	
	@GetMapping(value="/get-all-tutorRequests")
	public List<TutorRequest> getAllTutorRequests(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<TutorRequest> list = TutorRequestDAO.getAllTutorRequests(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/filter-tutorRequest")
	public List<TutorRequest> getAllTutorRequests(@RequestParam("filter")String filter,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<TutorRequest> list = TutorRequestDAO.filterTutorRequest(offset,maxResult,filter);
		return list;
	}
		
	@GetMapping(value="/get-tutorRequest")
	public TutorRequest getById(@RequestParam("id")Integer id) {
		return TutorRequestDAO.getById(id);
	}
	
	@GetMapping(value="/get-all-filter")
	public List<TutorRequest> getAllByFilter(@RequestParam("filter")String filter){
		List<TutorRequest> list =TutorRequestDAO.getFilterAll(filter);
		return list;
	}
	
	@PostMapping(value="/insert-tutorRequest")
	public TutorRequest insertTutorRequest(@RequestBody TutorRequest TutorRequest, @RequestParam("tutorDetailId")Integer id) {
		return TutorRequestDAO.insertTutorRequest(TutorRequest,id);
	}
	
	@PutMapping(value="/update-tutorRequest")
	public String updateTutorRequest(@RequestBody TutorRequest TutorRequest) {
		return TutorRequestDAO.updateTutorRequest(TutorRequest);
	}
	
	@DeleteMapping(value="/delete-tutorRequest")
	public String deleteTutorRequest(@RequestParam("id") Integer id) {
		return TutorRequestDAO.deleteTutorRequest(id);
	}
	
}
