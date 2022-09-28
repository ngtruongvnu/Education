package akadon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import akadon.dao.BankDAO;
import akadon.entities.Bank;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/bank")

public class BankController {
	@Autowired
	BankDAO bankDAO;
	
	@GetMapping(value="/get-all-banks")
	public List<Bank> getAllBanks(){
		List<Bank> list = bankDAO.getAllBanks();
		return list;
	}
		
	@GetMapping(value="/get-bank")
	public Bank getById(@RequestParam("id")Integer id) {
		return bankDAO.getById(id);
	}
	
	@PostMapping(value="/insert-bank")
	public String insertBank(@RequestBody Bank Bank) {
		return bankDAO.insertBank(Bank);
	}
	
	@PutMapping(value="/update-bank")
	public String updateBank(@RequestBody Bank Bank) {
		return bankDAO.updateBank(Bank);
	}
	
	@DeleteMapping(value="/delete-bank")
	public String deleteBank(@RequestParam("id")Integer id) {
		return bankDAO.deleteBank(id);
	}
}
