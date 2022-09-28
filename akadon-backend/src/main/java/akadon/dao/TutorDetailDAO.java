package akadon.dao;

import java.util.List;

import akadon.entities.TutorDetail;

public interface TutorDetailDAO {
	public List<TutorDetail> getAllTutorDetails(Integer offset, Integer maxResult);
	public TutorDetail getById(Integer id);
	public List<TutorDetail> getTutorDetailsById(Integer id, Integer offset, Integer maxResult);
	public List<TutorDetail> getAllTutorDetailsById(Integer id);
	public List<TutorDetail> filterTutorDetail(Integer offset, Integer maxResult, String query);
	public List<TutorDetail> getSuitableTutor(Integer offset, Integer maxResult, Integer subjectId, Integer levelId);
	public Integer countSuitableTutor(Integer subjectId, Integer levelId);
	public String insertTutorDetail(TutorDetail TutorDetail);
	public String updateTutorDetail(TutorDetail TutorDetail);
	public String deleteTutorDetail(Integer id);
}
