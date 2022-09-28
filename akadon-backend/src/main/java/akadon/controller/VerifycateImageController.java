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

import akadon.dao.VerifycateImageDAO;
import akadon.entities.VerifycateImage;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/verifycateImage")

public class VerifycateImageController {
	@Autowired
	VerifycateImageDAO VerifycateImageDAO;
	
	@GetMapping(value="/get-all-verifycateImages")
	public List<VerifycateImage> getAllVerifycateImages(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<VerifycateImage> list = VerifycateImageDAO.getAllVerifycateImages(offset,maxResult);
		return list;
	}
		
	@GetMapping(value="/get-verifycateImage")
	public VerifycateImage getById(@RequestParam("id")Integer id) {
		return VerifycateImageDAO.getById(id);
	}
	
	@GetMapping(value="/get-verifycateImage-by-tutor")
	public List<VerifycateImage> getByTutorId(@RequestParam("id")Integer id) {
		return VerifycateImageDAO.getByTutorId(id);
	}
	
	@PostMapping(value="/insert-verifycateImage")
	public String insertVerifycateImage(@RequestBody VerifycateImage VerifycateImage) {
		return VerifycateImageDAO.insertVerifycateImage(VerifycateImage);
	}
	
	@PutMapping(value="/update-verifycateImage")
	public String updateVerifycateImage(@RequestBody VerifycateImage VerifycateImage) {
		return VerifycateImageDAO.updateVerifycateImage(VerifycateImage);
	}
	
	@DeleteMapping(value="/delete-verifycateImage")
	public String deleteVerifycateImage(@RequestParam("id")Integer id) {
		return VerifycateImageDAO.deleteVerifycateImage(id);
	}
}
