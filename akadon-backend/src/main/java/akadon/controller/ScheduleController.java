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

import akadon.dao.ScheduleDAO;
import akadon.entities.Schedule;
import akadon.entities.ScheduleData;
import akadon.entities.Student;
import akadon.entities.Tutor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/schedule")

public class ScheduleController {
	@Autowired
	ScheduleDAO ScheduleDAO;
	
	@GetMapping(value="/get-all-schedules")
	public List<Schedule> getAllSchedules(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Schedule> list = ScheduleDAO.getAllSchedules(offset,maxResult);
		return list;
	}
		
	@GetMapping(value="/get-schedule")
	public Schedule getById(@RequestParam("id")Integer id) {
		return ScheduleDAO.getById(id);
	}
	
	@GetMapping(value="/get-tutor-schedule")
	public List<Schedule> getTutorScheduleById(@RequestParam("id")Integer id) {
		return ScheduleDAO.getByTutorId(id);
	}
	
	@GetMapping(value="/get-student-schedule")
	public List<Schedule> getStudentScheduleById(@RequestParam("id")Integer id) {
		return ScheduleDAO.getByStudentId(id);
	}
	
	@GetMapping(value="/get-tutor-by-student")
	public List<Tutor> getTutorByStudentId(@RequestParam("id")Integer id) {
		return ScheduleDAO.getTutorByStudentId(id);
	}
	
	@GetMapping(value="/get-student-by-tutor")
	public List<Student> getStudentByTutorId(@RequestParam("id")Integer id) {
		return ScheduleDAO.getStudentByTutorId(id);
	}
	
	@PostMapping(value="/insert-schedule")
	public String insertSchedule(@RequestBody Schedule schedule) {
		System.err.println(schedule.getEndTime());
		return ScheduleDAO.insertSchedule(schedule);
	}
	
	@PutMapping(value="/update-schedule")
	public String updateSchedule(@RequestBody Schedule Schedule) {
		return ScheduleDAO.updateSchedule(Schedule);
	}
	
	@DeleteMapping(value="/delete-schedule")
	public String deleteSchedule(@RequestParam("id")Integer id) {
		return ScheduleDAO.deleteSchedule(id);
	}
}
