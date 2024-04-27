package com.JESA.JPI.Controller;

import com.JESA.JPI.Model.FileModel;
import com.JESA.JPI.Model.TaskModel;
import com.JESA.JPI.Service.FileService;
import com.JESA.JPI.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {
    @Autowired
    TaskService taskService;
    @Autowired
    FileService fileService;

    @GetMapping("/getFilesbyTask/{taskId}")
    public List<FileModel> getFilesByTask(@PathVariable Integer taskId){
        try{
            TaskModel task = taskService.getTask(taskId);
            return task.getFiles();
        }catch (Exception e){
            throw new RuntimeException("Failed to get Files ot task " + taskId);
        }
    }
    @PostMapping("/admin/createFile/{taskId}")
    public FileModel createFile(@PathVariable Integer taskId,@RequestBody FileModel file){
        try{
            TaskModel task = taskService.getTask(taskId);
            if(task == null){
                return null;
            }
            file.setTask(task);
            return fileService.createFile(file);
        }catch (Exception e){
            throw new RuntimeException("Failed to create a file");
        }
    }
    @PostMapping("/admin/updateFile/{fileId}")
    public FileModel updateFile(@PathVariable Integer fileId,@RequestBody FileModel file){
        try {
            TaskModel task = fileService.getFile(fileId).getTask();
            file.setFileId(fileId);
            file.setTask(task);
            return fileService.updateFile(file);
        }catch (Exception e){
            throw new RuntimeException("Failed to update file");
        }
    }
    @DeleteMapping("/admin/deleteFile/{fileId}")
    public void deleteFile(@PathVariable Integer fileId){
        try{
            fileService.deleteFile(fileId);
        }catch(Exception e){
            throw new RuntimeException("Failed to delete file "+fileId);
        }
    }
}
