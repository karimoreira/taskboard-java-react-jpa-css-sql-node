package com.atilio.taskmanager.dto;

import com.atilio.taskmanager.model.TaskPriority;
import com.atilio.taskmanager.model.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskRequestDTO {

    @NotBlank(message = "O título é obrigatório")
    @Size(min = 3, max = 100, message = "O título deve ter entre 3 e 100 caracteres")
    private String title;

    @Size(max = 1000, message = "A descrição deve ter no máximo 1000 caracteres")
    private String description;

    @NotNull(message = "O status é obrigatório")
    private TaskStatus status;

    @NotNull(message = "A prioridade é obrigatória")
    private TaskPriority priority;
}

