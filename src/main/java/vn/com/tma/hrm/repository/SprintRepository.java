package vn.com.tma.hrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.projection.SprintProjection;

@RepositoryRestResource(excerptProjection=SprintProjection.class, path="sprints", collectionResourceRel="sprints")
public interface SprintRepository extends JpaRepository<Sprint, Integer> {
    public Sprint findByProjectAndNameAndActive(Project project, String name, Byte active);
    
    @Query("select s from Sprint s where s.project.id = :projectId and active = :active")
    public List<Sprint> findByProjectIDAndActive(@Param("projectId") int projectId, @Param("active") Byte active);

    public Sprint findByIdAndActive(int id, Byte active);
}
