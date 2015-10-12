package vn.com.tma.hrm.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@Entity
@Table(name = "userstory")
public class UserStory implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
	private Long id;
	
	@Column(name = "name", nullable = false, unique = true)
    private String name;
	
	@OneToOne(targetEntity = User.class)
	private User owner;
	
	@OneToOne(targetEntity = UserStory.class, fetch = FetchType.EAGER)
	private UserStory parent;
	
	@OneToOne(targetEntity = Sprint.class)
	private Sprint sprint;
	
	@ManyToOne(targetEntity = Project.class, fetch = FetchType.EAGER)
	@JoinColumn(name="project_id")
	private Project project;
	
	@OneToOne(targetEntity = UserStoryStatus.class)
	private UserStoryStatus status;
	
	@ManyToOne(targetEntity = UserStoryState.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "state_id")
	private UserStoryState state;
	
	@Column(name = "business_value", nullable = true, updatable = true)
	private Long businessValue;
	
	@Column(name = "plan_est", nullable = true, updatable = true)
	private Float planEst;
	
	@Column(name = "todo_est", nullable = true, updatable = true)
	private Float todoEst;
	
	@Column(name = "actual", nullable = true, updatable = true)
	private Float actual;
	
	@Lob
    @Column(name = "note", nullable = true, updatable = true)
    private String note;
	
	@Lob
    @Column(name = "description", nullable = true, updatable = true)
    private String description;
	
	@Column(name = "point", nullable = true, updatable = true)
	private Long point;
	
	@Column(name = "velocity", nullable = true, updatable = true)
	private Long velocity;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public UserStory getParent() {
		return parent;
	}

	public void setParent(UserStory parent) {
		this.parent = parent;
	}

	public Sprint getSprint() {
		return sprint;
	}

	public void setSprint(Sprint sprint) {
		this.sprint = sprint;
	}

	public UserStoryState getState() {
		return state;
	}

	public void setState(UserStoryState state) {
		this.state = state;
	}

	public Long getBusinessValue() {
		return businessValue;
	}

	public void setBusinessValue(Long businessValue) {
		this.businessValue = businessValue;
	}

	public Float getPlanEst() {
		return planEst;
	}

	public void setPlanEst(Float planEst) {
		this.planEst = planEst;
	}

	public Float getTodoEst() {
		return todoEst;
	}

	public void setTodoEst(Float todoEst) {
		this.todoEst = todoEst;
	}

	public Float getActual() {
		return actual;
	}

	public void setActual(Float actual) {
		this.actual = actual;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Long getPoint() {
		return point;
	}

	public void setPoint(Long point) {
		this.point = point;
	}

	public UserStoryStatus getStatus() {
		return status;
	}

	public void setStatus(UserStoryStatus status) {
		this.status = status;
	}

	public Long getVelocity() {
		return velocity;
	}

	public void setVelocity(Long velocity) {
		this.velocity = velocity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
