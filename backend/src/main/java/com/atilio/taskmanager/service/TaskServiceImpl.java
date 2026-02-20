package com.atilio.taskmanager.service;

import com.atilio.taskmanager.dto.TaskRequestDTO;
import com.atilio.taskmanager.dto.TaskResponseDTO;
import com.atilio.taskmanager.exception.ResourceNotFoundException;
import com.atilio.taskmanager.mapper.TaskMapper;
import com.atilio.taskmanager.model.Task;
import com.atilio.taskmanager.model.TaskStatus;
import com.atilio.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponseDTO> getAllTasks() {
        log.info("Buscando todas as tarefas");
        List<Task> tasks = taskRepository.findAllByOrderByCreatedAtDesc();
        return taskMapper.toResponseDTOList(tasks);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponseDTO> getTasksByStatus(TaskStatus status) {
        log.info("Buscando tarefas com status: {}", status);
        List<Task> tasks = taskRepository.findByStatusOrderByCreatedAtDesc(status);
        return taskMapper.toResponseDTOList(tasks);
    }

    @Override
    @Transactional(readOnly = true)
    public TaskResponseDTO getTaskById(Long id) {
        log.info("Buscando tarefa com id: {}", id);
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa", id));
        return taskMapper.toResponseDTO(task);
    }

    @Override
    public TaskResponseDTO createTask(TaskRequestDTO taskRequestDTO) {
        log.info("Criando nova tarefa: {}", taskRequestDTO.getTitle());
        Task task = taskMapper.toEntity(taskRequestDTO);
        Task savedTask = taskRepository.save(task);
        return taskMapper.toResponseDTO(savedTask);
    }

    @Override
    public TaskResponseDTO updateTask(Long id, TaskRequestDTO taskRequestDTO) {
        log.info("Atualizando tarefa com id: {}", id);
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa", id));

        taskMapper.updateEntityFromDTO(taskRequestDTO, existingTask);
        Task updatedTask = taskRepository.save(existingTask);
        return taskMapper.toResponseDTO(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {
        log.info("Deletando tarefa com id: {}", id);
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa", id));
        taskRepository.delete(task);
    }
}

