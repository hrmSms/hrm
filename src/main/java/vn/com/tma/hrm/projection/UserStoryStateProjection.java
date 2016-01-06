package vn.com.tma.hrm.projection;

import java.util.Date;

import org.springframework.data.rest.core.config.Projection;

import vn.com.tma.hrm.entities.UserStoryState;


@Projection(name="userStoryStateProjection", types={UserStoryState.class})
public interface UserStoryStateProjection {
	public Integer getId();
	public String getName();
}