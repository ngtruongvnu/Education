package akadon.dao;

import java.util.List;

import akadon.entities.Student;
import akadon.entities.StudentRequest;
import akadon.entities.Tutor;

public interface TutorDAO {
	public List<Tutor> getAllTutors(Integer offset, Integer maxResult);
	public Long countAllTutor();
	public List<Tutor> filterTutor(Integer offset, Integer maxResult, String query);
	public List<Tutor> getFeaturedTutor(Integer offset, Integer maxResult);
	public Tutor getById(Integer id);
	public Tutor getByEmail(String email);
	public Tutor insertTutor(Tutor Tutor);
	public String checkVerifyCode(String code, String email);
	public Boolean checkEmail(String email);
	public String sendCode(String email);
	public Boolean checkPhoneNumber(String phoneNumber);
	public String updateTutor(Tutor Tutor);
	public String deleteTutor(Integer id);
	public Tutor login(String username, String password);
	public List<StudentRequest> getStudentRequestForTutor(String query, Integer offset, Integer maxResult);
	public Integer countStudentRequestForTutor(String query);
	
}
