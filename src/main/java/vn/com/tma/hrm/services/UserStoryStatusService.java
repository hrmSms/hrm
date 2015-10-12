package vn.com.tma.hrm.services;

import java.util.List;

import org.springframework.stereotype.Service;
import vn.com.tma.hrm.entities.UserStoryStatus;

@Service
public interface UserStoryStatusService {
	public List<UserStoryStatus> getAll();
}

