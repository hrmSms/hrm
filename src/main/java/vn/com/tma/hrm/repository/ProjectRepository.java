package vn.com.tma.hrm.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.projection.ProjectProjection;


@RepositoryRestResource(excerptProjection=ProjectProjection.class, collectionResourceRel = "projects", path = "projects")
public interface ProjectRepository extends PagingAndSortingRepository<Project, Integer> {
	List<Project> findByNameAndActive(@Param("name") String name, @Param("active") Byte active);
	List<Project> findByActive(@Param("active") Byte active);
	Project findById(@Param("projectId") int projectId);
}
