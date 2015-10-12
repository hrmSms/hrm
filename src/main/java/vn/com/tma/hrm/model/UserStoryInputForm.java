package vn.com.tma.hrm.model;

import java.io.Serializable;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.entities.UserStoryState;
import vn.com.tma.hrm.entities.UserStoryStatus;

public class UserStoryInputForm implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@NotEmpty
	private String name = "";
	
	private User owner = null;
	
	@NotNull
	private Project project = null;
	
	@NotNull
	private UserStoryState userStoryState = null;
	
	private UserStoryStatus userStoryStatus = null;
	
/*	@Pattern.List({
		@Pattern(regexp="[-+]?[0-9]*.?[0-9]+"),
		@Pattern(regexp="^s*$")
	})*/
	private Float planEst;
	
/*	@Pattern.List({
		@Pattern(regexp="[-+]?[0-9]*.?[0-9]+"),
		@Pattern(regexp="^s*$")
	})*/
	private Float todoEst;
	
/*	@Pattern.List({
		@Pattern(regexp="[-+]?[0-9]*.?[0-9]+"),
		@Pattern(regexp="^s*$")
	})*/
	private Float actual;
	
    private String description = "";
    
	private Sprint sprint = null;
	
	/*@Pattern.List({
		@Pattern(regexp="^(0|[1-9][0-9]*)$"),
		@Pattern(regexp="^s*$")
	})*/
	private Long velocity;
    
/*	@Pattern.List({
		@Pattern(regexp="^(0|[1-9][0-9]*)$"),
		@Pattern(regexp="^s*$")
	})*/
	private Long businessValue;
	
/*	@Pattern.List({
		@Pattern(regexp="^(0|[1-9][0-9]*)$"),
		@Pattern(regexp="^s*$")
	})*/
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

	public UserStoryStatus getUserStoryStatus() {
		return userStoryStatus;
	}

	public void setUserStoryStatus(UserStoryStatus userStoryStatus) {
		this.userStoryStatus = userStoryStatus;
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
}
