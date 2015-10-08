package vn.com.tma.hrm.services;

import java.util.List;

import vn.com.tma.hrm.entities.Task;
import vn.com.tma.hrm.entities.UserStory;

public interface UserStoryService {
	public UserStory create(UserStory us);
	public UserStory update(UserStory task) throws Exception;
	public UserStory delete(int id) throws Exception;
	public UserStory getByID(int id);
	public List<UserStory> getAll() ;
}
