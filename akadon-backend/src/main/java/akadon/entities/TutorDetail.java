package akadon.entities;

import java.util.Collection;

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
@Table(name="TutorDetail")
public class TutorDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="tutorDetailId")
	private Integer tutorDetailId;
	
	@ManyToOne()
	@JoinColumn(name="tutorId", referencedColumnName = "tutorId")
	private Tutor objTutor;
	
	@ManyToOne()
	@JoinColumn(name="subjectId", referencedColumnName = "subjectId")
	private Subject objSubject;
	
	@ManyToOne()
	@JoinColumn(name="levelId", referencedColumnName = "levelId")
	private Level objLevel;
	
	
	public TutorDetail() {
		super();
	}


	public TutorDetail(Integer tutorDetailId, Tutor objTutor, Subject objSubject, Level objLevel
			) {
		super();
		this.tutorDetailId = tutorDetailId;
		this.objTutor = objTutor;
		this.objSubject = objSubject;
		this.objLevel = objLevel;
	}


	public Integer getTutorDetailId() {
		return tutorDetailId;
	}


	public void setTutorDetailId(Integer tutorDetailId) {
		this.tutorDetailId = tutorDetailId;
	}

	public Tutor getObjTutor() {
		return objTutor;
	}


	public void setObjTutor(Tutor objTutor) {
		this.objTutor = objTutor;
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


}
