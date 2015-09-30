package vn.com.tma.hrm.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * The persistent class for the project database table.
 * 
 */
@Entity
@NamedQuery(name = "Project.findAll", query = "SELECT p FROM Project p")
public class Project implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private Integer id;

    private byte active;

    private Integer clientId;

    @Lob
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    private String name;

    private Integer projectOwner;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    // bi-directional many-to-one association to Sprint
    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Sprint> sprints;

    public Project() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public byte getActive() {
        return this.active;
    }

    public void setActive(byte active) {
        this.active = active;
    }

    public Integer getClientId() {
        return this.clientId;
    }

    public void setClientId(Integer clientId) {
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

    public Integer getProjectOwner() {
        return this.projectOwner;
    }

    public void setProjectOwner(Integer projectOwner) {
        this.projectOwner = projectOwner;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    @JsonIgnore
    public List<Sprint> getSprints() {
        return this.sprints;
    }

    public void setSprints(List<Sprint> sprints) {
        this.sprints = sprints;
    }

    public Sprint addSprint(Sprint sprint) {
        getSprints().add(sprint);
        sprint.setProject(this);

        return sprint;
    }

    public Sprint removeSprint(Sprint sprint) {
        getSprints().remove(sprint);
        sprint.setProject(null);

        return sprint;
    }

}