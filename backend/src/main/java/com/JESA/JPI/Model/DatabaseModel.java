package com.JESA.JPI.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity(name = "Databases_Project")
public class DatabaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer DatabaseId;
    private String DatabaseType;
    @OneToMany(mappedBy = "database", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<AreaModel> areas;
    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIgnoreProperties({"databases"})
    private ProjectModel project;

    public Integer getDatabaseId() {
        return DatabaseId;
    }

    public void setDatabaseId(Integer databaseId) {
        DatabaseId = databaseId;
    }

    public String getDatabaseType() {
        return DatabaseType;
    }

    public void setDatabaseType(String databaseType) {
        DatabaseType = databaseType;
    }

    public List<AreaModel> getAreas() {
        return areas;
    }

    public void setAreas(List<AreaModel> areas) {
        this.areas = areas;
    }

    public ProjectModel getProject() {
        return project;
    }

    public void setProject(ProjectModel project) {
        this.project = project;
    }
}
