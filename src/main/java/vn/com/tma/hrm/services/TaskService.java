package vn.com.tma.hrm.services;

import java.util.List;

import org.springframework.stereotype.Service;

import vn.com.tma.hrm.entities.Task;
import vn.com.tma.hrm.entities.UserStory;

@Service
public interface TaskService {
	public Task create(Task task);
	public Task update(Task sprint) throws Exception;
	public Task delete(int id) throws Exception;
	public Task getByID(int id);
	public List<Task> getAll() ;
	//public Boolean getByProjectAndName(Project project, String name) ;
	public List<Task> getByUserStory(UserStory us) ;
	public List<Task> getByName(String name) ;
}
