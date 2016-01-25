package vn.com.tma.hrm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.UserStory;
import vn.com.tma.hrm.projection.UserStoryProjection;

@PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
@RepositoryRestResource(excerptProjection=UserStoryProjection.class)
public interface UserStoryRepository extends JpaRepository<UserStory, Long>{
	public Optional<UserStory> findByProjectAndName(Project project, String name);
    public List<UserStory> findBySprint(Sprint sprint);
    public List<UserStory> findByProject(Project project);
    public List<UserStory> findByProjectAndActive(Project project, Byte active);
    
    @Query("select us from UserStory us where us.project.id = :projectId and us.active = 1")
    public List<UserStory> findActiveUserstoriesByProjectId(@Param("projectId") int projectId);
    
    public UserStory findByName(@Param("name") String name);
    
    @Query("select us from UserStory us where us.parent.id = :parentId and us.active = 1")
    public List<UserStory> findActiveUserStoriesByParentId(@Param("parentId") Long parentId);
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    void delete(Long usId);
    
    @SuppressWarnings("unchecked")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @Override
    UserStory save(UserStory userstory);
}
