package com.atilio.taskmanager.service;

import com.atilio.taskmanager.dto.TaskRequestDTO;
import com.atilio.taskmanager.dto.TaskResponseDTO;
import com.atilio.taskmanager.model.TaskStatus;

import java.util.List;

public interface TaskService {

    List<TaskResponseDTO> getAllTasks();

    List<TaskResponseDTO> getTasksByStatus(TaskStatus status);

    TaskResponseDTO getTaskById(Long id);

    TaskResponseDTO createTask(TaskRequestDTO taskRequestDTO);

    TaskResponseDTO updateTask(Long id, TaskRequestDTO taskRequestDTO);

    void deleteTask(Long id);
}

