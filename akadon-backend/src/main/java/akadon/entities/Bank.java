package akadon.entities;

import java.util.Collection;

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
@Table(name="Bank")
public class Bank {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="bankId")
	private Integer bankId;
	@Column(name="bankName")
	private String bankName;
	@Column(name="bankAbbreviations")
	private String bankAbbreviations;
	@Column(name="bankLogo")
	private String bankLogo;
	@JsonIgnore
	@OneToMany(mappedBy = "objBank", cascade = CascadeType.ALL)
	private Collection<TutorBankInfo> listTutorBank;
	@JsonIgnore
	@OneToMany(mappedBy = "objBank", cascade = CascadeType.ALL)
	private Collection<StudentBankInfo> listStudentBank;
	public Bank() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Bank(Integer bankId, String bankName, String bankAbbreviations, String bankLogo,
			Collection<TutorBankInfo> listTutorBank, Collection<StudentBankInfo> listStudentBank) {
		super();
		this.bankId = bankId;
		this.bankName = bankName;
		this.bankAbbreviations = bankAbbreviations;
		this.bankLogo = bankLogo;
		this.listTutorBank = listTutorBank;
		this.listStudentBank = listStudentBank;
	}
	public Integer getBankId() {
		return bankId;
	}
	public void setBankId(Integer bankId) {
		this.bankId = bankId;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public String getBankAbbreviations() {
		return bankAbbreviations;
	}
	public void setBankAbbreviations(String bankAbbreviations) {
		this.bankAbbreviations = bankAbbreviations;
	}
	public String getBankLogo() {
		return bankLogo;
	}
	public void setBankLogo(String bankLogo) {
		this.bankLogo = bankLogo;
	}
	public Collection<TutorBankInfo> getListTutorBank() {
		return listTutorBank;
	}
	public void setListTutorBank(Collection<TutorBankInfo> listTutorBank) {
		this.listTutorBank = listTutorBank;
	}
	public Collection<StudentBankInfo> getListStudentBank() {
		return listStudentBank;
	}
	public void setListStudentBank(Collection<StudentBankInfo> listStudentBank) {
		this.listStudentBank = listStudentBank;
	}
	
	
}
