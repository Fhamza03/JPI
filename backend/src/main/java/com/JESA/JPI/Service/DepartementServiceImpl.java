package com.JESA.JPI.Service;

import com.JESA.JPI.Model.DepartementModel;

import java.util.List;
import java.util.Optional;

public interface DepartementServiceImpl {
    DepartementModel GetDepartementById(Integer departementId);
    List<DepartementModel> GetAllDepartement();
    DepartementModel CreateDepartement(DepartementModel departement);
    DepartementModel UpdateDepartement(DepartementModel departement);
    void DeleteDepartement(Integer departementId);
}
