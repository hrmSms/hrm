package vn.com.tma.hrm.services;

import java.util.List;

import vn.com.tma.hrm.entities.Project;

public interface ProjectService {
	public Project create(Project project);
	public Project update(Project project) throws Exception;
	public Project delete(int id) throws Exception;
	public Project getByID(int id);
	public List<Project> getAll() ;
	
}
