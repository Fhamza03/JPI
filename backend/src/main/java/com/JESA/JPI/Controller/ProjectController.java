package com.JESA.JPI.Controller;

import com.JESA.JPI.Model.DepartementModel;
import com.JESA.JPI.Model.ProjectModel;
import com.JESA.JPI.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {
    @Autowired
    ProjectService projectService;
    @PostMapping("/admin/createProject")
    public ProjectModel saveProject(@RequestBody ProjectModel project){
        try {
            return projectService.createProject(project);
        }catch (Exception e){
            throw new RuntimeException("FAILED TO SAVE PROJECT");
        }
    }
    @PostMapping("/admin/updateProject")
    public ProjectModel updateProject(@RequestBody ProjectModel project){
        try {
            return projectService.updateProject(project);
        }catch (Exception e){
            throw new RuntimeException("FAILED TO UPDATE PROJECT");
        }
    }
    @DeleteMapping("/admin/deleteProject/{projectId}")
    public void deleteProject(@PathVariable Integer projectId){
        try {
            projectService.deleteProjectById(projectId);
        }catch (Exception e){
            throw new RuntimeException("FAILED TO DELETE PROJECT");
        }
    }
    @GetMapping("/getAllProjects")
    public List<ProjectModel> allProjects() {
        try {
            return projectService.getAllProjects();
        } catch (Exception e) {
            throw new RuntimeException("FAILED TO GET ALL PROJECTS");
        }
    }
}
