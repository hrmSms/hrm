package vn.com.tma.hrm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.UserStory;


public interface UserStoryRepository extends JpaRepository<UserStory, Long>{
	public Optional<UserStory> findBySprintAndName(Sprint sprint, String name);
    public List<UserStory> findBySprint(Sprint sprint);
}
