package vn.com.tma.hrm.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import java.util.*;

@Entity
public class Task implements java.io.Serializable{
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "TASK_ID", unique = true, nullable = false)
    private Integer id;
    
    @Column
    private String name;   
    
    @Column
    private Integer assignee;
    
    @Column
    private Integer taskEst;
    
    @Column
    private Integer toDo;
      
    @Column
    private Integer spentTime;
    
    @Column
    private Date startDate;
    
    @Column
    private Date endDate;
    
    @ManyToOne(fetch = FetchType.EAGER) 
	@JoinColumn(name = "owner")
    private User owner;
    
    @Column
    private String description;
    
    @Column
    private String note;
    
    @Column
    private Integer userStoryId;
    
    @Column
    private Integer taskStatusId;
    
    @Column
    private Integer taskStateId;
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAssignee() {
		return assignee;
	}

	public void setAssignee(Integer assignee) {
		this.assignee = assignee;
	}

	public Integer getTaskEst() {
		return taskEst;
	}

	public void setTaskEst(Integer taskEst) {
		this.taskEst = taskEst;
	}

	public Integer getToDo() {
		return toDo;
	}

	public void setToDo(Integer toDo) {
		this.toDo = toDo;
	}

	public Integer getSpentTime() {
		return spentTime;
	}

	public void setSpentTime(Integer spentTime) {
		this.spentTime = spentTime;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) { 
		this.startDate = startDate;
	}
 
	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	
	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public int getUserStoryId() {
		return userStoryId;
	}

	public void setUserStoryId(int userStoryId) {
		this.userStoryId = userStoryId;
	}

	public Integer getTaskStatusId() {
		return taskStatusId;
	}

	public void setTaskStatusId(Integer taskStatusId) {
		this.taskStatusId = taskStatusId;
	}

	public Integer getTaskStateId() {
		return taskStateId;
	}

	public void setTaskStateId(Integer taskStateId) {
		this.taskStateId = taskStateId;
	}
}
