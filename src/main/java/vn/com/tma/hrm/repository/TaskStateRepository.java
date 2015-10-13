package vn.com.tma.hrm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import vn.com.tma.hrm.entities.TaskState;

@RepositoryRestResource(collectionResourceRel = "taskStates", path = "taskStates")
public interface TaskStateRepository extends JpaRepository<TaskState, Integer> {
    /*public List<Task> findByUserStoryId(UserStory userStoryId);
    public List<Task> findByName(String name);*/
}
