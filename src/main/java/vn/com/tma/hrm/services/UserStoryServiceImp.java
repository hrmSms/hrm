package vn.com.tma.hrm.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.UserStory;
import vn.com.tma.hrm.repository.UserStoryRepository;

@Component
public class UserStoryServiceImp implements UserStoryService {
	
	@Autowired
	UserStoryRepository userStoryRepository;

	@Override
	public UserStory create(UserStory userStory) {
		// TODO Auto-generated method stub
		UserStory us = userStory;
		return userStoryRepository.save(us);
	}

	@Override
	@Transactional(value="txManager") 
	public UserStory update(UserStory userStory) throws Exception {
		// TODO Auto-generated method stub
		UserStory updatedUserStory = userStoryRepository.findOne(userStory.getId());

        if (updatedUserStory == null) {
            throw new Exception();
        }
        updatedUserStory.setActive(userStory.getActive());
        updatedUserStory.setActual(userStory.getActual());
        updatedUserStory.setDescription(userStory.getDescription());        
        updatedUserStory.setName(userStory.getName());
        updatedUserStory.setOwner(userStory.getOwner());
        updatedUserStory.setPoint(userStory.getPoint());
        updatedUserStory.setState(userStory.getState());
        updatedUserStory.setNote(userStory.getNote());
        updatedUserStory.setPlanEst(userStory.getPlanEst());
        updatedUserStory.setProject(userStory.getProject());
        updatedUserStory.setSprint(userStory.getSprint());
        updatedUserStory.setTodoEst(userStory.getTodoEst());
        updatedUserStory.setParent(userStory.getParent());
        updatedUserStory.setBuildDate(userStory.getBuildDate());
        updatedUserStory.setBusinessValue(userStory.getBusinessValue());
        return updatedUserStory;
	}

	@Override
	public UserStory delete(long id) throws Exception {
		// TODO Auto-generated method stub
		UserStory deletedUserStory = userStoryRepository.findOne(id);
		if(deletedUserStory == null){
			throw new Exception();
		}
		userStoryRepository.delete(deletedUserStory);
		return deletedUserStory;
	}

	@Override
	public UserStory getByID(long id) {
		// TODO Auto-generated method stub
		return userStoryRepository.findOne(id);
	}

	@Override
	public List<UserStory> getAll() {
		// TODO Auto-generated method stub
		return userStoryRepository.findAll();
	}

	@Override
	public Optional<UserStory> getByProjectAndName(Project project, String name) {
		// TODO Auto-generated method stub
	    return userStoryRepository.findByProjectAndName(project, name);
	}

	@Override
	public List<UserStory> getBySprint(Sprint sprint) {
		// TODO Auto-generated method stub
		return userStoryRepository.findBySprint(sprint);
	}

	@Override
	public List<UserStory> getByProject(Project project) {
		// TODO Auto-generated method stub
		return userStoryRepository.findByProjectAndActive(project, (byte) 1);
	}

}
