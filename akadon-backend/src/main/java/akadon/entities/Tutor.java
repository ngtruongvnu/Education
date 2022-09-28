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
@Table(name="Tutor")
public class Tutor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="tutorId")
	private Integer tutorId;
	@Column(name="email")
	private String email;
	@Column(name="password")
	private String password;
	@Column(name="fullname")
	private String fullName;
	@Column(name="gender")
	private Boolean gender;
	@Column(name="city")
	private String city;
	@Column(name="district")
	private String district;
	@Column(name="ward")
	private String ward;
	@Column(name="phonenumber")
	private String phonenumber;
	@Column(name="birthday")
	private Date birthday;
	@Column(name="image")
	private String image;
	@Column(name="rating")
	private Integer rating;
	@Column(name="behaviorPoint")
	private Integer behaviorPoint;
	@Column(name="role")
	private String role;
	@Column(name="taughtStudentNumber")
	private Integer taughtStudentNumber;
	@Column(name="taughtCourseNumber")
	private Integer taughtCourseNumber;
	@Column(name="status")
	private Boolean status;
	@Column(name="verificationCode")
	private String verificationCode;
	@Column(name="otpRequestTime")
	private Date otpRequestTime;
	@Column(name="lastLogin")
	private Date lastLogin;
	@ManyToOne()
	@JoinColumn(name="servicePackageId", referencedColumnName = "servicePackageId")
	private ServicePackage objServicePackage;
	@JsonIgnore
	@OneToMany(mappedBy = "objTutor", cascade = CascadeType.ALL)
	private Collection<TutorDetail> listTutorDetail;
	@JsonIgnore
	@OneToMany(mappedBy = "objTutor", cascade = CascadeType.ALL)
	private Collection<Schedule> listSchedule;
	@JsonIgnore
	@OneToMany(mappedBy = "objTutor", cascade = CascadeType.ALL)
	private Collection<TutorBankInfo> listTutorBank;
	@JsonIgnore
	@OneToMany(mappedBy = "objTutor", cascade = CascadeType.ALL)
	private Collection<TutorRequest> listTutorRequest;
	
	public Tutor() {
		super();
	}

	public Tutor(Integer tutorId, String email, String password, String fullName, Boolean gender, String city,
			String district, String ward, String phonenumber, Date birthday, String image, Integer rating,
			Integer behaviorPoint, String role, Integer taughtStudentNumber, Integer taughtCourseNumber, Boolean status,
			String verificationCode, Date otpRequestTime, Date lastLogin, ServicePackage objServicePackage,
			Collection<TutorDetail> listTutorDetail, Collection<Schedule> listSchedule,
			Collection<TutorBankInfo> listTutorBank, Collection<TutorRequest> listTutorRequest) {
		super();
		this.tutorId = tutorId;
		this.email = email;
		this.password = password;
		this.fullName = fullName;
		this.gender = gender;
		this.city = city;
		this.district = district;
		this.ward = ward;
		this.phonenumber = phonenumber;
		this.birthday = birthday;
		this.image = image;
		this.rating = rating;
		this.behaviorPoint = behaviorPoint;
		this.role = role;
		this.taughtStudentNumber = taughtStudentNumber;
		this.taughtCourseNumber = taughtCourseNumber;
		this.status = status;
		this.verificationCode = verificationCode;
		this.otpRequestTime = otpRequestTime;
		this.lastLogin = lastLogin;
		this.objServicePackage = objServicePackage;
		this.listTutorDetail = listTutorDetail;
		this.listSchedule = listSchedule;
		this.listTutorBank = listTutorBank;
		this.listTutorRequest = listTutorRequest;
	}

	public Integer getTutorId() {
		return tutorId;
	}

	public void setTutorId(Integer tutorId) {
		this.tutorId = tutorId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Boolean getGender() {
		return gender;
	}

	public void setGender(Boolean gender) {
		this.gender = gender;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getWard() {
		return ward;
	}

	public void setWard(String ward) {
		this.ward = ward;
	}

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public Integer getBehaviorPoint() {
		return behaviorPoint;
	}

	public void setBehaviorPoint(Integer behaviorPoint) {
		this.behaviorPoint = behaviorPoint;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Integer getTaughtStudentNumber() {
		return taughtStudentNumber;
	}

	public void setTaughtStudentNumber(Integer taughtStudentNumber) {
		this.taughtStudentNumber = taughtStudentNumber;
	}

	public Integer getTaughtCourseNumber() {
		return taughtCourseNumber;
	}

	public void setTaughtCourseNumber(Integer taughtCourseNumber) {
		this.taughtCourseNumber = taughtCourseNumber;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getVerificationCode() {
		return verificationCode;
	}

	public void setVerificationCode(String verificationCode) {
		this.verificationCode = verificationCode;
	}

	public Date getOtpRequestTime() {
		return otpRequestTime;
	}

	public void setOtpRequestTime(Date otpRequestTime) {
		this.otpRequestTime = otpRequestTime;
	}

	public Date getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(Date lastLogin) {
		this.lastLogin = lastLogin;
	}

	public ServicePackage getObjServicePackage() {
		return objServicePackage;
	}

	public void setObjServicePackage(ServicePackage objServicePackage) {
		this.objServicePackage = objServicePackage;
	}

	public Collection<TutorDetail> getListTutorDetail() {
		return listTutorDetail;
	}

	public void setListTutorDetail(Collection<TutorDetail> listTutorDetail) {
		this.listTutorDetail = listTutorDetail;
	}

	public Collection<Schedule> getListSchedule() {
		return listSchedule;
	}

	public void setListSchedule(Collection<Schedule> listSchedule) {
		this.listSchedule = listSchedule;
	}

	public Collection<TutorBankInfo> getListTutorBank() {
		return listTutorBank;
	}

	public void setListTutorBank(Collection<TutorBankInfo> listTutorBank) {
		this.listTutorBank = listTutorBank;
	}

	public Collection<TutorRequest> getListTutorRequest() {
		return listTutorRequest;
	}

	public void setListTutorRequest(Collection<TutorRequest> listTutorRequest) {
		this.listTutorRequest = listTutorRequest;
	}

		
}
