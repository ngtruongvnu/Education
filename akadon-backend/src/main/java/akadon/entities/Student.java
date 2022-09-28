package akadon.entities;

import java.util.Collection;
import java.util.Date;

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
@Table(name="Student")
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="studentId")
	private Integer studentId;
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
	@Column(name="status")
	private Boolean status;
	@Column(name="learntCourseNumber")
	private Integer learntCourseNumber;
	@Column(name="verificationCode")
	private String verificationCode;
	@Column(name="otpRequestTime")
	private Date otpRequestTime;
	@Column(name="lastLogin")
	private Date lastLogin;
	@JsonIgnore
	@OneToMany(mappedBy = "objStudent", cascade = CascadeType.ALL)
	private Collection<StudentRequest> listStudentRequest;
	@JsonIgnore
	@OneToMany(mappedBy = "objStudent", cascade = CascadeType.ALL)
	private Collection<Schedule> listSchedule;
	@JsonIgnore
	@OneToMany(mappedBy = "objStudent", cascade = CascadeType.ALL)
	private Collection<StudentBankInfo> listStudentBank;	
	
	public Student() {
		super();
	}

	public Student(Integer studentId, String email, String password, String fullName, Boolean gender, String city,
			String district, String ward, String phonenumber, Date birthday, String image, Integer rating,
			Integer behaviorPoint, String role, Boolean status, Integer learntCourseNumber, String verificationCode,
			Date otpRequestTime, Date lastLogin, Collection<StudentRequest> listStudentRequest,
			Collection<Schedule> listSchedule, Collection<StudentBankInfo> listStudentBank) {
		super();
		this.studentId = studentId;
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
		this.status = status;
		this.learntCourseNumber = learntCourseNumber;
		this.verificationCode = verificationCode;
		this.otpRequestTime = otpRequestTime;
		this.lastLogin = lastLogin;
		this.listStudentRequest = listStudentRequest;
		this.listSchedule = listSchedule;
		this.listStudentBank = listStudentBank;
	}

	public Integer getStudentId() {
		return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
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

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Integer getLearntCourseNumber() {
		return learntCourseNumber;
	}

	public void setLearntCourseNumber(Integer learntCourseNumber) {
		this.learntCourseNumber = learntCourseNumber;
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

	public Collection<StudentRequest> getListStudentRequest() {
		return listStudentRequest;
	}

	public void setListStudentRequest(Collection<StudentRequest> listStudentRequest) {
		this.listStudentRequest = listStudentRequest;
	}

	public Collection<Schedule> getListSchedule() {
		return listSchedule;
	}

	public void setListSchedule(Collection<Schedule> listSchedule) {
		this.listSchedule = listSchedule;
	}

	public Collection<StudentBankInfo> getListStudentBank() {
		return listStudentBank;
	}

	public void setListStudentBank(Collection<StudentBankInfo> listStudentBank) {
		this.listStudentBank = listStudentBank;
	}

		
}
