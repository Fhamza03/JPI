package com.JESA.JPI.Controller;

import com.JESA.JPI.Model.DepartementModel;
import com.JESA.JPI.Model.SubAreaModel;
import com.JESA.JPI.Model.TaskModel;
import com.JESA.JPI.Repository.DepartementRepo;
import com.JESA.JPI.Service.DepartementService;
import com.JESA.JPI.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    @Autowired
    TaskService taskService;
    @Autowired
    DepartementService departementService;

    @GetMapping("/getTasksByDepartement/{departementId}")
    public List<TaskModel> getTasksByDepartement(@PathVariable Integer departementId){
        try{
            DepartementModel departement = departementService.GetDepartementById(departementId);
            return departement.getTasks();
        }catch (Exception e){
            throw new RuntimeException("Failed to get Tasks of departement : " + departementId);
        }
    }
    @PostMapping("/admin/createTask/{departementId}")
    public TaskModel createTask(@PathVariable Integer departementId,@RequestBody TaskModel task){
        try{
            DepartementModel departement = departementService.GetDepartementById(departementId);
            if (departement == null){
                return null;
            }
            task.setDepartement(departement);
            return taskService.createTask(task);
        }catch (Exception e){
            throw new RuntimeException("Failed to create Task");
        }
    }
    @DeleteMapping("/admin/deleteTask/{taskId}")
    public void deleteTask(@PathVariable Integer taskId){
        try{
            taskService.deleteTask(taskId);
        }catch (Exception e){
            throw new RuntimeException("Failed to delete Task" + taskId);
        }
    }
    @PostMapping("/admin/updateTask/{taskId}")
    public TaskModel updateTask(@PathVariable Integer taskId, @RequestBody TaskModel task){
        try{
            DepartementModel departement = taskService.getTask(taskId).getDepartement();
            task.setTaskId(taskId);
            task.setDepartement(departement);
            return taskService.updateTask(task);
        }catch(Exception e){
            throw new RuntimeException("Failed to update Task "+taskId);
        }
    }

}
