package akadon.dao;

import java.util.List;

import akadon.entities.Schedule;
import akadon.entities.ScheduleData;
import akadon.entities.Student;
import akadon.entities.Tutor;

public interface ScheduleDAO {
	public List<Schedule> getAllSchedules(Integer offset, Integer maxResult);
	public Schedule getById(Integer id);
	public List<Schedule> filterSchedule(Integer offset, Integer maxResult, String query);
	public List<Schedule> getByTutorId(Integer id);
	public List<Schedule> getByStudentId(Integer id);
	public List<Tutor> getTutorByStudentId(Integer id);
	public List<Student> getStudentByTutorId(Integer id);
	public String insertSchedule(Schedule Schedule);
	public String updateSchedule(Schedule Schedule);
	public String deleteSchedule(Integer id);
}
