package vn.com.tma.hrm.projection;

import java.util.Date;
import java.util.List;

import org.springframework.data.rest.core.config.Projection;

import com.fasterxml.jackson.annotation.JsonIgnore;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.UserStory;

@Projection(name = "projectProjection", types = { Project.class })
public interface ProjectProjection {
    public Integer getId();

    public Byte getActive();

    public String getDescription();

    public Date getEndDate();

    public String getName();
    
    public Date getStartDate();
    
    public List<Sprint> getSprints();
    
    public List<UserStory> getUserStories();
/*    
    @JsonIgnore
    public List<Sprint> getSprints();*/
    
}
