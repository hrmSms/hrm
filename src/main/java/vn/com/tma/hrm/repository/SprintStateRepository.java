package vn.com.tma.hrm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import vn.com.tma.hrm.entities.Sprintstate;

@RestResource(exported = false)
@RepositoryRestResource(path = "sprintstates")
public interface SprintStateRepository extends JpaRepository<Sprintstate, Integer> {

}
