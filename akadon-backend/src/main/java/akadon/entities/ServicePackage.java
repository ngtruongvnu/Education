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
@Table(name="ServicePackage")
public class ServicePackage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="servicePackageId")
	private Integer servicePackageId;
	@Column(name="servicePackageName")
	private String servicePackageName;
	@Column(name="maxStudents")
	private Integer maxStudents;
	@Column(name="maxRequest")
	private Integer maxRequest;
	@Column(name="pricePerMonth")
	private Double pricePerMonth;
	@JsonIgnore
	@OneToMany(mappedBy = "objServicePackage", cascade = CascadeType.ALL)
	private Collection<Tutor> listTutor;
	
	public ServicePackage() {
		super();
	}

	public ServicePackage(Integer servicePackageId, String servicePackageName, Integer maxStudents, Integer maxRequest,
			Double pricePerMonth, Collection<Tutor> listTutor) {
		super();
		this.servicePackageId = servicePackageId;
		this.servicePackageName = servicePackageName;
		this.maxStudents = maxStudents;
		this.maxRequest = maxRequest;
		this.pricePerMonth = pricePerMonth;
		this.listTutor = listTutor;
	}

	public Integer getServicePackageId() {
		return servicePackageId;
	}

	public void setServicePackageId(Integer servicePackageId) {
		this.servicePackageId = servicePackageId;
	}

	public String getServicePackageName() {
		return servicePackageName;
	}

	public void setServicePackageName(String servicePackageName) {
		this.servicePackageName = servicePackageName;
	}

	public Integer getMaxStudents() {
		return maxStudents;
	}

	public void setMaxStudents(Integer maxStudents) {
		this.maxStudents = maxStudents;
	}

	public Integer getMaxRequest() {
		return maxRequest;
	}

	public void setMaxRequest(Integer maxRequest) {
		this.maxRequest = maxRequest;
	}

	public Double getPricePerMonth() {
		return pricePerMonth;
	}

	public void setPricePerMonth(Double pricePerMonth) {
		this.pricePerMonth = pricePerMonth;
	}

	public Collection<Tutor> getListTutor() {
		return listTutor;
	}

	public void setListTutor(Collection<Tutor> listTutor) {
		this.listTutor = listTutor;
	}
	
}
