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
@Table(name="StudentBankInfo")
public class StudentBankInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="studentBankId")
	private Integer studentBankId;
	@Column(name="accountNumber")
	private String accountNumber;
	@Column(name="surplus")
	private Double surplus;
	@Column(name="defaultBank")
	private Boolean defaultBank;
	
	@ManyToOne()
	@JoinColumn(name="studentId", referencedColumnName = "studentId")
	private Student objStudent;
	@ManyToOne()
	@JoinColumn(name="bankId", referencedColumnName = "bankId")
	private Bank objBank;
	
	
	public StudentBankInfo() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public StudentBankInfo(Integer studentBankId, String accountNumber, Double surplus, Boolean defaultBank,
			Student objStudent, Bank objBank) {
		super();
		this.studentBankId = studentBankId;
		this.accountNumber = accountNumber;
		this.surplus = surplus;
		this.defaultBank = defaultBank;
		this.objStudent = objStudent;
		this.objBank = objBank;
	}

	public Integer getStudentBankId() {
		return studentBankId;
	}
	public void setStudentBankId(Integer studentBankId) {
		this.studentBankId = studentBankId;
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
	public Student getObjStudent() {
		return objStudent;
	}
	public void setObjStudent(Student objStudent) {
		this.objStudent = objStudent;
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
