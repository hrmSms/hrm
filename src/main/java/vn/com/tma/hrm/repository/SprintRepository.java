package vn.com.tma.hrm.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {
    public Sprint findByProjectAndName(Project project, String name);
    public List<Sprint> findByProject(Project project);
}
