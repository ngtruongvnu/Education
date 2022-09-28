package akadon.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import akadon.dao.CourseDetailDAO;
import akadon.entities.CourseDetail;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/courseDetail")

public class CourseDetailController {
	@Autowired
	CourseDetailDAO CourseDetailDAO;
	
	@GetMapping(value="/get-all-courseDetails")
	public List<CourseDetail> getAllCourseDetails(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<CourseDetail> list = CourseDetailDAO.getAllCourseDetails(offset,maxResult);
		return list;
	}
	
	@GetMapping(value="/filter-courseDetail")
	public List<CourseDetail> getAllCourseDetails(@RequestParam("filter")String filter,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<CourseDetail> list = CourseDetailDAO.filterCourseDetail(offset,maxResult,filter);
		return list;
	}
	
	@GetMapping(value="/get-courseDetail-by-course")
	public List<CourseDetail> getByCourseId(@RequestParam("courseId")Integer courseId,@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<CourseDetail> list = CourseDetailDAO.getByCourseId(offset,maxResult,courseId);
		return list;
	}
	
	@GetMapping(value="/count-courseDetail-by-course")
	public Long countByCourseId(@RequestParam("courseId")Integer courseId){
		return CourseDetailDAO.countByCourseId(courseId);
	}
	
	@GetMapping(value="/check-payDate")
	public List<CourseDetail> payDate(@RequestParam("studentId")Integer studentId){
		return CourseDetailDAO.payDate(studentId);
	}
	
	@GetMapping(value="/get-payDate")
	public CourseDetail getPayDate(@RequestParam("studentId")Integer studentId,@RequestParam("courseId")Integer courseId){
		return CourseDetailDAO.getPayDates(studentId,courseId);
	}
		
	@GetMapping(value="/get-courseDetail")
	public CourseDetail getById(@RequestParam("id")Integer id) {
		return CourseDetailDAO.getById(id);
	}
	
	@PostMapping(value="/insert-courseDetail")
	public String insertCourseDetail(@RequestBody CourseDetail CourseDetail) {
		return CourseDetailDAO.insertCourseDetail(CourseDetail);
	}
	
	@PutMapping(value="/update-courseDetail")
	public String updateCourseDetail(@RequestBody CourseDetail CourseDetail) {
		return CourseDetailDAO.updateCourseDetail(CourseDetail);
	}
	
}
