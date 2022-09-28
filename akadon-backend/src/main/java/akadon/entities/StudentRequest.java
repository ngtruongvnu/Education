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
@Table(name = "StudentRequest")
public class StudentRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "studentRequestId")
	private Integer studentRequestId;
	@Column(name = "studentRequestTitle")
	private String studentRequestTitle;
	@Column(name = "costPerHour")
	private Double costPerHour;
	@Column(name = "beginTime")
	private Long beginTime;
	@Column(name = "endTime")
	private Long endTime;
	@Column(name = "durationPerSession")
	private Double durationPerSession;
	@Column(name = "learningDate")
	private String learningDate;
	@Column(name = "introduction")
	private String introduction;
	@Column(name = "studentWishes")
	private String studentWishes;
	@Column(name = "testLearning")
	private Boolean testLearning;
	@Column(name = "learningMethod")
	private Boolean learningMethod;
	@Column(name = "createdDate")
	private Date createdDate;
	@Column(name = "status")
	private String status;
	@Column(name = "endDate")
	private Date endDate;
	@Column(name = "quantityTutorRequest")
	private Integer quantityTutorRequest;
	@Column(name = "payTime")
	private Integer payTime;
	@ManyToOne()
	@JoinColumn(name = "studentId", referencedColumnName = "studentId")
	private Student objStudent;

	@ManyToOne()
	@JoinColumn(name = "subjectId", referencedColumnName = "subjectId")
	private Subject objSubject;

	@ManyToOne()
	@JoinColumn(name = "levelId", referencedColumnName = "levelId")
	private Level objLevel;

	@JsonIgnore
	@OneToMany(mappedBy = "objStudentRequest", cascade = CascadeType.ALL)
	private Collection<Course> listCourse;

	@JsonIgnore
	@OneToMany(mappedBy = "objStudentRequest", cascade = CascadeType.ALL)
	private Collection<TutorRequest> listTutorRequest;

	public StudentRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StudentRequest(Integer studentRequestId, String studentRequestTitle, Double costPerHour, Long beginTime,
			Long endTime, Double durationPerSession, String learningDate, String introduction, String studentWishes,
			Boolean testLearning, Boolean learningMethod, Date createdDate, String status, Date endDate,
			Integer quantityTutorRequest, Student objStudent, Subject objSubject, Level objLevel,
			Collection<Course> listCourse, Collection<TutorRequest> listTutorRequest, Integer payTime) {
		super();
		this.studentRequestId = studentRequestId;
		this.studentRequestTitle = studentRequestTitle;
		this.costPerHour = costPerHour;
		this.beginTime = beginTime;
		this.endTime = endTime;
		this.durationPerSession = durationPerSession;
		this.learningDate = learningDate;
		this.introduction = introduction;
		this.studentWishes = studentWishes;
		this.testLearning = testLearning;
		this.learningMethod = learningMethod;
		this.createdDate = createdDate;
		this.status = status;
		this.endDate = endDate;
		this.quantityTutorRequest = quantityTutorRequest;
		this.objStudent = objStudent;
		this.objSubject = objSubject;
		this.objLevel = objLevel;
		this.listCourse = listCourse;
		this.listTutorRequest = listTutorRequest;
		this.payTime = payTime;
	}

	public Integer getStudentRequestId() {
		return studentRequestId;
	}

	public void setStudentRequestId(Integer studentRequestId) {
		this.studentRequestId = studentRequestId;
	}

	public String getStudentRequestTitle() {
		return studentRequestTitle;
	}

	public void setStudentRequestTitle(String studentRequestTitle) {
		this.studentRequestTitle = studentRequestTitle;
	}

	public Double getCostPerHour() {
		return costPerHour;
	}

	public void setCostPerHour(Double costPerHour) {
		this.costPerHour = costPerHour;
	}

	public Long getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(Long beginTime) {
		this.beginTime = beginTime;
	}

	public Long getEndTime() {
		return endTime;
	}

	public void setEndTime(Long endTime) {
		this.endTime = endTime;
	}

	public Double getDurationPerSession() {
		return durationPerSession;
	}

	public void setDurationPerSession(Double durationPerSession) {
		this.durationPerSession = durationPerSession;
	}

	public String getLearningDate() {
		return learningDate;
	}

	public void setLearningDate(String learningDate) {
		this.learningDate = learningDate;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public String getStudentWishes() {
		return studentWishes;
	}

	public void setStudentWishes(String studentWishes) {
		this.studentWishes = studentWishes;
	}

	public Boolean getTestLearning() {
		return testLearning;
	}

	public void setTestLearning(Boolean testLearning) {
		this.testLearning = testLearning;
	}

	public Boolean getLearningMethod() {
		return learningMethod;
	}

	public void setLearningMethod(Boolean learningMethod) {
		this.learningMethod = learningMethod;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Student getObjStudent() {
		return objStudent;
	}

	public void setObjStudent(Student objStudent) {
		this.objStudent = objStudent;
	}

	public Subject getObjSubject() {
		return objSubject;
	}

	public void setObjSubject(Subject objSubject) {
		this.objSubject = objSubject;
	}

	public Level getObjLevel() {
		return objLevel;
	}

	public void setObjLevel(Level objLevel) {
		this.objLevel = objLevel;
	}

	public Collection<Course> getListCourse() {
		return listCourse;
	}

	public void setListCourse(Collection<Course> listCourse) {
		this.listCourse = listCourse;
	}

	public Collection<TutorRequest> getListTutorRequest() {
		return listTutorRequest;
	}

	public void setListTutorRequest(Collection<TutorRequest> listTutorRequest) {
		this.listTutorRequest = listTutorRequest;
	}

	public Integer getQuantityTutorRequest() {
		return quantityTutorRequest;
	}

	public void setQuantityTutorRequest(Integer quantityTutorRequest) {
		this.quantityTutorRequest = quantityTutorRequest;
	}

	public Integer getPayTime() {
		return payTime;
	}

	public void setPayTime(Integer payTime) {
		this.payTime = payTime;
	}

}
