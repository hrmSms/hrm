package vn.com.tma.hrm.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.com.tma.hrm.entities.Task;
import vn.com.tma.hrm.entities.TaskState;
import vn.com.tma.hrm.entities.UserStory;
import vn.com.tma.hrm.repository.TaskRepository;
import vn.com.tma.hrm.repository.TaskStateRepository;

@Component
public class TaskStateServiceImp implements TaskStateService{
	
	@Autowired
	private TaskStateRepository taskStateRepository;
	
	@Override
	@Transactional(value="txManager") 
	public TaskState create(TaskState item){
		TaskState createdItem = item;
		return taskStateRepository.save(createdItem);
	}
	
	@Override
	@Transactional(value="txManager") 
	public TaskState update(TaskState item) throws Exception{
		TaskState updateItem = taskStateRepository.findOne(item.getId());
		
		if(updateItem == null){
			throw new Exception();
		}
		updateItem.setName(item.getName());
		updateItem.setDescription(item.getDescription());
		return updateItem;
	}
	
	@Override
	@Transactional(value="txManager") 
	public TaskState delete(int id) throws Exception{
		TaskState deletedItem = taskStateRepository.findOne(id);
		
		if(deletedItem == null){
			throw new Exception();
		}
		taskStateRepository.delete(deletedItem);
		return deletedItem;
	}
	
	@Override
	@Transactional(value="txManager") 
	public TaskState getByID(int id){
		return taskStateRepository.findOne(id);
	}
	
	@Override
	@Transactional(value="txManager") 
	public List<TaskState> getAll(){
		return taskStateRepository.findAll();
	}
}
