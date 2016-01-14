package vn.com.tma.hrm.entities;

import java.io.Serializable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * The persistent class for the sprintstate database table.
 * 
 */
@Entity
@Table(name = "SprintState")
@NamedQuery(name = "SprintState.findAll", query = "SELECT s FROM SprintState s")
public class SprintState implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Integer id;

    @Lob
    @Column(name = "description", nullable = true)
    private String description;

    @Column(name = "name", nullable = false)
    @NotNull
    private String name;

    @OneToMany(mappedBy = "sprintstate", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Sprint> sprints;

    public SprintState() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
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
        sprint.setSprintstate(this);

        return sprint;
    }

    public Sprint removeSprint(Sprint sprint) {
        getSprints().remove(sprint);
        sprint.setSprintstate(null);

        return sprint;
    }

}