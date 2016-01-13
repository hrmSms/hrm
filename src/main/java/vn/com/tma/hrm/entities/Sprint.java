package vn.com.tma.hrm.entities;

import java.io.Serializable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.Date;
import java.util.List;

/**
 * The persistent class for the sprint database table.
 * 
 */
@Entity
@Table(name = "Sprint")
@NamedQuery(name = "Sprint.findAll", query = "SELECT s FROM Sprint s")
public class Sprint implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Integer id;

    @Column(name = "active", nullable = false)
    @NotNull
    private Byte active;

    @Column(name = "actuals", nullable = true)
    private Float actuals;

    @Lob
    @Column(name = "description", nullable = true)
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "endDate", nullable = false)
    @NotNull
    private Date endDate;

    @Column(name = "name", nullable = false)
    @NotNull
    private String name;

    @Lob
    @Column(name = "note", nullable = true)
    private String note;

    @Column(name = "planEstimate", nullable = true)
    private Float planEstimate;

    @Column(name = "planVelocity", nullable = true)
    private Float planVelocity;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "startDate", nullable = false)
    @NotNull
    private Date startDate;

    @Column(name = "taskEstimate", nullable = true)
    private Float taskEstimate;

    @Column(name = "toDo", nullable = true)
    private Float toDo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "StateID")
    @JsonDeserialize(as = SprintState.class)
    @NotNull
    private SprintState sprintstate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ProjectID")
    @JsonDeserialize(as = Project.class)
    @NotNull
    private Project project;

    // bi-directional many-to-one association to User Story
    @JsonIgnore
    @OneToMany(mappedBy = "sprint", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<UserStory> userStories;

    public Sprint() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Float getPlanEstimate() {
        return this.planEstimate;
    }

    public void setPlanEstimate(Float planEstimate) {
        this.planEstimate = planEstimate;
    }

    public Float getPlanVelocity() {
        return this.planVelocity;
    }

    public void setPlanVelocity(Float planVelocity) {
        this.planVelocity = planVelocity;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Float getTaskEstimate() {
        return this.taskEstimate;
    }

    public void setTaskEstimate(Float taskEstimate) {
        this.taskEstimate = taskEstimate;
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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<UserStory> getUserStories() {
        return userStories;
    }

    public void setUserStories(List<UserStory> userStories) {
        this.userStories = userStories;
    }

}