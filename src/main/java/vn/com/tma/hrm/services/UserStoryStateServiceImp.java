package vn.com.tma.hrm.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.com.tma.hrm.entities.UserStoryState;
import vn.com.tma.hrm.repository.UserStoryStateRepository;

@Component
public class UserStoryStateServiceImp implements UserStoryStateService {

	@Autowired
	UserStoryStateRepository usStateRepository;
	
	@Override
	public List<UserStoryState> getAll() {
		// TODO Auto-generated method stub
		return usStateRepository.findAll();
	}

}
