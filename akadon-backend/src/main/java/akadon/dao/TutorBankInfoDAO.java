package akadon.dao;

import java.util.List;

import akadon.entities.TutorBankInfo;

public interface TutorBankInfoDAO {
	public List<TutorBankInfo> getAllTutorBankInfos(Integer offset, Integer maxResult);
	public TutorBankInfo getById(Integer id);
	public List<TutorBankInfo> filterTutorBankInfo(Integer offset, Integer maxResult, String query);
	public String insertTutorBankInfo(TutorBankInfo TutorBankInfo);
	public String updateTutorBankInfo(TutorBankInfo TutorBankInfo);
	public String deleteTutorBankInfo(Integer id);
}
