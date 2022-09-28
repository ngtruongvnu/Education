package akadon.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="Admin")
public class Admin {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="adminId")
	private Integer adminId;
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
	@Column(name="role")
	private String role;
	@Column(name="status")
	private Boolean status;
	@Column(name="image")
	private String image;
	@Column(name="verificationCode")
	private String verificationCode;
	@Column(name="otpRequestTime")
	private Date otpRequestTime;
	public Admin() {
		super();
	}
	public Admin(Integer adminId, String email, String password, String fullName, Boolean gender, String city,
			String district, String ward, String phonenumber, Date birthday, String role, Boolean status, String image,
			String verificationCode, Date otpRequestTime) {
		super();
		this.adminId = adminId;
		this.email = email;
		this.password = password;
		this.fullName = fullName;
		this.gender = gender;
		this.city = city;
		this.district = district;
		this.ward = ward;
		this.phonenumber = phonenumber;
		this.birthday = birthday;
		this.role = role;
		this.status = status;
		this.image = image;
		this.verificationCode = verificationCode;
		this.otpRequestTime = otpRequestTime;
	}
	public Integer getAdminId() {
		return adminId;
	}
	public void setAdminId(Integer adminId) {
		this.adminId = adminId;
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
	public String getRole() {
		return role;
	}
	public void setRole(String role) { this.role = role; }
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
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
	
	
}
