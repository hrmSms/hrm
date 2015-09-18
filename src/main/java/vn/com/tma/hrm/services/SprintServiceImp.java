package vn.com.tma.hrm.services;

import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.aop.ThrowsAdvice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.repository.SprintRepository;

@Service
public class SprintServiceImp implements SprintService{
	
	@Resource
	private SprintRepository sprintRepository;
	
	@Override
	@Transactional
	public Sprint create(Sprint sprint){
		Sprint createdSprint = sprint;
		return sprintRepository.save(createdSprint);
	}
	
	@Override
	@Transactional
	public Sprint update(Sprint sprint) throws Exception{
		Sprint updateSprint = sprintRepository.findOne(sprint.getid());
		
		if(updateSprint == null){
			throw new Exception();
		}
		updateSprint.setActive(sprint.getActive());
		updateSprint.setActuals(sprint.getActuals());
		updateSprint.setDescription(sprint.getDescription());
		updateSprint.setEndDate(sprint.getEndDate());
		updateSprint.setName(sprint.getName());
		updateSprint.setNote(sprint.getNote());
		updateSprint.setPlanEst(sprint.getPlanEst());
		updateSprint.setPlanVelocity(sprint.getPlanVelocity());
		updateSprint.setProjectID(sprint.getProjectID());
		updateSprint.setSprintstate(sprint.getSprintstate());
		updateSprint.setStartDate(sprint.getStartDate());
		updateSprint.setTaskEst(sprint.getTaskEst());
		updateSprint.setToDo(sprint.getToDo());
		return updateSprint;
	}
	
	@Override
	@Transactional
	public Sprint delete(int id) throws Exception{
		Sprint deletedSprint = sprintRepository.findOne(id);
		
		if(deletedSprint == null){
			throw new Exception();
		}
		sprintRepository.delete(deletedSprint);
		return deletedSprint;
	}
	
	@Override
	@Transactional
	public Sprint getByID(int id){
		return sprintRepository.findOne(id);
	}
	
	@Override
	@Transactional
	public List<Sprint> getAll(){
		return sprintRepository.findAll();
	}
}
