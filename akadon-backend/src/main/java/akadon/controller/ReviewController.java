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

import akadon.dao.ReviewDAO;
import akadon.entities.Review;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/Review")

public class ReviewController {
	@Autowired
	ReviewDAO reviewDAO;
	
	@GetMapping(value="/get-all-Reviews")
	public List<Review> getAllReviews(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Review> list = reviewDAO.getAllReviews(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/filter-Review")
	public List<Review> filter(@RequestParam("filter")String filter,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Review> list = reviewDAO.filterReview(offset,maxResult,filter);
		return list;
	}
		
//	@GetMapping(value="/get-Review")
//	public Review getById(@RequestParam("id")Integer id) {
//		return reviewDAO.getById(id);
//	}
	
	@GetMapping(value="/get-Review-By-Rate")
	public List<Review> getByEmailAndRate(@RequestParam("email")String email,@RequestParam("rate")Integer rate) {
		return reviewDAO.getReviewsByEmailAndRate(email, rate);
	}
	
	@GetMapping(value="/get-received-Review")
	public List<Review> getReceivedReviewsByEmail(@RequestParam("email")String email) {
		return reviewDAO.getReceivedReviewsByEmail(email);
	}
	
	@GetMapping(value="/get-sent-Review")
	public List<Review> getSentReviewsByEmail(@RequestParam("email")String email) {
		return reviewDAO.getSentReviewsByEmail(email);
	}
	
	@GetMapping(value="/get-average")
	public Double getAverage(@RequestParam("email")String email) {
		return reviewDAO.getAverageRate(email);
	}
	
	@PostMapping(value="/insert-Review")
	public String insertReview(@RequestBody Review Review) {
		return reviewDAO.insertReview(Review);
	}
	
}
