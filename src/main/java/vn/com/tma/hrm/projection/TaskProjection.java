package vn.com.tma.hrm.projection;

import org.springframework.data.rest.core.config.Projection;

import vn.com.tma.hrm.entities.Task;
import vn.com.tma.hrm.entities.UserStory;


@Projection(name="taskProjection", types={Task.class})
public interface TaskProjection {
	public int getId();	
	public String getName();
	public UserStory getUserStory();
}
