package vn.com.tma.hrm.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.*;

@Entity
public class Task {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    
    @Column
    private String name;   
    
    @Column
    private int assignee;
    
    @Column
    private int taskEst;
    
    @Column
    private int toDo;
      
    @Column
    private int spentTime;
    
    @Column
    private Date startDate;
    
    @Column
    private Date endDate;
    
    @Column
    private int owner;
    
    @Column
    private String description;
    
    @Column
    private String note;
    
    @Column
    private int userStoryId;
    
    @Column
    private int taskStatusId;
    
    @Column
    private int taskStateId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAssignee() {
		return assignee;
	}

	public void setAssignee(int assignee) {
		this.assignee = assignee;
	}

	public int getTaskEst() {
		return taskEst;
	}

	public void setTaskEst(int taskEst) {
		this.taskEst = taskEst;
	}

	public int getToDo() {
		return toDo;
	}

	public void setToDo(int toDo) {
		this.toDo = toDo;
	}

	public int getSpentTime() {
		return spentTime;
	}

	public void setSpentTime(int spentTime) {
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

	public int getOwner() {
		return owner;
	}

	public void setOwner(int owner) {
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

	public int getTaskStatusId() {
		return taskStatusId;
	}

	public void setTaskStatusId(int taskStatusId) {
		this.taskStatusId = taskStatusId;
	}

	public int getTaskStateId() {
		return taskStateId;
	}

	public void setTaskStateId(int taskStateId) {
		this.taskStateId = taskStateId;
	}
}
