package akadon.dao;

import java.util.List;

import akadon.entities.Review;

public interface ReviewDAO {
	public List<Review> getAllReviews(Integer offset, Integer maxResult);
	public List<Review> getReceivedReviewsByEmail(String email);
	public List<Review> getSentReviewsByEmail(String email);
	public List<Review> getReviewsByEmailAndRate(String email, Integer rate);
	public Review getById(Integer id);
	public List<Review> filterReview(Integer offset, Integer maxResult, String query);
	public String insertReview(Review Review);
	public Double getAverageRate(String email);
	
}
