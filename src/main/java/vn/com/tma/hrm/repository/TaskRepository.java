package vn.com.tma.hrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import vn.com.tma.hrm.entities.Task;
import vn.com.tma.hrm.entities.UserStory;

@RepositoryRestResource(collectionResourceRel = "tasks", path = "tasks")
public interface TaskRepository extends JpaRepository<Task, Integer> {
    public List<Task> findByUserStoryId(UserStory userStoryId);
    public List<Task> findByName(String name);
}
