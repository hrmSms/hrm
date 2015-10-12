package vn.com.tma.hrm.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.com.tma.hrm.entities.UserStoryState;
import vn.com.tma.hrm.entities.UserStoryStatus;
import vn.com.tma.hrm.repository.UserStoryStateRepository;
import vn.com.tma.hrm.repository.UserStoryStatusRepository;

@Component
public class UserStoryStatusServiceImp implements UserStoryStatusService {

	@Autowired
	UserStoryStatusRepository usStatusRepository;
	
	@Override
	public List<UserStoryStatus> getAll() {
		// TODO Auto-generated method stub
		return usStatusRepository.findAll();
	}

}