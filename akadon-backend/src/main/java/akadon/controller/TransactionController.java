package akadon.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import akadon.dao.TransactionDAO;
import akadon.entities.Transaction;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/transaction")

public class TransactionController {
	@Autowired
	TransactionDAO TransactionDAO;
	
	@GetMapping(value="/get-all-transactions")
	public List<Transaction> getAllTransactions(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Transaction> list = TransactionDAO.getAllTransactions(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/filter-transaction")
	public List<Transaction> getAllTransactions(@RequestParam("filter")String filter,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Transaction> list = TransactionDAO.filterTransaction(offset,maxResult,filter);
		return list;
	}
		
	@GetMapping(value="/get-transaction")
	public Transaction getById(@RequestParam("id")Integer id) {
		return TransactionDAO.getById(id);
	}
	
	@GetMapping(value="/count-sent-transaction")
	public Long getSentEmail(@RequestParam("email")String email, @RequestParam("startDate")Long startDate,@RequestParam("endDate")Long endDate) {
		return TransactionDAO.countSentTransaction(email,startDate,endDate);
	}
	
	@GetMapping(value="/count-receive-transaction")
	public Long getReceiveEmail(@RequestParam("email")String email, @RequestParam("startDate")Long startDate,@RequestParam("endDate")Long endDate) {
		return TransactionDAO.countReceiveTransaction(email,startDate,endDate);
	}
	
	@GetMapping(value="/get-received-transaction")
	public List<Transaction> getReceivedTransactionByAccountNumber(@RequestParam("email")String email, @RequestParam("startDate")Long startDate,@RequestParam("endDate")Long endDate,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems) {
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		return TransactionDAO.getReceivedTransactionByAccountNumber(email, offset, maxResult,startDate, endDate);
	}
	
	@GetMapping(value="/get-sent-transaction")
	public List<Transaction> getSentTransactionByAccountNumber(@RequestParam("email")String email, @RequestParam("startDate")Long startDate,@RequestParam("endDate")Long endDate, @RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems) {
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		return TransactionDAO.getSentTransactionByAccountNumber(email, offset, maxResult,startDate, endDate);
	}
	
	@PostMapping(value="/insert-transaction")
	public Boolean insertTransaction(@RequestBody Transaction Transaction) {
		return TransactionDAO.insertTransaction(Transaction);
	}
	
	
}
