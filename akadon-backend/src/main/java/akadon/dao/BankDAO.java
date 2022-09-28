package akadon.dao;

import java.util.List;

import akadon.entities.Bank;

public interface BankDAO {
	public List<Bank> getAllBanks();
	public Bank getById(Integer id);
	public List<Bank> filterBank(Integer offset, Integer maxResult, String query);
	public String insertBank(Bank Bank);
	public String updateBank(Bank Bank);
	public String deleteBank(Integer id);
}
