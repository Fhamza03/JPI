package com.JESA.JPI.Model;

import jakarta.persistence.*;

import java.util.List;

@Entity(name = "Area")
public class AreaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer AreaId;
    private String AreaName;
    private String AreaCode;
    @ManyToOne
    @JoinColumn(name = "database_id")
    private DatabaseModel database;
    @OneToMany(mappedBy = "area")
    private List<SubAreaModel> subAreas;

    public Integer getAreaId() {
        return AreaId;
    }

    public String getAreaName() {
        return AreaName;
    }

    public String getAreaCode() {
        return AreaCode;
    }

    public DatabaseModel getDatabase() {
        return database;
    }

    public List<SubAreaModel> getSubAreas() {
        return subAreas;
    }

    public void setAreaId(Integer areaId) {
        AreaId = areaId;
    }

    public void setAreaName(String areaName) {
        AreaName = areaName;
    }

    public void setAreaCode(String areaCode) {
        AreaCode = areaCode;
    }

    public void setDatabase(DatabaseModel database) {
        this.database = database;
    }

    public void setSubAreas(List<SubAreaModel> subAreas) {
        this.subAreas = subAreas;
    }
}
