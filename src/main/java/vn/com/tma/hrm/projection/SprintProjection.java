package vn.com.tma.hrm.projection;

import java.util.Date;
import java.util.List;

import org.springframework.data.rest.core.config.Projection;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.SprintState;
import vn.com.tma.hrm.entities.UserStory;

@Projection(name="sprintProjection", types={Sprint.class})
public interface SprintProjection {
    public int getId();
    
    public Byte getActive();

    public Float getActuals();

    public String getDescription();

    public Date getEndDate();

    public String getName();

    public String getNote() ;
    
    public Float getPlanEstimate();

    public Float getPlanVelocity() ;
    
    public Date getStartDate();

    public Float getTaskEstimate();

    public Float getToDo() ;
    
    public SprintState getSprintstate();

    public Project getProject();

    public List<UserStory> getUserStories();
}
