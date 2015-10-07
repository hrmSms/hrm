package vn.com.tma.hrm.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.*;

@Entity
public class UserStory {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    
    @Column
    private String name;   
    
    @Column
    private int owner;
    
    @Column
    private int parentId;
    
    @Column
    private int businessValue;
    
    @Column
    private int planEst;
    
    @Column
    private int taskEst;
    
    @Column
    private int todo;
    
    @Column
    private int actual;
    
    @Column
    private String note;
    
    @Column
    private int point;
    
    @Column
    private Date startDate;
    
    @Column
    private Date endDate;
    
    @Column
    private boolean active;

	public UserStory() {
		super();
	}

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

	public int getOwner() {
		return owner;
	}

	public void setOwner(int owner) {
		this.owner = owner;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public int getBusinessValue() {
		return businessValue;
	}

	public void setBusinessValue(int businessValue) {
		this.businessValue = businessValue;
	}

	public int getPlanEst() {
		return planEst;
	}

	public void setPlanEst(int planEst) {
		this.planEst = planEst;
	}

	public int getTaskEst() {
		return taskEst;
	}

	public void setTaskEst(int taskEst) {
		this.taskEst = taskEst;
	}

	public int getTodo() {
		return todo;
	}

	public void setTodo(int todo) {
		this.todo = todo;
	}

	public int getActual() {
		return actual;
	}

	public void setActual(int actual) {
		this.actual = actual;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public int getPoint() {
		return point;
	}

	public void setPoint(int point) {
		this.point = point;
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

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
