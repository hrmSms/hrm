package vn.com.tma.hrm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import vn.com.tma.hrm.entities.SprintState;
import vn.com.tma.hrm.projection.SprintStateProjection;

@RepositoryRestResource(excerptProjection=SprintStateProjection.class, collectionResourceRel="sprintStates", path="sprintStates")
public interface SprintStateRepository extends JpaRepository<SprintState, Integer> {

}
