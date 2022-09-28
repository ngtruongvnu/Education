package akadon.dao;

import java.util.List;

import akadon.entities.Subject;

public interface SubjectDAO {
	public List<Subject> getAllSubjects(Integer offset, Integer maxResult);
	public List<Subject> getAll();
	public Subject getById(Integer id);
	public Subject getByName(String name);
	public List<Subject> filterSubject(Integer offset, Integer maxResult, String query);
	public String insertSubject(Subject Subject);
	public String updateSubject(Subject Subject);
	public String deleteSubject(Integer id);
}
