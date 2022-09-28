package akadon.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="UserQuestion")
public class UserQuestion {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="userQuestionId")
	private Integer userQuestionId;
	@Column(name="fullName")
	private String fullName;
	@Column(name="phoneNumber")
	private String phoneNumber;
	@Column(name="sendEmail")
	private String sendEmail;
	@Column(name="content")
	private String content;
	@Column(name="askDate")
	private Date askDate;
	@Column(name="seen")
	private Boolean seen;
	
	public UserQuestion() {
		super();
	}

	public UserQuestion(Integer userQuestionId, String fullName, String phoneNumber, String sendEmail,
			String content, Date askDate, Boolean seen) {
		super();
		this.userQuestionId = userQuestionId;
		this.fullName = fullName;
		this.phoneNumber = phoneNumber;
		this.sendEmail = sendEmail;
		this.content = content;
		this.askDate = askDate;
		this.seen = seen;
	}

	public Integer getUserQuestionId() {
		return userQuestionId;
	}

	public void setUserQuestionId(Integer userQuestionId) {
		this.userQuestionId = userQuestionId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getSendEmail() {
		return sendEmail;
	}

	public void setSendEmail(String sendEmail) {
		this.sendEmail = sendEmail;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getAskDate() {
		return askDate;
	}

	public void setAskDate(Date askDate) {
		this.askDate = askDate;
	}

	public Boolean getSeen() {
		return seen;
	}

	public void setSeen(Boolean seen) {
		this.seen = seen;
	}

	
	
	
}
