package com.JESA.JPI.Service;

import com.JESA.JPI.Model.AreaModel;
import com.JESA.JPI.Model.DatabaseModel;
import com.JESA.JPI.Repository.AreaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AreaService implements  AreaServiceImpl{
    @Autowired
    AreaRepo areaRepo;
    @Override
    public AreaModel getArea(Integer areaId) {
            Optional<AreaModel> area = areaRepo.findById(areaId);
            return area.orElse(null);
    }

    @Override
    public List<AreaModel> getAllAreas() {
        List<AreaModel> areas = areaRepo.findAll();
        if(areas.isEmpty()){
            throw new RuntimeException("No area found");
        }
        return areas;
    }

    @Override
    public AreaModel createArea(AreaModel area) {
        try {
            return areaRepo.save(area);
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Failed to create area: " + ex.getMessage());
        }
    }

    @Override
    public AreaModel updateArea(AreaModel area) {
        try {
            return areaRepo.save(area);
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Failed to create area: " + ex.getMessage());
        }
    }

    @Override
    public void deleteArea(Integer areaId) {
        try {
            areaRepo.deleteById(areaId);
        }catch (DataIntegrityViolationException ex){
            throw new RuntimeException("Failed to delete area: " + ex.getMessage());
        }
    }

}
