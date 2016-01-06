package vn.com.tma.hrm.projection;

import org.springframework.data.rest.core.config.Projection;

import vn.com.tma.hrm.entities.User;

@Projection(name="userProjection", types={User.class})
public interface UserProjection {
	public Long getId();
	public String getUsername();
}