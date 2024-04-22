package com.JESA.JPI.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity(name = "SubArea")
public class SubAreaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer SubAreaId;
    private String SubAreaName;
    private String SubAreaCode;
    @ManyToOne
    @JoinColumn(name = "area_id")
    @JsonIgnoreProperties({"subAreas"})
    private AreaModel area;
    @OneToMany(mappedBy = "subArea")
    private List<DepartementModel> departements;

    public Integer getSubAreaId() {
        return SubAreaId;
    }

    public void setSubAreaId(Integer subAreaId) {
        SubAreaId = subAreaId;
    }

    public String getSubAreaName() {
        return SubAreaName;
    }

    public void setSubAreaName(String subAreaName) {
        SubAreaName = subAreaName;
    }

    public String getSubAreaCode() {
        return SubAreaCode;
    }

    public void setSubAreaCode(String subAreaCode) {
        SubAreaCode = subAreaCode;
    }

    public AreaModel getArea() {
        return area;
    }

    public void setArea(AreaModel area) {
        this.area = area;
    }

    public List<DepartementModel> getDepartements() {
        return departements;
    }

    public void setDepartements(List<DepartementModel> departements) {
        this.departements = departements;
    }
}
