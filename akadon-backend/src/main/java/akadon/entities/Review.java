package akadon.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Review")
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="commentId")
	private Integer commentId;
	@Column(name="sendCommentEmail")
	private String sendCommentEmail;
	@Column(name="receiveCommentEmail")
	private String receiveCommentEmail;
	@Column(name="comment")
	private String comment;
	@Column(name="sendName")
	private String sendName;
	@Column(name="receiveName")
	private String receiveName;
	@Column(name="rating")
	private Integer rating;
	@Column(name="commentDate")
	private Date commentDate;
	public Review() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Review(Integer commentId, String sendCommentEmail, String sendName, String receiveName, String receiveCommentEmail, String comment,
			Integer rating, Date commentDate) {
		super();
		this.commentId = commentId;
		this.sendCommentEmail = sendCommentEmail;
		this.sendName = sendName;
		this.receiveName = receiveName;
		this.receiveCommentEmail = receiveCommentEmail;
		this.comment = comment;
		this.rating = rating;
		this.commentDate = commentDate;
	}
	public Integer getCommentId() {
		return commentId;
	}
	public void setCommentId(Integer commentId) {
		this.commentId = commentId;
	}
	public String getSendCommentEmail() {
		return sendCommentEmail;
	}
	public void setSendCommentEmail(String sendCommentEmail) {
		this.sendCommentEmail = sendCommentEmail;
	}
	public String getReceiveCommentEmail() {
		return receiveCommentEmail;
	}
	public void setReceiveCommentEmail(String receiveCommentEmail) {
		this.receiveCommentEmail = receiveCommentEmail;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getSendName() {
		return sendName;
	}
	public void setSendName(String sendName) {
		this.sendName = sendName;
	}
	public Integer getRating() {
		return rating;
	}
	public void setRating(Integer rating) {
		this.rating = rating;
	}
	public Date getCommentDate() {
		return commentDate;
	}
	public void setCommentDate(Date commentDate) {
		this.commentDate = commentDate;
	}
	public String getReceiveName() {
		return receiveName;
	}
	public void setReceiveName(String receiveName) {
		this.receiveName = receiveName;
	}
	
	
}
