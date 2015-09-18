package vn.com.tma.hrm.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.com.tma.hrm.entities.SprintState;
import vn.com.tma.hrm.repository.SprintStateRepository;

@Service
public class SprintStateServiceImpl implements SprintStateService{

	@Autowired
	private SprintStateRepository sprintStateRepository;

	@Override
	@Transactional
	public List<SprintState> getAll() {
		return sprintStateRepository.findAll();
	}
	
	
}
