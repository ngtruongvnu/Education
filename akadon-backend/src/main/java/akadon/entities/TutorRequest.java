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
@Table(name = "TutorRequest")
public class TutorRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "tutorRequestId")
	private Integer tutorRequestId;
	@Column(name = "receiveDate")
	private Date receiveDate;
	@Column(name = "requestType")
	private String requestType;
	@Column(name = "status")
	private String status;
	@Column(name = "testDate")
	private Long testDate;
	@ManyToOne()
	@JoinColumn(name = "tutorId", referencedColumnName = "tutorId")
	private Tutor objTutor;
	
	@ManyToOne()
	@JoinColumn(name = "studentRequestId", referencedColumnName = "studentRequestId")
	private StudentRequest objStudentRequest;
	
	@JsonIgnore
	@OneToMany(mappedBy = "objTutorRequest", cascade = CascadeType.ALL)
	private Collection<Course> listCourse;
	
	public TutorRequest() {
		super();
	}

	public TutorRequest(Integer tutorRequestId, Date receiveDate, String requestType, String status, Tutor objTutor,
			StudentRequest objStudentRequest, Collection<Course> listCourse,Long testDate) {
		super();
		this.tutorRequestId = tutorRequestId;
		this.receiveDate = receiveDate;
		this.requestType = requestType;
		this.status = status;
		this.objTutor = objTutor;
		this.objStudentRequest = objStudentRequest;
		this.listCourse = listCourse;
		this.testDate = testDate;
	}

	public Integer getTutorRequestId() {
		return tutorRequestId;
	}

	public void setTutorRequestId(Integer tutorRequestId) {
		this.tutorRequestId = tutorRequestId;
	}

	public Date getReceiveDate() {
		return receiveDate;
	}

	public void setReceiveDate(Date receiveDate) {
		this.receiveDate = receiveDate;
	}

	public String getRequestType() {
		return requestType;
	}

	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Tutor getObjTutor() {
		return objTutor;
	}

	public void setObjTutor(Tutor objTutor) {
		this.objTutor = objTutor;
	}

	public StudentRequest getObjStudentRequest() {
		return objStudentRequest;
	}

	public void setObjStudentRequest(StudentRequest objStudentRequest) {
		this.objStudentRequest = objStudentRequest;
	}

	public Collection<Course> getListCourse() {
		return listCourse;
	}

	public void setListCourse(Collection<Course> listCourse) {
		this.listCourse = listCourse;
	}

	public Long getTestDate() {
		return testDate;
	}

	public void setTestDate(Long testDate) {
		this.testDate = testDate;
	}

	

}
