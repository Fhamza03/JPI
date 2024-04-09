package com.JESA.JPI.Service;

import com.JESA.JPI.Model.DepartementModel;
import com.JESA.JPI.Repository.DepartementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartementService implements DepartementServiceImpl{
    @Autowired
    DepartementRepo departementRepo;

    @Override
    public DepartementModel GetDepartementById(Integer departementId) {
        Optional<DepartementModel> departement = departementRepo.findById(departementId);
        return departement.orElse(null);
    }

    @Override
    public List<DepartementModel> GetAllDepartement() {
        List<DepartementModel> departments = departementRepo.findAll();
        if (departments.isEmpty()) {
            throw new RuntimeException("No departments found");
        }
        return departments;
    }

    @Override
    public DepartementModel CreateDepartement(DepartementModel departement) {
        try {
            return departementRepo.save(departement);
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Failed to create department: " + ex.getMessage());
        }
    }


    @Override
    public DepartementModel UpdateDepartement(DepartementModel departement) {
        try {
            return departementRepo.save(departement);
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Failed to update department: " + ex.getMessage());
        }
    }


    @Override
    public void DeleteDepartement(Integer departementId) {
        try {
            departementRepo.deleteById(departementId);
        }catch (DataIntegrityViolationException ex){
            throw new RuntimeException("Failed to delete departement: " + ex.getMessage());
        }
    }
}
