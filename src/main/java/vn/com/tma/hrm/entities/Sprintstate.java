package vn.com.tma.hrm.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the sprintstate database table.
 * 
 */
@Entity
@NamedQuery(name="Sprintstate.findAll", query="SELECT s FROM Sprintstate s")
public class Sprintstate implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer sprintStateID;

	@Lob
	private String description;

	private String name;

	//bi-directional many-to-one association to Sprint
	@OneToMany(mappedBy="sprintstate")
	private List<Sprint> sprints;

	public Sprintstate() {
	}

	public Integer getSprintStateID() {
		return this.sprintStateID;
	}

	public void setSprintStateID(Integer sprintStateID) {
		this.sprintStateID = sprintStateID;
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