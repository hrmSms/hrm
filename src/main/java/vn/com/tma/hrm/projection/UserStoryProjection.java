package vn.com.tma.hrm.projection;

import java.util.Date;

import org.springframework.data.rest.core.config.Projection;

import com.fasterxml.jackson.annotation.JsonIgnore;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.entities.UserStory;
import vn.com.tma.hrm.entities.UserStoryState;

@Projection(name="userStoryProjection", types={UserStory.class})
public interface UserStoryProjection {
	public Long getId();
	
	public String getName();
	
	public User getOwner();
	
	public Sprint getSprint();
	
	public UserStoryState getState();
	
	public Long getBusinessValue();
	
	public Float getPlanEst();
	
	public Float getTodoEst();
	
	public Float getActual();
	
	public String getNote();
	
	public Long getPoint();
	
	public Byte getActive();
	
	public Project getProject();
	
	public String getDescription();
	
	public Date getBuildDate();
	
	public UserStory getParent();
}
