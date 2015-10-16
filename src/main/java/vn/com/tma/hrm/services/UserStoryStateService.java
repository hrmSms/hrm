package vn.com.tma.hrm.services;

import java.util.List;

import org.springframework.stereotype.Service;

import vn.com.tma.hrm.entities.SprintState;
import vn.com.tma.hrm.entities.UserStoryState;

@Service
public interface UserStoryStateService {
	public List<UserStoryState> getAll();
}
