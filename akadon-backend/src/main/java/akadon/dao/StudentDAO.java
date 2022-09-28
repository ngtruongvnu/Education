package akadon.dao;

import java.util.List;

import akadon.entities.Student;

public interface StudentDAO {
	public List<Student> getAllStudents(Integer offset, Integer maxResult);
	public Long countAllStudent();
	public List<Student> filterStudent(Integer offset, Integer maxResult, String query);
	public Student getById(Integer id);
	public Student getByEmail(String email);
	public Student insertStudent(Student student);
	public String checkVerifyCode(String code, String email);
	public Boolean checkEmail(String email);
	public String sendCode(String email);
	public Boolean checkPhoneNumber(String phoneNumber);
	public String updateStudent(Student student);
	public String deleteStudent(Integer id);
	public Student login(String username, String password);
}
