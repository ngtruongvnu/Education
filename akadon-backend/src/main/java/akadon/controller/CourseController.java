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

import akadon.dao.CourseDAO;
import akadon.entities.Course;
import akadon.entities.Student;
import akadon.entities.Tutor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/course")

public class CourseController {
	@Autowired
	CourseDAO CourseDAO;
	
	@GetMapping(value="/get-all-courses")
	public List<Course> getAllCourses(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Course> list = CourseDAO.getAllCourses(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/filter-course")
	public List<Course> getAllCourses(@RequestParam("filter")String filter,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Course> list = CourseDAO.filterCourse(offset,maxResult,filter);
		return list;
	}
		
	@GetMapping(value="/get-course-by-studentRequest")
	public List<Course> getByStudentRequestId(@RequestParam("id")Integer id) {
		return CourseDAO.getCourseOfStudent(id);
	}
	
	
	@PutMapping(value="/set-tutor-taught-data")
	public Boolean setTutorTaughtNumber(@RequestBody Tutor tutor) {
		return CourseDAO.setTutorTaughtData(tutor);
	}
	
	@PutMapping(value="/set-student-learnt-data")
	public Boolean setTutorTaughtNumber(@RequestBody Student student) {
		return CourseDAO.setStudentLearntData(student);
	}
	
	@GetMapping(value="/get-waiting-course-by-tutor")
	public List<Course> getWaitingByTutorId(@RequestParam("id")Integer id,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems) {
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Course> list = CourseDAO.getWaitingCourseByTutorId(offset,maxResult,id);
		return list;
	}

	@GetMapping(value="/count-waiting-course-by-tutor")
	public Integer countgetWaitingByTutorId(@RequestParam("id")Integer id) {
		return CourseDAO.countgetWaitingCourseByTutorId(id);
	}
	
	
	@GetMapping(value="/get-happen-course-by-tutor")
	public List<Course> getHappenByTutorId(@RequestParam("id")Integer id,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems) {
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Course> list = CourseDAO.getHappenCourseByTutorId(offset,maxResult,id);
		return list;
	}

	@GetMapping(value="/count-happen-course-by-tutor")
	public Integer countgetHappenByTutorId(@RequestParam("id")Integer id) {
		return CourseDAO.countgetHappenCourseByTutorId(id);
	}
	
	@GetMapping(value="/get-finished-course-by-tutor")
	public List<Course> getfinishedByTutorId(@RequestParam("id")Integer id,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems) {
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Course> list = CourseDAO.getFinishedCourseByTutorId(offset,maxResult,id);
		return list;
	}

	@GetMapping(value="/count-finished-course-by-tutor")
	public Integer countgetfinishedByTutorId(@RequestParam("id")Integer id) {
		return CourseDAO.countgetFinishedCourseByTutorId(id);
	}
	
	@GetMapping(value="/get-waiting-course-by-student")
	public List<Course> getWaitingByStudentId(@RequestParam("id")Integer id,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems) {
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Course> list = CourseDAO.getWaitingCourseByStudentId(offset,maxResult,id);
		return list;
	}

	@GetMapping(value="/count-waiting-course-by-student")
	public Integer countgetWaitingByStudentId(@RequestParam("id")Integer id) {
		return CourseDAO.countgetWaitingCourseByStudentId(id);
	}
	
	@GetMapping(value="/get-happen-course-by-student")
	public List<Course> getHappenByStudentId(@RequestParam("id")Integer id,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems) {
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Course> list = CourseDAO.getHappenCourseByStudentId(offset,maxResult,id);
		return list;
	}

	@GetMapping(value="/count-happen-course-by-student")
	public Integer countgetHappenByStudentId(@RequestParam("id")Integer id) {
		return CourseDAO.countgetHappenCourseByStudentId(id);
	}
	
	@GetMapping(value="/get-finished-course-by-student")
	public List<Course> getfinishedByStudentId(@RequestParam("id")Integer id,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems) {
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Course> list = CourseDAO.getFinishedCourseByStudentId(offset,maxResult,id);
		return list;
	}

	@GetMapping(value="/count-finished-course-by-student")
	public Integer countgetfinishedByStudentId(@RequestParam("id")Integer id) {
		return CourseDAO.countgetFinishedCourseByStudentId(id);
	}
	
	
	@GetMapping(value="/get-course-by-tutorRequest")
	public Course getByTutorRequestId(@RequestParam("id")Integer id) {
		return CourseDAO.getCourseByTutorRequestId(id);
	}
	
	@GetMapping(value="/get-course")
	public Course getById(@RequestParam("id")Integer id) {
		return CourseDAO.getById(id);
	}
	
	@GetMapping(value="/get-student-by-tutor")
	public List<Student> getStudentByTutor(@RequestParam("id")Integer id) {
		return CourseDAO.taughtStudentByTutorId(id);
	}
	
	@GetMapping(value="/get-tutor-by-student")
	public List<Tutor> getTutorByStudent(@RequestParam("id")Integer id) {
		return CourseDAO.learntTutorByStudentId(id);
	}
	
	@PostMapping(value="/insert-course")
	public String insertCourse(@RequestBody Course Course) {
		return CourseDAO.insertCourse(Course);
	}
	
	@PutMapping(value="/update-course")
	public String updateCourse(@RequestBody Course Course) {
		return CourseDAO.updateCourse(Course);
	}
	
	@DeleteMapping(value="/delete-course")
	public String deleteCourse(@RequestParam("id") Integer id) {
		return CourseDAO.deleteCourse(id);
	}
	
}
