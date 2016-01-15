package vn.com.tma.hrm.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "task")
public class Task implements Serializable{
    
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Integer id;
    
    @Column
    private String name;   
    
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
    
    @ManyToOne(fetch = FetchType.EAGER) 
	@JoinColumn(name = "userStoryId")
    private UserStory userStory;
        
    @ManyToOne(fetch = FetchType.EAGER) 
	@JoinColumn(name = "taskStateId")
    private TaskState taskStateId;
    
    
	public Task() {
		super();
	}

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

	public UserStory getUserStory() {
		return userStory;
	}

	public void setUserStory(UserStory userStory) {
		this.userStory = userStory;
	}

	public TaskState getTaskStateId() {
		return taskStateId;
	}

	public void setTaskStateId(TaskState taskStateId) {
		this.taskStateId = taskStateId;
	}
}
