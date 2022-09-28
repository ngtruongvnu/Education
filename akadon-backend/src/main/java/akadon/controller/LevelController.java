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

import akadon.dao.LevelDAO;
import akadon.entities.Level;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/level")

public class LevelController {
	@Autowired
	LevelDAO LevelDAO;
	
	@GetMapping(value="/get-all-levels")
	public List<Level> getAllLevels(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Level> list = LevelDAO.getAllLevels(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/get-all")
	public List<Level> getAll(){
		List<Level> list = LevelDAO.getAll();
		return list;
	}
	
	@GetMapping(value="/get-level")
	public Level getById(@RequestParam("id")Integer id) {
		return LevelDAO.getById(id);
	}
	
	@GetMapping(value="/get-by-name")
	public Level getByName(@RequestParam("name")String name) {
		return LevelDAO.getByName(name);
	}
	
	@PostMapping(value="/insert-level")
	public String insertLevel(@RequestBody Level Level) {
		return LevelDAO.insertLevel(Level);
	}
	
	@PutMapping(value="/update-level")
	public String updateLevel(@RequestBody Level Level) {
		return LevelDAO.updateLevel(Level);
	}
	
	@DeleteMapping(value="/delete-level")
	public String deleteLevel(@RequestParam("id")Integer id) {
		return LevelDAO.deleteLevel(id);
	}
}
