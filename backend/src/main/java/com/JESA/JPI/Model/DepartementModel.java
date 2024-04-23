package com.JESA.JPI.Model;

import jakarta.persistence.*;

import java.util.List;

@Entity(name = "Departement")
public class DepartementModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer DepartementId;
    private String DepartementName;
    private String DepartementCode;
    @ManyToOne
    @JoinColumn(name = "subArea_id")
    private SubAreaModel subArea;
    @OneToMany(mappedBy = "departement", cascade = CascadeType.ALL)
    private List<TaskModel> tasks;

    public Integer getDepartementId() {
        return DepartementId;
    }

    public void setDepartementId(Integer departementId) {
        DepartementId = departementId;
    }

    public String getDepartementName() {
        return DepartementName;
    }

    public void setDepartementName(String departementName) {
        DepartementName = departementName;
    }

    public String getDepartementCode() {
        return DepartementCode;
    }

    public void setDepartementCode(String departementCode) {
        DepartementCode = departementCode;
    }

    public SubAreaModel getSubArea() {
        return subArea;
    }

    public void setSubArea(SubAreaModel subArea) {
        this.subArea = subArea;
    }

    public List<TaskModel> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskModel> tasks) {
        this.tasks = tasks;
    }
}
