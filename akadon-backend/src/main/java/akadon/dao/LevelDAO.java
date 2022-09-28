package akadon.dao;

import java.util.List;

import akadon.entities.Level;
import akadon.entities.Subject;

public interface LevelDAO {
	public List<Level> getAllLevels(Integer offset, Integer maxResult);
	public Level getById(Integer id);
	public Level getByName(String name);
	public List<Level> getAll();
	public List<Level> filterLevel(Integer offset, Integer maxResult, String query);
	public String insertLevel(Level Level);
	public String updateLevel(Level Level);
	public String deleteLevel(Integer id);
}
