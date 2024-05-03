package com.JESA.JPI.Controller;

import com.JESA.JPI.Model.FileModel;
import com.JESA.JPI.Model.TaskModel;
import com.JESA.JPI.Model.UserModel;
import com.JESA.JPI.Service.FileService;
import com.JESA.JPI.Service.TaskService;
import com.JESA.JPI.Service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {
    @Autowired
    TaskService taskService;
    @Autowired
    FileService fileService;
    @Autowired
    UserService userService;

    @GetMapping("/getFilesbyTask/{taskId}")
    public List<FileModel> getFilesByTask(@PathVariable Integer taskId){
        try{
            TaskModel task = taskService.getTask(taskId);
            return task.getFiles();
        }catch (Exception e){
            throw new RuntimeException("Failed to get Files ot task " + taskId);
        }
    }
    @PostMapping("/admin/createFile/{taskId}/{userId}")
    public ResponseEntity<FileModel> createFile(@PathVariable Integer taskId, @PathVariable Integer userId,@RequestBody FileModel file,
                                                HttpSession session) {
        try {
            TaskModel task = taskService.getTask(taskId);
            if (task == null) {
                return ResponseEntity.notFound().build();
            }
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
            UserModel user = userService.getUser(userId);
            file.setUser(user);
            file.setTask(task);
            FileModel savedFile = fileService.createFile(file);
            return ResponseEntity.ok(savedFile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
