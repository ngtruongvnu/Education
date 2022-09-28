package akadon.dao;

import java.util.List;

import akadon.entities.VerifycateImage;

public interface VerifycateImageDAO {
	public List<VerifycateImage> getAllVerifycateImages(Integer offset, Integer maxResult);
	public VerifycateImage getById(Integer id);
	public List<VerifycateImage> filterVerifycateImage(Integer offset, Integer maxResult, String query);
	public List<VerifycateImage> getByTutorId(Integer offset);
	public String insertVerifycateImage(VerifycateImage VerifycateImage);
	public String updateVerifycateImage(VerifycateImage VerifycateImage);
	public String deleteVerifycateImage(Integer id);
}
