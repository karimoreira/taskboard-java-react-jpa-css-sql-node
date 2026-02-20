package com.atilio.taskmanager.repository;

import com.atilio.taskmanager.model.Task;
import com.atilio.taskmanager.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByStatus(TaskStatus status);

    List<Task> findByPriority(com.atilio.taskmanager.model.TaskPriority priority);

    List<Task> findAllByOrderByCreatedAtDesc();

    List<Task> findByStatusOrderByCreatedAtDesc(TaskStatus status);
}

