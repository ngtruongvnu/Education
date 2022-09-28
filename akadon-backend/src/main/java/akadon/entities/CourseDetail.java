package akadon.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "CourseDetail")
public class CourseDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "courseDetailId")
	private Integer courseDetailId;
	@Column(name = "activeDate")
	private Date activeDate;
	@Column(name = "tutorComment")
	private String tutorComment;
	@Column(name = "studentComment")
	private String studentComment;
	@Column(name = "teacherRate")
	private Integer teacherRate;
	@Column(name = "studentRate")
	private Integer studentRate;
	@Column(name = "payRequest")
	private Boolean payRequest;
	@Column(name = "status")
	private Boolean status;
	@Column(name = "tutorPay")
	private Boolean tutorPay;
	@ManyToOne()
	@JoinColumn(name = "courseId", referencedColumnName = "courseId")
	private Course objCourse;

	public CourseDetail() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CourseDetail(Integer courseDetailId, Date activeDate, String tutorComment, String studentComment,
			Integer teacherRate, Integer studentRate, Boolean status, Course objCourse, Boolean payRequest, Boolean tutorPay) {
		super();
		this.courseDetailId = courseDetailId;
		this.activeDate = activeDate;
		this.tutorComment = tutorComment;
		this.studentComment = studentComment;
		this.teacherRate = teacherRate;
		this.studentRate = studentRate;
		this.status = status;
		this.objCourse = objCourse;
		this.payRequest = payRequest;
		this.tutorPay = tutorPay;
	}

	public Integer getCourseDetailId() {
		return courseDetailId;
	}

	public void setCourseDetailId(Integer courseDetailId) {
		this.courseDetailId = courseDetailId;
	}

	public Date getActiveDate() {
		return activeDate;
	}

	public void setActiveDate(Date activeDate) {
		this.activeDate = activeDate;
	}

	public String getTutorComment() {
		return tutorComment;
	}

	public void setTutorComment(String tutorComment) {
		this.tutorComment = tutorComment;
	}

	public String getStudentComment() {
		return studentComment;
	}

	public void setStudentComment(String studentComment) {
		this.studentComment = studentComment;
	}

	public Integer getTeacherRate() {
		return teacherRate;
	}

	public void setTeacherRate(Integer teacherRate) {
		this.teacherRate = teacherRate;
	}

	public Integer getStudentRate() {
		return studentRate;
	}

	public void setStudentRate(Integer studentRate) {
		this.studentRate = studentRate;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Course getObjCourse() {
		return objCourse;
	}

	public void setObjCourse(Course objCourse) {
		this.objCourse = objCourse;
	}

	public Boolean getPayRequest() {
		return payRequest;
	}

	public void setPayRequest(Boolean payRequest) {
		this.payRequest = payRequest;
	}

	public Boolean getTutorPay() {
		return tutorPay;
	}

	public void setTutorPay(Boolean tutorPay) {
		this.tutorPay = tutorPay;
	}
	
}
