package vn.com.tma.hrm.services;

import java.util.List;

import vn.com.tma.hrm.entities.Sprint;

public interface SprintService {
	public Sprint create(Sprint sprint);
	public Sprint update(Sprint sprint) throws Exception;
	public Sprint delete(int id) throws Exception;
	public Sprint getByID(int id);
	public List<Sprint> getAll() ;
	public Sprint getByProjectIDAndName(int projectID, String name) ;
	
}
