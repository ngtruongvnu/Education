package akadon.dao;

import java.util.List;

import akadon.entities.TutorRequest;

public interface TutorRequestDAO {
	public List<TutorRequest> getAllTutorRequests(Integer offset, Integer maxResult);
	public List<TutorRequest> getAll();
	public List<TutorRequest> getFilterAll(String query);
	public TutorRequest getById(Integer id);
	public List<TutorRequest> filterTutorRequest(Integer offset, Integer maxResult, String query);
	public TutorRequest insertTutorRequest(TutorRequest TutorRequest, Integer id);
	public String updateTutorRequest(TutorRequest TutorRequest);
	public String deleteTutorRequest(Integer id);
}
