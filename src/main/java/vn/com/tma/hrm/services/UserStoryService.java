package vn.com.tma.hrm.services;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.UserStory;
import vn.com.tma.hrm.model.UserStoryInputForm;

@Service
public interface UserStoryService {
	public UserStory create(UserStoryInputForm usForm);
	public UserStory update(UserStory userStory) throws Exception;
	public UserStory delete(long id) throws Exception;
	public UserStory getByID(long id);
	public List<UserStory> getAll() ;
	public Optional<UserStory> getBySprintAndName(Sprint sprint, String name) ;
	public List<UserStory> getBySprint(Sprint sprint) ;
}
