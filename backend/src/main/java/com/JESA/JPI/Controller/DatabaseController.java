package com.JESA.JPI.Controller;

import com.JESA.JPI.Model.DatabaseModel;
import com.JESA.JPI.Model.ProjectModel;
import com.JESA.JPI.Service.DatabaseService;
import com.JESA.JPI.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DatabaseController {
    @Autowired
    DatabaseService databaseService;
    @Autowired
    ProjectService projectService;
    @PostMapping("/admin/createDatabase/{projectId}")
    public DatabaseModel createDatabase(@PathVariable Integer projectId, @RequestBody DatabaseModel databaseModel) {
        try {
            ProjectModel project = projectService.getProjectById(projectId);
            databaseModel.setProject(project);
            return databaseService.createDatabase(databaseModel);
        } catch (Exception e) {
            throw new RuntimeException("FAILED TO SAVE DATABASE");
        }
    }

    @PostMapping("/admin/updateDatabase")
    public DatabaseModel updateDatabase(@RequestBody DatabaseModel database){
        try{
            return databaseService.updateDatabase(database);
        }catch (Exception e){
            throw new RuntimeException("FAILED TO UPDATE DATABASE");
        }
    }

    @GetMapping("/getDatabase/{databaseId}")
    public DatabaseModel getDataBase(@PathVariable Integer databaseId){
        try{
            return databaseService.getDatabase(databaseId);
        }catch (Exception e){
            throw new RuntimeException("FAILED TO GET DATABASE");
        }
    }

    @DeleteMapping("/admin/deleteDatabase/{databaseId}")
    public void deleteDatabase(@PathVariable Integer databaseId){
        try{
            databaseService.deleteDatabase(databaseId);
        }catch (Exception e){
            throw new RuntimeException("FAILED TO DELETE DATABASE");
        }
    }

    @GetMapping("/getAllDatabases")
    public List<DatabaseModel> getAllDatabases(){
        try{
            return databaseService.getAllDatabases();
        }catch (Exception e){
            throw new RuntimeException("FAILED TO GET DATABASES");
        }
    }

    @GetMapping("/getDatabasesByProject/{projectId}")
    public List<DatabaseModel> getProjectDatabases(@PathVariable Integer projectId) {
        try {
            ProjectModel project = projectService.getProjectById(projectId);
            return project.getDatabases();
        } catch (Exception e) {
            throw new RuntimeException("FAILED TO GET DATABASES FOR PROJECT");
        }
    }


}
