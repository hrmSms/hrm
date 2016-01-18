package vn.com.tma.hrm.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.Task;
import vn.com.tma.hrm.entities.UserStory;
import vn.com.tma.hrm.repository.TaskRepository;

@Component
public class TaskServiceImp implements TaskService{
	
	@Autowired
	private TaskRepository taskRepository;
	
	@Override
	@Transactional(value="txManager") 
	public Task create(Task task){
		return taskRepository.save(task);
	}
	
	@Override
	@Transactional(value="txManager") 
	public Task update(Task task) throws Exception{
		Task updateTask = taskRepository.findOne(task.getId());
		
		if(updateTask == null){
			throw new Exception();
		}
		updateTask.setName(task.getName());
		updateTask.setTaskEst(task.getTaskEst());
		updateTask.setToDo(task.getToDo());
		updateTask.setSpentTime(task.getSpentTime());
		updateTask.setStartDate(task.getStartDate());
		updateTask.setEndDate(task.getEndDate());
		updateTask.setOwner(task.getOwner());
		updateTask.setDescription(task.getDescription());
		updateTask.setNote(task.getNote());
		updateTask.setUserStory(task.getUserStory());
		updateTask.setTaskStateId(task.getTaskStateId());
		return updateTask;
	}
	
	@Override
	@Transactional(value="txManager") 
	public Task delete(int id) throws Exception{
		Task deletedTask = taskRepository.findOne(id);
		
		if(deletedTask == null){
			throw new Exception();
		}
		taskRepository.delete(deletedTask);
		return deletedTask;
	}
	
	@Override
	@Transactional(value="txManager") 
	public Task getByID(int id){
		return taskRepository.findOne(id);
	}

	
	@Override
	@Transactional(value="txManager") 
	public List<Task> getAll(){
		return taskRepository.findAll();
	}
		 
	@Override
        @Transactional(value="txManager") 
	public List<Task> getByUserStory(UserStory us) {
	    return taskRepository.findByUserStoryId(us.getId());
	}
	
	@Override
    @Transactional(value="txManager") 
	public List<Task> getByName(String name) {
	    return taskRepository.findByName(name);
	}
	
	@Override
    @Transactional(value = "txManager")
    public Task getByUserStoryAndName(UserStory us, String name) {
        return taskRepository.findByUserStoryIdAndName(us.getId(), name);
    }
	
}
