package com.JESA.JPI.Service;

import com.JESA.JPI.Model.DepartementModel;
import com.JESA.JPI.Model.TaskModel;
import com.JESA.JPI.Repository.DepartementRepo;
import com.JESA.JPI.Repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService implements TaskServiceImpl{
    @Autowired
    TaskRepo taskRepo;
    @Autowired
    DepartementRepo departementRepo;

    @Override
    public TaskModel createTask(TaskModel task) {
        try{
            return taskRepo.save(task);
        }catch (DataIntegrityViolationException ex){
            throw new RuntimeException("Failed to create Task");
        }
    }

    @Override
    public TaskModel updateTask(TaskModel task) {
        try{
            return taskRepo.save(task);
        }catch (DataIntegrityViolationException ex){
            throw new RuntimeException("Failed to update Task");
        }
    }

    @Override
    public void deleteTask(Integer taskId) {
        try{
             taskRepo.deleteById(taskId);
        }catch (DataIntegrityViolationException ex){
            throw new RuntimeException("Failed to delete Task");
        }
    }

    @Override
    public TaskModel getTask(Integer taskId) {
            Optional<TaskModel> task = taskRepo.findById(taskId);
            return task.orElse(null);
    }

    @Override
    public List<TaskModel> getAllTasks() {
            List<TaskModel> tasks = taskRepo.findAll();
            if (tasks.isEmpty()){
                throw new RuntimeException("No Tasks found");
            }
            return tasks;
    }
}
