package akadon.entities;

import java.util.Collection;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Course")
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "courseId")
	private Integer courseId;
	@Column(name = "courseName")
	private String courseName;
	@Column(name = "startTime")
	private Long startTime;
	@Column(name = "endTime")
	private Long endTime;
	@Column(name = "startDate")
	private Date startDate;
	@Column(name = "endDate")
	private Date endDate;
	@Column(name = "studyDate")
	private String studyDate;
	@Column(name = "createdDate")
	private Date createdDate;
	@Column(name = "status")
	private String status;
	@Column(name = "paymentStatus")
	private Boolean paymentStatus;
	@ManyToOne()
	@JoinColumn(name = "studentRequestId", referencedColumnName = "studentRequestId")
	private StudentRequest objStudentRequest;
	@ManyToOne()
	@JoinColumn(name = "tutorRequestId", referencedColumnName = "tutorRequestId")
	private TutorRequest objTutorRequest;
	@JsonIgnore
	@OneToMany(mappedBy = "objCourse", cascade = CascadeType.ALL)
	private Collection<CourseDetail> listCourseDetail;

	public Course() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Course(Integer courseId, String courseName, Long startTime, Long endTime, Date startDate, Date endDate,
			String studyDate, String status, StudentRequest objStudentRequest, TutorRequest objTutorRequest,
			Collection<CourseDetail> listCourseDetail, Date createdDate, Boolean paymentStatus) {
		super();
		this.courseId = courseId;
		this.courseName = courseName;
		this.startTime = startTime;
		this.endTime = endTime;
		this.startDate = startDate;
		this.endDate = endDate;
		this.studyDate = studyDate;
		this.status = status;
		this.objStudentRequest = objStudentRequest;
		this.objTutorRequest = objTutorRequest;
		this.listCourseDetail = listCourseDetail;
		this.createdDate = createdDate;
		this.paymentStatus = paymentStatus;
	}

	public Integer getCourseId() {
		return courseId;
	}

	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}

	public Long getStartTime() {
		return startTime;
	}

	public void setStartTime(Long startTime) {
		this.startTime = startTime;
	}

	public Long getEndTime() {
		return endTime;
	}

	public void setEndTime(Long endTime) {
		this.endTime = endTime;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getStudyDate() {
		return studyDate;
	}

	public void setStudyDate(String studyDate) {
		this.studyDate = studyDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public StudentRequest getObjStudentRequest() {
		return objStudentRequest;
	}

	public void setObjStudentRequest(StudentRequest objStudentRequest) {
		this.objStudentRequest = objStudentRequest;
	}

	public TutorRequest getObjTutorRequest() {
		return objTutorRequest;
	}

	public void setObjTutorRequest(TutorRequest objTutorRequest) {
		this.objTutorRequest = objTutorRequest;
	}

	public Collection<CourseDetail> getListCourseDetail() {
		return listCourseDetail;
	}

	public void setListCourseDetail(Collection<CourseDetail> listCourseDetail) {
		this.listCourseDetail = listCourseDetail;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public Boolean getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(Boolean paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
	
}
