package akadon.dao;

import java.util.List;

import akadon.entities.Course;
import akadon.entities.Student;
import akadon.entities.Tutor;

public interface CourseDAO {
	public List<Course> getAllCourses(Integer offset, Integer maxResult);
	public Course getById(Integer id);
	public List<Course> filterCourse(Integer offset, Integer maxResult, String query);
	public List<Course> getWaitingCourseByTutorId(Integer offset, Integer maxResult, Integer tutorId);
	public List<Course> getHappenCourseByTutorId(Integer offset, Integer maxResult, Integer tutorId);
	public List<Course> getFinishedCourseByTutorId(Integer offset, Integer maxResult, Integer tutorId);
	public List<Course> getWaitingCourseByStudentId(Integer offset, Integer maxResult, Integer StudentId);
	public List<Course> getHappenCourseByStudentId(Integer offset, Integer maxResult, Integer StudentId);
	public List<Course> getFinishedCourseByStudentId(Integer offset, Integer maxResult, Integer StudentId);
	public Integer countfilterCourse(Integer offset, Integer maxResult, String query);
	public Integer countgetWaitingCourseByTutorId(Integer tutorId);
	public Integer countgetHappenCourseByTutorId(Integer tutorId);
	public Integer countgetFinishedCourseByTutorId(Integer tutorId);
	public Integer countgetWaitingCourseByStudentId(Integer StudentId);
	public Integer countgetHappenCourseByStudentId(Integer StudentId);
	public Integer countgetFinishedCourseByStudentId(Integer StudentId);
	public List<Course> getCourseOfStudent(Integer id);
	public Course getCourseByTutorRequestId(Integer id);
	public String insertCourse(Course Course);
	public String updateCourse(Course Course);
	public String deleteCourse(Integer id);
	public List<Tutor> learntTutorByStudentId(Integer studentId);
	public List<Student> taughtStudentByTutorId(Integer tutorId);
	public Boolean setTutorTaughtData(Tutor tutor);
	public Boolean setStudentLearntData(Student student);
}
