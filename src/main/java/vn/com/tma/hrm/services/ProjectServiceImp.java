package vn.com.tma.hrm.services;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.repository.ProjectRepository;

@Service
public class ProjectServiceImp implements ProjectService {
    @Resource
    private ProjectRepository projectRepository;

    @Override
    @Transactional(value = "txManager")
    public Project create(Project project) {
        Project createdProject = project;
        return projectRepository.save(createdProject);
    }

    @Override
    @Transactional(value = "txManager")
    public Project update(Project project) throws Exception {
        Project updateProject = projectRepository.findOne(project.getId());

        if (updateProject == null) {
            throw new Exception();
        }
        updateProject.setActive(project.getActive());
        updateProject.setClientId(project.getClientId());
        updateProject.setDescription(project.getDescription());
        updateProject.setEndDate(project.getEndDate());
        updateProject.setName(project.getName());
        updateProject.setStartDate(project.getStartDate());
        updateProject.setProjectOwner(project.getProjectOwner());
        return updateProject;
    }

    @Override
    @Transactional(value = "txManager")
    public Project delete(int id) throws Exception {
        Project deletedProject = projectRepository.findOne(id);

        if (deletedProject == null) {
            throw new Exception();
        }
        projectRepository.delete(deletedProject);
        return deletedProject;
    }

    @Override
    @Transactional(value = "txManager")
    public Project getByID(int id) {
        return projectRepository.findOne(id);
    }

    @Override
    @Transactional(value = "txManager")
    public List<Project> getAll() {
        return (List<Project>) projectRepository.findAll();
    }

}
