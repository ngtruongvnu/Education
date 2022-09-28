package akadon.dao;

import java.util.Date;
import java.util.List;

import akadon.entities.CourseDetail;

public interface CourseDetailDAO {
	public List<CourseDetail> getAllCourseDetails(Integer offset, Integer maxResult);
	public CourseDetail getById(Integer id);
	public List<CourseDetail> filterCourseDetail(Integer offset, Integer maxResult, String query);
	public List<CourseDetail> getByCourseId(Integer offset, Integer maxResult, Integer courseId);
	public Long countByCourseId(Integer courseId);
	public String insertCourseDetail(CourseDetail CourseDetail);
	public String insertCourseDetailByCourseId(Integer id);
	public String updateCourseDetail(CourseDetail CourseDetail);
	public List<CourseDetail> payDate(Integer studentId);
	public CourseDetail getPayDates(Integer studentId, Integer courseId);
	public List<CourseDetail> getPayForTutorDates(Integer courseId);
}
