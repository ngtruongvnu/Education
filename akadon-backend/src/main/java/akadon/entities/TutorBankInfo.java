package akadon.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="TutorBankInfo")
public class TutorBankInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="tutorBankId")
	private Integer tutorBankId;
	@Column(name="accountNumber")
	private String accountNumber;
	@Column(name="surplus")
	private Double surplus;
	@Column(name="defaultBank")
	private Boolean defaultBank;
	@ManyToOne()
	@JoinColumn(name="tutorId", referencedColumnName = "tutorId")
	private Tutor objTutor;
	@ManyToOne()
	@JoinColumn(name="bankId", referencedColumnName = "bankId")
	private Bank objBank;
	public TutorBankInfo() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public TutorBankInfo(Integer tutorBankId, String accountNumber, Double surplus, Boolean defaultBank, Tutor objTutor,
			Bank objBank) {
		super();
		this.tutorBankId = tutorBankId;
		this.accountNumber = accountNumber;
		this.surplus = surplus;
		this.defaultBank = defaultBank;
		this.objTutor = objTutor;
		this.objBank = objBank;
	}

	public Integer getTutorBankId() {
		return tutorBankId;
	}
	public void setTutorBankId(Integer tutorBankId) {
		this.tutorBankId = tutorBankId;
	}
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public Double getSurplus() {
		return surplus;
	}
	public void setSurplus(Double surplus) {
		this.surplus = surplus;
	}
	public Tutor getObjTutor() {
		return objTutor;
	}
	public void setObjTutor(Tutor objTutor) {
		this.objTutor = objTutor;
	}
	public Bank getObjBank() {
		return objBank;
	}
	public void setObjBank(Bank objBank) {
		this.objBank = objBank;
	}
	
	public Boolean getDefaultBank() {
		return defaultBank;
	}

	public void setDefaultBank(Boolean defaultBank) {
		this.defaultBank = defaultBank;
	}
	
}
