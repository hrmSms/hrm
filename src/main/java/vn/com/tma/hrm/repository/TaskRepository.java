package vn.com.tma.hrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.com.tma.hrm.entities.Task;
import vn.com.tma.hrm.entities.UserStory;


public interface TaskRepository extends JpaRepository<Task, Integer> {
    //public Task findByProjectAndName(Project project, String name);
    public List<Task> findByUserStoryId(UserStory us);
}
