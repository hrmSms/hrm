package vn.com.tma.hrm.services;

import java.util.List;

import org.springframework.stereotype.Service;

import vn.com.tma.hrm.entities.Task;
import vn.com.tma.hrm.entities.TaskState;
import vn.com.tma.hrm.entities.UserStory;

@Service
public interface TaskStateService {
	public TaskState create(TaskState task);
	public TaskState update(TaskState task) throws Exception;
	public TaskState delete(int id) throws Exception;
	public TaskState getByID(int id);
	public List<TaskState> getAll() ;
}
