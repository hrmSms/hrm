package vn.com.tma.hrm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.projection.UserProjection;

@RepositoryRestResource(excerptProjection = UserProjection.class, collectionResourceRel = "users", path = "users")
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findOneByEmail(String email);
	Optional<User> findOneByUsername(String username);
}