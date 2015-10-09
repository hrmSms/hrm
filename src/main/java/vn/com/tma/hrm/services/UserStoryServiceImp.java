package vn.com.tma.hrm.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
		return userStoryRepository.save(userStory);
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
	public Optional<UserStory> getBySprintAndName(Sprint sprint, String name) {
		// TODO Auto-generated method stub
	    return userStoryRepository.findBySprintAndName(sprint, name);
	}

	@Override
	public List<UserStory> getBySprint(Sprint sprint) {
		// TODO Auto-generated method stub
		return userStoryRepository.findBySprint(sprint);
	}

}
