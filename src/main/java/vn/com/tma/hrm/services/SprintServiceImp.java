package vn.com.tma.hrm.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.repository.SprintRepository;

@Service
public class SprintServiceImp implements SprintService {

    @Autowired
    private SprintRepository sprintRepository;

    @Override
    @Transactional(value = "txManager")
    public Sprint create(Sprint sprint) {
        Sprint createdSprint = sprint;
        return sprintRepository.save(createdSprint);
    }

    @Override
    @Transactional(value = "txManager")
    public Sprint update(Sprint sprint) throws Exception {
        Sprint updateSprint = sprintRepository.findOne(sprint.getId());

        if (updateSprint == null) {
            throw new Exception();
        }
        updateSprint.setActive(sprint.getActive());
        updateSprint.setActuals(sprint.getActuals());
        updateSprint.setDescription(sprint.getDescription());
        updateSprint.setEndDate(sprint.getEndDate());
        updateSprint.setName(sprint.getName());
        updateSprint.setNote(sprint.getNote());
        updateSprint.setPlanEstimate(sprint.getPlanEstimate());
        updateSprint.setPlanVelocity(sprint.getPlanVelocity());
        updateSprint.setProject(sprint.getProject());
        updateSprint.setSprintstate(sprint.getSprintstate());
        updateSprint.setStartDate(sprint.getStartDate());
        updateSprint.setTaskEstimate(sprint.getTaskEstimate());
        updateSprint.setToDo(sprint.getToDo());
        return updateSprint;
    }

    @Override
    @Transactional(value = "txManager")
    public Sprint delete(int id) throws Exception {
        Sprint deletedSprint = sprintRepository.findOne(id);
       
        if (deletedSprint == null) {
            throw new Exception();
        }
        byte inactive = 0;
        deletedSprint.setActive(inactive);
        sprintRepository.save(deletedSprint);
        return deletedSprint;
    }

    @Override
    @Transactional(value = "txManager")
    public Sprint getByID(int id) {
        return sprintRepository.findByIdAndActive(id, (byte) 1);
    }

    @Override
    @Transactional(value = "txManager")
    public Sprint getByProjectAndName(Project project, String name) {
        return sprintRepository.findByProjectAndNameAndActive(project, name, (byte) 1);
    }

    @Override
    @Transactional(value = "txManager")
    public List<Sprint> getByProject(Project project) {
        return sprintRepository.findByProjectAndActive(project, (byte) 1);
    }
}
