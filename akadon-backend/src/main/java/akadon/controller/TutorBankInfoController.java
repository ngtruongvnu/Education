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

import akadon.dao.TutorBankInfoDAO;
import akadon.entities.TutorBankInfo;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/tutorBankInfo")

public class TutorBankInfoController {
	@Autowired
	TutorBankInfoDAO TutorBankInfoDAO;
	
	@GetMapping(value="/get-all-tutorBankInfo")
	public List<TutorBankInfo> getAllTutorBankInfos(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<TutorBankInfo> list = TutorBankInfoDAO.getAllTutorBankInfos(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/filter")
	public List<TutorBankInfo> filter(@RequestParam("page")String query, @RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<TutorBankInfo> list = TutorBankInfoDAO.filterTutorBankInfo(offset,maxResult, query);
		return list;
	}
		
	@GetMapping(value="/get-tutorBankInfo")
	public TutorBankInfo getById(@RequestParam("id")Integer id) {
		return TutorBankInfoDAO.getById(id);
	}
	
	@PostMapping(value="/insert-tutorBankInfo")
	public String insertTutorBankInfo(@RequestBody TutorBankInfo TutorBankInfo) {
		return TutorBankInfoDAO.insertTutorBankInfo(TutorBankInfo);
	}
	
	@PutMapping(value="/update-tutorBankInfo")
	public String updateTutorBankInfo(@RequestBody TutorBankInfo TutorBankInfo) {
		return TutorBankInfoDAO.updateTutorBankInfo(TutorBankInfo);
	}
	
	@DeleteMapping(value="/delete-tutorBankInfo")
	public String deleteTutorBankInfo(@RequestParam("id")Integer id) {
		return TutorBankInfoDAO.deleteTutorBankInfo(id);
	}
}
