package vn.com.tma.hrm.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import vn.com.tma.hrm.entities.TaskEntity;

@RepositoryRestResource
public interface TaskRepository extends CrudRepository<TaskEntity, Integer> {

	 List<TaskRepository> findByTaskArchived(@Param("archivedfalse") int taskArchivedFalse);
	 List<TaskRepository> findByTaskStatus(@Param("status") String taskStatus);

	}
