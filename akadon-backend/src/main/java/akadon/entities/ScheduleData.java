package akadon.entities;

import java.util.Date;

public class ScheduleData {

	private Integer Id;
	
	private String Subject;
	
	private Date StartTime;
	
	private Date EndTime;
	
	private Integer tutorId;
	
	private Integer studentId;
	
	public ScheduleData() {
		// TODO Auto-generated constructor stub
	}

//	public ScheduleData(Integer Id, String Subject,Date StartTime, Date EndTime, Integer tutorId, Integer studentId) {
//		super();
//		this.Id = Id;
//		this.Subject = Subject;
//		this.StartTime = StartTime;
//		this.EndTime = EndTime;
//		this.tutorId = tutorId;
//		this.studentId = studentId;
//	}

	public Integer getId() {
		return Id;
	}

	public void setId(Integer Id) {
		this.Id = Id;
	}

	public String getSubject() {
		return Subject;
	}

	public void setSubject(String Subject) {
		this.Subject = Subject;
	}

	public Date getStartTime() {
		return StartTime;
	}

	public void setStartTime(Date StartTime) {
		this.StartTime = StartTime;
	}

	public Date getEndTime() {
		return EndTime;
	}

	public void setEndTime(Date EndTime) {
		this.EndTime = EndTime;
	}

	public Integer getTutorId() {
		return tutorId;
	}

	public void setTutorId(Integer tutorId) {
		this.tutorId = tutorId;
	}

	public Integer getStudentId() {
		return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}

	
	
}
