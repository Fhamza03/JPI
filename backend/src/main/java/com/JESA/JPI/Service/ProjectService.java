package com.JESA.JPI.Service;

import com.JESA.JPI.Model.DepartementModel;
import com.JESA.JPI.Model.ProjectModel;
import com.JESA.JPI.Repository.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService implements ProjectServiceImpl{
    @Autowired
    ProjectRepo projectRepo;
    @Override
    public ProjectModel createProject(ProjectModel projet) {
        try {
            return projectRepo.save(projet);
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Failed to create project: " + ex.getMessage());
        }
    }

    @Override
    public void deleteProjectById(Integer projectId) {
        try {
            projectRepo.deleteById(projectId);
        }catch (DataIntegrityViolationException ex){
            throw new RuntimeException("Failed to delete project: " + ex.getMessage());
        }
    }

    @Override
    public ProjectModel updateProject(ProjectModel projet) {
        try {
            return projectRepo.save(projet);
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Failed to update project: " + ex.getMessage());
        }
    }

    @Override
    public ProjectModel getProjectById(Integer projectId) {
        Optional<ProjectModel> departement = projectRepo.findById(projectId);
        return departement.orElse(null);
    }

    @Override
    public List<ProjectModel> getAllProjects() {
        List<ProjectModel> projects = projectRepo.findAll();
        if (projects.isEmpty()) {
            throw new RuntimeException("No projects found");
        }
        return projects;
    }
}
