package vn.com.tma.hrm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import vn.com.tma.hrm.entities.UserStoryState;
import vn.com.tma.hrm.projection.UserStoryStateProjection;

@RepositoryRestResource(excerptProjection=UserStoryStateProjection.class)
public interface UserStoryStateRepository extends JpaRepository<UserStoryState, Integer>{

}
