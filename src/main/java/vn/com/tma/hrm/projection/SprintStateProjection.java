package vn.com.tma.hrm.projection;

import java.util.List;

import org.springframework.data.rest.core.config.Projection;

import com.fasterxml.jackson.annotation.JsonIgnore;

import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.SprintState;

@Projection(name="sprintStateProjection", types={SprintState.class})
public interface SprintStateProjection {
    public int getId();
    
    public String getName();
    
    public String getDescription();
    
    @JsonIgnore
    public List<Sprint> getSprints();
    
}
