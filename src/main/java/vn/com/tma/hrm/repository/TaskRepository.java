package vn.com.tma.hrm.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import vn.com.tma.hrm.entities.Task;

public interface TaskRepository extends PagingAndSortingRepository<Task, Integer> {

}
