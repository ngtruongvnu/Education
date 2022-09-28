package akadon.dao;

import java.util.List;

import akadon.entities.StudentRequest;

public interface StudentRequestDAO {
	public List<StudentRequest> getAllStudentRequests(Integer offset, Integer maxResult);
	public List<StudentRequest> getAll();
	public List<StudentRequest> getFilterAll(String query);
	public StudentRequest getById(Integer id);
	public List<StudentRequest> filterStudentRequest(Integer offset, Integer maxResult, String query);
	public Boolean checkRequest(Integer levelId, Integer subjectId, Integer studentId);
	public StudentRequest insertStudentRequest(StudentRequest StudentRequest);
	public String updateStudentRequest(StudentRequest StudentRequest);
	public String deleteStudentRequest(Integer id);
}
