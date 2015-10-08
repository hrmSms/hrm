package vn.com.tma.hrm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.com.tma.hrm.entities.UserStory;


public interface UserStoryRepository extends JpaRepository<UserStory, Integer> {
    //public Task findByProjectAndName(Project project, String name);
    //public List<Task> findByProject(Project project);
}
