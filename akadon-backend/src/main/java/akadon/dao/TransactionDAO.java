package akadon.dao;

import java.util.Date;
import java.util.List;

import akadon.entities.Transaction;

public interface TransactionDAO {
	public List<Transaction> getAllTransactions(Integer offset, Integer maxResult);
	public Transaction getById(Integer id);
	public List<Transaction> getReceivedTransactionByAccountNumber(String number, Integer offset, Integer maxResult, Long startDate, Long endDate);
	public List<Transaction> getSentTransactionByAccountNumber(String number, Integer offset, Integer maxResult, Long startDate, Long endDate);
	public List<Transaction> filterTransaction(Integer offset, Integer maxResult, String query);
	public Long countSentTransaction(String email, Long startDate, Long endDate);
	public Long countReceiveTransaction(String email,Long startDate, Long endDate);
	public Boolean insertTransaction(Transaction Transaction);
}
