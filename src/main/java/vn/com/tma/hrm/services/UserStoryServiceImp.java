package vn.com.tma.hrm.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.UserStory;
import vn.com.tma.hrm.model.UserStoryInputForm;
import vn.com.tma.hrm.repository.UserStoryRepository;

@Component
public class UserStoryServiceImp implements UserStoryService {
	
	@Autowired
	UserStoryRepository userStoryRepository;

	@Override
	public UserStory create(UserStoryInputForm usForm) {
		// TODO Auto-generated method stub
		UserStory us = new UserStory();
		us.setActive(usForm.getActive());
		us.setActual(usForm.getActual());
		us.setBusinessValue(usForm.getBusinessValue());
		us.setDescription(usForm.getDescription());
		us.setName(usForm.getName());
		us.setNote(usForm.getNote());
		us.setOwner(usForm.getOwner());
		us.setPlanEst(usForm.getPlanEst());
		us.setPoint(usForm.getPoint());
		us.setSprint(usForm.getSprint());
		us.setState(usForm.getUserStoryState());
		us.setBuildDate(usForm.getBuildDate());
		us.setTodoEst(usForm.getTodoEst());
		us.setProject(usForm.getProject());
		us.setParent(usForm.getParent());
		return userStoryRepository.save(us);
	}

	@Override
	public UserStory update(UserStory userStory) throws Exception {
		// TODO Auto-generated method stub
		return null;
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
