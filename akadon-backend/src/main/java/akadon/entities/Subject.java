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
@Table(name="Subject")
public class Subject {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="subjectId")
	private Integer subjectId;
	@Column(name="subjectName")
	private String subjectName;
	@Column(name="subjectImage")
	private String subjectImage;
	@JsonIgnore
	@OneToMany(mappedBy = "objSubject", cascade = CascadeType.ALL)
	private Collection<TutorDetail> listTutorDetail;
	@JsonIgnore
	@OneToMany(mappedBy = "objSubject", cascade = CascadeType.ALL)
	private Collection<StudentRequest> listStudentRequest;
	public Subject() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Subject(Integer subjectId, String subjectName, String subjectImage, Collection<TutorDetail> listTutorDetail,
			Collection<StudentRequest> listStudentRequest) {
		super();
		this.subjectId = subjectId;
		this.subjectName = subjectName;
		this.subjectImage = subjectImage;
		this.listTutorDetail = listTutorDetail;
		this.listStudentRequest = listStudentRequest;
	}
	public Integer getSubjectId() {
		return subjectId;
	}
	public void setSubjectId(Integer subjectId) {
		this.subjectId = subjectId;
	}
	public String getSubjectName() {
		return subjectName;
	}
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
	public String getSubjectImage() {
		return subjectImage;
	}
	public void setSubjectImage(String subjectImage) {
		this.subjectImage = subjectImage;
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
