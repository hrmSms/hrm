package vn.com.tma.hrm.entities;


import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the project database table.
 * 
 */
@Entity
//@NamedQuery(name="Project.findAll", query="SELECT p FROM Project p")
public class Project {
	//private static final long serialVersionUID = 1L;

	@Id	
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private byte active;

	private int clientId;

	@Lob
	private String description;

	@Temporal(TemporalType.TIMESTAMP)
	private Date endDate;

	private String name;

	private int projectOwner;

	@Temporal(TemporalType.TIMESTAMP)
	private Date startDate;

	public Project() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte getActive() {
		return this.active;
	}

	public void setActive(byte active) {
		this.active = active;
	}

	public int getClientId() {
		return this.clientId;
	}

	public void setClientId(int clientId) {
		this.clientId = clientId;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getProjectOwner() {
		return this.projectOwner;
	}

	public void setProjectOwner(int projectOwner) {
		this.projectOwner = projectOwner;
	}

	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

}