package com.JESA.JPI.Controller;

import com.JESA.JPI.Model.DepartementModel;
import com.JESA.JPI.Model.ProjectModel;
import com.JESA.JPI.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {
    @Autowired
    ProjectService projectService;
    @PostMapping("/createProject")
    public ProjectModel saveProject(@RequestBody ProjectModel projet){
        try {
            return projectService.createProject(projet);
        }catch (Exception e){
            throw new RuntimeException("FAILED TO SAVE PROJECT");
        }
    }
}
