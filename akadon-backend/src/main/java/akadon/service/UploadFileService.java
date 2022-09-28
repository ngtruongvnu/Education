package akadon.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadFileService {
	
	@Value("${akadon.upload.dir}")
	private String akadonUploadDir;
	
	@Value("${akadon.url.prefix}")
	private String akadonUrlPrefix;
	
	public Map<Object, Object> uploadFile(MultipartFile file) throws Exception{
		String filename = file.getOriginalFilename();
		String location = akadonUrlPrefix+"/"+filename;
		try {
            Path root = Paths.get(akadonUploadDir);
            
            Path resolve = root.resolve(filename);
            if (resolve.toFile()
                       .exists()) {
                Files.delete(resolve);
            } else {
            	Files.createDirectories(root);
            }
            Files.copy(file.getInputStream(), resolve);
        } catch (Exception e) {
            throw new FileUploadException("Could not store the file. Error: " + e.getMessage());
        }
		Map<Object, Object> map = new HashMap<>();
		map.put("location", location);
		return map;
	}
}
