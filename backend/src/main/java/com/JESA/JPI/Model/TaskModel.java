package com.JESA.JPI.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity(name = "Task")
public class TaskModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer TaskId;
    private String TaskName;
    private String TaskCode;
    @ManyToOne
    @JoinColumn(name = "departement_id")
    @JsonIgnoreProperties({"tasks"})
    private DepartementModel departement;
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    private List<FileModel> files;

    public Integer getTaskId() {
        return TaskId;
    }

    public void setTaskId(Integer taskId) {
        TaskId = taskId;
    }

    public String getTaskName() {
        return TaskName;
    }

    public void setTaskName(String taskName) {
        TaskName = taskName;
    }

    public String getTaskCode() {
        return TaskCode;
    }

    public void setTaskCode(String taskCode) {
        TaskCode = taskCode;
    }

    public DepartementModel getDepartement() {
        return departement;
    }

    public void setDepartement(DepartementModel departement) {
        this.departement = departement;
    }

    public List<FileModel> getFiles() {
        return files;
    }

    public void setFiles(List<FileModel> files) {
        this.files = files;
    }
}
