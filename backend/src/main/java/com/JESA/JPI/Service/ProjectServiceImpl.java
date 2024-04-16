package com.JESA.JPI.Service;

import com.JESA.JPI.Model.ProjectModel;

import java.util.List;

public interface ProjectServiceImpl {
    ProjectModel createProject(ProjectModel projet);
    void deleteProjectById(Integer projectId);
    ProjectModel updateProject(ProjectModel projet);
    ProjectModel getProjectById(Integer projectId);
    List<ProjectModel> getAllProjects();
}
