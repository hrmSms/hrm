package vn.com.tma.hrm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import vn.com.tma.hrm.entities.Sprint;

@RepositoryRestResource(collectionResourceRel = "sprints", path = "sprints")
public interface SprintRepository extends JpaRepository<Sprint, Integer> {

}
