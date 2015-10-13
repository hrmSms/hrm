package vn.com.tma.hrm.model;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotEmpty;
import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.entities.UserStory;
import vn.com.tma.hrm.entities.UserStoryState;

public class UserStoryInputForm implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@NotNull
	private Byte active = null;
	
	@NotEmpty
	private String name = "";
	
	private User owner = null;
	
	@NotNull
	private Project project = null;
	
	@NotNull
	private UserStoryState userStoryState = null;
	
	private Date buildDate = null;
	
	private UserStory parent = null;
		
	private Float planEst;
	
	private Float todoEst;
	
	private Float actual;
	
    private String description = "";
    
	private Sprint sprint = null;

	private Long velocity;
    
	private Long businessValue;

	private Long point;
	
    private String note = "";

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

	public UserStoryState getUserStoryState() {
		return userStoryState;
	}

	public void setUserStoryState(UserStoryState userStoryState) {
		this.userStoryState = userStoryState;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Sprint getSprint() {
		return sprint;
	}

	public void setSprint(Sprint sprint) {
		this.sprint = sprint;
	}

	public Long getVelocity() {
		return velocity;
	}

	public void setVelocity(Long velocity) {
		this.velocity = velocity;
	}

	public Long getBusinessValue() {
		return businessValue;
	}

	public void setBusinessValue(Long businessValue) {
		this.businessValue = businessValue;
	}

	public Long getPoint() {
		return point;
	}

	public void setPoint(Long point) {
		this.point = point;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public Byte getActive() {
		return active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	public Date getBuildDate() {
		return buildDate;
	}

	public void setBuildDate(Date buildDate) {
		this.buildDate = buildDate;
	}

	public UserStory getParent() {
		return parent;
	}

	public void setParent(UserStory parent) {
		this.parent = parent;
	}
}
