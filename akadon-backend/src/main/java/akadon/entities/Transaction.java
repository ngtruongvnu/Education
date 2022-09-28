package akadon.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Transactions")
public class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "transactionId")
	private Integer transactionId;
	@Column(name = "sentEmail")
	private String sentEmail;
	@Column(name = "receiveEmail")
	private String receiveEmail;
	@Column(name = "content")
	private String content;
	@Column(name = "sendName")
	private String sendName;
	@Column(name = "receiveName")
	private String receiveName;
	@Column(name = "sentMoney")
	private Double sentMoney;
	@Column(name = "dateTransaction")
	private Date dateTransaction;

	public Transaction() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Transaction(Integer transactionId, String sentEmail, String receiveEmail, String content, String sendName,
			String receiveName, Double sentMoney, Date dateTransaction) {
		super();
		this.transactionId = transactionId;
		this.sentEmail = sentEmail;
		this.receiveEmail = receiveEmail;
		this.content = content;
		this.sendName = sendName;
		this.receiveName = receiveName;
		this.sentMoney = sentMoney;
		this.dateTransaction = dateTransaction;
	}

	public Integer getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Integer transactionId) {
		this.transactionId = transactionId;
	}

	public String getSentEmail() {
		return sentEmail;
	}

	public void setSentEmail(String sentEmail) {
		this.sentEmail = sentEmail;
	}

	public String getReceiveEmail() {
		return receiveEmail;
	}

	public void setReceiveEmail(String receiveEmail) {
		this.receiveEmail = receiveEmail;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Double getSentMoney() {
		return sentMoney;
	}

	public void setSentMoney(Double sentMoney) {
		this.sentMoney = sentMoney;
	}

	public Date getDateTransaction() {
		return dateTransaction;
	}

	public void setDateTransaction(Date dateTransaction) {
		this.dateTransaction = dateTransaction;
	}

	public String getSendName() {
		return sendName;
	}

	public void setSendName(String sendName) {
		this.sendName = sendName;
	}

	public String getReceiveName() {
		return receiveName;
	}

	public void setReceiveName(String receiveName) {
		this.receiveName = receiveName;
	}

}
