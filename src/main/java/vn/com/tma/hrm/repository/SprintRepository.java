package vn.com.tma.hrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.tma.hrm.entities.Sprint;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {
    public List<Sprint> findByProjectID(int projectID);
}
