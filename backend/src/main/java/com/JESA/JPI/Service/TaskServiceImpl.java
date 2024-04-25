package com.JESA.JPI.Service;

import com.JESA.JPI.Model.TaskModel;

import java.util.List;

public interface TaskServiceImpl {
    public TaskModel createTask(TaskModel task);
    public TaskModel updateTask(TaskModel task);
    public void deleteTask(Integer taskId);
    public TaskModel getTask(Integer taskId);
    public List<TaskModel> getAllTasks();
}
