package akadon.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="Schedule")
public class Schedule {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="Id")
	private Integer id;
	@Column(name="Subject")
	private String subject;
	@Column(name="StartTime")
	private Long startTime;
	@Column(name="EndTime")
	private Long endTime;
	
	@ManyToOne()
	@JoinColumn(name = "tutorId", referencedColumnName = "tutorId")
	private Tutor objTutor;
	@ManyToOne()
	@JoinColumn(name = "studentId", referencedColumnName = "studentId")
	private Student objStudent;
	
	public Schedule() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Schedule(Integer id, String subject, Long startTime, Long endTime, Tutor objTutor, Student objStudent) {
		super();
		this.id = id;
		this.subject = subject;
		this.startTime = startTime;
		this.endTime = endTime;
		this.objTutor = objTutor;
		this.objStudent = objStudent;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
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

	public Tutor getObjTutor() {
		return objTutor;
	}

	public void setObjTutor(Tutor objTutor) {
		this.objTutor = objTutor;
	}

	public Student getObjStudent() {
		return objStudent;
	}

	public void setObjStudent(Student objStudent) {
		this.objStudent = objStudent;
	}

	
	
}
