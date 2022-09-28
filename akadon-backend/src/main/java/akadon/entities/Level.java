package akadon.entities;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="Level")
public class Level {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="levelId")
	private Integer levelId;
	@Column(name="levelName")
	private String levelName;
	
	@JsonIgnore
	@OneToMany(mappedBy = "objLevel", cascade = CascadeType.ALL)
	private Collection<TutorDetail> listTutorDetail;
	@JsonIgnore
	@OneToMany(mappedBy = "objLevel", cascade = CascadeType.ALL)
	private Collection<StudentRequest> listStudentRequest;
	public Level() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Level(Integer levelId, String levelName, Collection<TutorDetail> listTutorDetail,
			Collection<StudentRequest> listStudentRequest) {
		super();
		this.levelId = levelId;
		this.levelName = levelName;
		this.listTutorDetail = listTutorDetail;
		this.listStudentRequest = listStudentRequest;
	}
	public Integer getLevelId() {
		return levelId;
	}
	public void setLevelId(Integer levelId) {
		this.levelId = levelId;
	}
	public String getLevelName() {
		return levelName;
	}
	public void setLevelName(String levelName) {
		this.levelName = levelName;
	}
	public Collection<TutorDetail> getListTutorDetail() {
		return listTutorDetail;
	}
	public void setListTutorDetail(Collection<TutorDetail> listTutorDetail) {
		this.listTutorDetail = listTutorDetail;
	}
	public Collection<StudentRequest> getListStudentRequest() {
		return listStudentRequest;
	}
	public void setListStudentRequest(Collection<StudentRequest> listStudentRequest) {
		this.listStudentRequest = listStudentRequest;
	}
	
}
