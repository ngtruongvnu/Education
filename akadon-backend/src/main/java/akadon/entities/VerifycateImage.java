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
@Table(name="VerifycateImage")
public class VerifycateImage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="verifycateImageId")
	private Integer verifycateImageId;
	
	@Column(name="verifycateType")
	private String verifycateType;
	@Column(name="verifyImage")
	private String verifyImage;
	@Column(name="verifyValue")
	private String verifyValue;
	@Column(name="verifyYear")
	private String verifyYear;
	
	@ManyToOne()
	@JoinColumn(name="tutorId", referencedColumnName = "tutorId")
	private Tutor objTutor;
	
	public VerifycateImage() {
		super();
	}

	public VerifycateImage(Integer verifycateImageId, String verifycateType, String verifyImage, String verifyValue,
			String verifyYear, Tutor objTutor) {
		super();
		this.verifycateImageId = verifycateImageId;
		this.verifycateType = verifycateType;
		this.verifyImage = verifyImage;
		this.verifyValue = verifyValue;
		this.verifyYear = verifyYear;
		this.objTutor = objTutor;
	}

	public Integer getVerifycateImageId() {
		return verifycateImageId;
	}

	public void setVerifycateImageId(Integer verifycateImageId) {
		this.verifycateImageId = verifycateImageId;
	}

	public String getVerifycateType() {
		return verifycateType;
	}

	public void setVerifycateType(String verifycateType) {
		this.verifycateType = verifycateType;
	}

	public String getVerifyImage() {
		return verifyImage;
	}

	public void setVerifyImage(String verifyImage) {
		this.verifyImage = verifyImage;
	}

	public String getVerifyValue() {
		return verifyValue;
	}

	public void setVerifyValue(String verifyValue) {
		this.verifyValue = verifyValue;
	}

	public String getVerifyYear() {
		return verifyYear;
	}

	public void setVerifyYear(String verifyYear) {
		this.verifyYear = verifyYear;
	}

	public Tutor getObjTutor() {
		return objTutor;
	}

	public void setObjTutor(Tutor objTutor) {
		this.objTutor = objTutor;
	}
	

}
