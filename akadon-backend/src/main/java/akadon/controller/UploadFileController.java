package akadon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import akadon.service.UploadFileService;

@RestController
@CrossOrigin(origins = "*")
public class UploadFileController {
	
	@Autowired
	private UploadFileService uploadService;
	
	@PostMapping(value = "upload-file")
	public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) throws Exception{
		return ResponseEntity.ok(uploadService.uploadFile(file));
	}
}
