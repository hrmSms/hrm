package vn.com.tma.hrm.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.com.tma.hrm.entities.UserStory;
import vn.com.tma.hrm.repository.UserStoryRepository;

@Service
public class UserStoryServiceImp implements UserStoryService{
	
	@Autowired
	private UserStoryRepository userStoryRepository;
	
	@Override
	@Transactional(value="txManager") 
	public UserStory create(UserStory us){
		UserStory createdUserStory = us;
		return userStoryRepository.save(createdUserStory);
	}
	
	@Override
	@Transactional(value="txManager") 
	public UserStory update(UserStory us) throws Exception{
		UserStory updateUS = userStoryRepository.findOne(us.getId());
		
		if(updateUS == null){
			throw new Exception();
		}
		/*updateUS.setName(us.getName());
		updateUS.setTaskEst(us.getTaskEst());
		updateUS.setToDo(us.getToDo());
		updateUS.setSpentTime(us.getSpentTime());
		updateUS.setStartDate(us.getStartDate());
		updateUS.setEndDate(us.getEndDate());
		updateUS.setOwner(us.getOwner());
		updateUS.setDescription(us.getDescription());*/
		updateUS.setNote(us.getNote());
		/*updateUS.setUserStoryId(us.getUserStoryId());
		updateUS.setTaskStateId(us.getTaskStateId());*/
		return updateUS;
	}
	
	@Override
	@Transactional(value="txManager") 
	public UserStory delete(int id) throws Exception{
		UserStory deletedUS = userStoryRepository.findOne(id);
		
		if(deletedUS == null){
			throw new Exception();
		}
		userStoryRepository.delete(deletedUS);
		return deletedUS;
	}
	
	@Override
	@Transactional(value="txManager") 
	public UserStory getByID(int id){
		return userStoryRepository.findOne(id);
	}
	
	@Override
	@Transactional(value="txManager") 
	public List<UserStory> getAll(){
		return userStoryRepository.findAll();
	}
	
	/*@Override
        @Transactional(value="txManager") 
	public Boolean getByProjectAndName(Project project, String name) {
	    Task duplicatedTask = taskRepository.findByProjectAndName(project, name);
	    if(duplicatedTask!=null){
	        return false;
	    }
	    return true;
	}
	
	@Override
        @Transactional(value="txManager") 
	public List<Task> getByProject(Project project) {
	    return taskRepository.findByProject(project);
	}*/
}
