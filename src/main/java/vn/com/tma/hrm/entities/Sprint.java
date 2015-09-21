package vn.com.tma.hrm.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the sprint database table.
 * 
 */
@Entity
@NamedQuery(name="Sprint.findAll", query="SELECT s FROM Sprint s")
public class Sprint implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer sprintID;

	private Byte active;

	private Float actuals;

	@Lob
	private String description;

	@Temporal(TemporalType.TIMESTAMP)
	private Date endDate;

	private String name;

	@Lob
	private String note;

	private Float planEst;

	private Float planVelocity;

	private Integer projectID;

	@Temporal(TemporalType.TIMESTAMP)
	private Date startDate;

	private Float taskEst;

	private Float toDo;

	//bi-directional many-to-one association to Sprintstate
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="StateID")
	private SprintState sprintstate;

	public Sprint() {
	}

	public Integer getsprintID() {
		return this.sprintID;
	}

	public void setid(Integer sprintID) {
		this.sprintID = sprintID;
	}

	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	public Float getActuals() {
		return this.actuals;
	}

	public void setActuals(Float actuals) {
		this.actuals = actuals;
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

	public String getNote() {
		return this.note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Float getPlanEst() {
		return this.planEst;
	}

	public void setPlanEst(Float planEst) {
		this.planEst = planEst;
	}

	public Float getPlanVelocity() {
		return this.planVelocity;
	}

	public void setPlanVelocity(Float planVelocity) {
		this.planVelocity = planVelocity;
	}

	public Integer getProjectID() {
		return this.projectID;
	}

	public void setProjectID(Integer projectID) {
		this.projectID = projectID;
	}

	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Float getTaskEst() {
		return this.taskEst;
	}

	public void setTaskEst(Float taskEst) {
		this.taskEst = taskEst;
	}

	public Float getToDo() {
		return this.toDo;
	}

	public void setToDo(Float toDo) {
		this.toDo = toDo;
	}

	public SprintState getSprintstate() {
		return this.sprintstate;
	}

	public void setSprintstate(SprintState sprintstate) {
		this.sprintstate = sprintstate;
	}

}