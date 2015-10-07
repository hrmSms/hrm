package vn.com.tma.hrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {
    public Sprint findByProjectAndNameAndActive(Project project, String name, Byte active);

    public List<Sprint> findByProjectAndActive(Project project, Byte active);

    public Sprint findByIdAndActive(int id, Byte active);
}
