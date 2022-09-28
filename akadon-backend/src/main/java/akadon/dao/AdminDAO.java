package akadon.dao;

import java.util.List;

import akadon.entities.Admin;
import akadon.entities.Course;
import akadon.entities.StudentRequest;
import akadon.entities.UserQuestion;

public interface AdminDAO {
	public List<Admin> getAllAdmins(Integer offset, Integer maxResult);
	public List<Admin> filterAdmin(Integer offset, Integer maxResult, String query);
	public List<UserQuestion> userQuestionList(Integer offset, Integer maxResult);
	public Admin getById(Integer id);
	public String insertAdmin(Admin admin);
	public Boolean checkEmail(String email);
	public Boolean checkPhoneNumber(String phoneNumber);
	public Admin updateAdmin(Admin admin);
	public Admin login(String email, String password);
	public Boolean deleteAdmin(Integer adminId);
	public Integer countData(String type);
	public List<Integer> countDataByMonth(String type, Integer month);
	public List<Course> getAllCourse(String type, Integer offset, Integer maxResult);
	public Integer countAllCourse(String type);
	public List<Integer> countCourseBySubject();
	public List<Integer> countCourseByLevel();
	public List<Long> countRequestBySubject();
	public List<Long> countRequestByLevel();
	public List<Integer> countTutorBySubject();
	public List<Integer> countTutorByLevel();
	public List<StudentRequest> listStudentRequest(String query, Integer offset, Integer maxResult);
	public Integer countStudentRequest(String query);
}
