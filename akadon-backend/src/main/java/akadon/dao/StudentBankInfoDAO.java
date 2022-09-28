package akadon.dao;

import java.util.List;

import akadon.entities.StudentBankInfo;

public interface StudentBankInfoDAO {
	public List<StudentBankInfo> getAllStudentBankInfos(Integer offset, Integer maxResult);
	public StudentBankInfo getById(Integer id);
	public List<StudentBankInfo> filterStudentBankInfo(Integer offset, Integer maxResult, String query);
	public String insertStudentBankInfo(StudentBankInfo StudentBankInfo);
	public String updateStudentBankInfo(StudentBankInfo StudentBankInfo);
	public String deleteStudentBankInfo(Integer id);
}
