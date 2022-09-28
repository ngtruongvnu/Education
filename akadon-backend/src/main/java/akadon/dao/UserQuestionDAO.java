package akadon.dao;

import java.util.List;

import akadon.entities.UserQuestion;

public interface UserQuestionDAO {
	public List<UserQuestion> getAllUserQuestions(Integer offset, Integer maxResult);
	public List<UserQuestion> getByEmail(String email, Integer offset, Integer maxResult);
	public Boolean insertUserQuestion(UserQuestion userQuestion);
	public Boolean deleteUserQuestion(Integer id);
}
