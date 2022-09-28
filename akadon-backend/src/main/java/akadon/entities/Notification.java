package akadon.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Notifications")
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="notificationId")
	private Integer notificationId;
	@Column(name="accountEmail")
	private String accountEmail;
	@Column(name="title")
	private String title;
	@Column(name="content")
	private String content;
	@Column(name="link")
	private String link;
	@Column(name="notificationTime")
	private Date notificationTime;
	@Column(name="seen")
	private Boolean seen;
	public Notification() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Notification(Integer notificationId, String accountEmail, String title, String content,
			Date notificationTime,String link, Boolean seen) {
		super();
		this.notificationId = notificationId;
		this.accountEmail = accountEmail;
		this.title = title;
		this.content = content;
		this.notificationTime = notificationTime;
		this.link = link;
		this.seen = seen;
	}
	public Integer getNotificationId() {
		return notificationId;
	}
	public void setNotificationId(Integer notificationId) {
		this.notificationId = notificationId;
	}
	public String getAccountEmail() {
		return accountEmail;
	}
	public void setAccountEmail(String accountEmail) {
		this.accountEmail = accountEmail;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getNotificationTime() {
		return notificationTime;
	}
	public void setNotificationTime(Date notificationTime) {
		this.notificationTime = notificationTime;
	}
	public Boolean getSeen() {
		return seen;
	}
	public void setSeen(Boolean seen) {
		this.seen = seen;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	
	
}
