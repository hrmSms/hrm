package vn.com.tma.hrm.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Task {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    
    @Column
    private String name;
    
    @Column
    private String owner;
    
    @Column
    private String taskEST;
    
    @Column
    private String toDo;
    
    @Column
    private String actual;
    
    @Column
    private String timeSpent;
    
    @Column
    private String description;
    
    @Column
    private String attachments;
    
    @Column
    private String note;
    
    @Column
    private String userStoryId;
    
    @Column
    private String projectId;
    
    @Column
    private String taskStatusId;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getEstimation() {
        return estimation;
    }

    public void setEstimation(Float estimation) {
        this.estimation = estimation;
    }
}
