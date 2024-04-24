package com.JESA.JPI.Service;

import com.JESA.JPI.Model.SubAreaModel;
import com.JESA.JPI.Repository.SubAreaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class SubAreaService implements SubAreaServiceImpl {
    @Autowired
    SubAreaRepo subAreaRepo;
    @Override
    public SubAreaModel getSubArea(Integer subAreaId) {
        Optional<SubAreaModel> subAreaModel = subAreaRepo.findById(subAreaId);
        return  subAreaModel.orElse(null);
    }

    @Override
    public List<SubAreaModel> getAllSubAreas() {
        List<SubAreaModel> subAreaModels = subAreaRepo.findAll();
        if(subAreaModels.isEmpty()){
            throw new RuntimeException("No sub area found");
        }
        return subAreaModels;
    }

    @Override
    public SubAreaModel createSubArea(SubAreaModel subAreaModel) {
        try{
            return subAreaRepo.save(subAreaModel);
        }catch (DataIntegrityViolationException ex){
            throw new RuntimeException("Failed to create subArea: " + ex.getMessage());
        }
    }

    @Override
    public SubAreaModel updateSubArea(SubAreaModel subAreaModel) {
        try{
            return subAreaRepo.save(subAreaModel);
        }catch (DataIntegrityViolationException ex){
            throw new RuntimeException("Failed to update subArea: " + ex.getMessage());
        }
    }

    @Override
    public void deleteSubArea(Integer subAreaId) {
        try{
            subAreaRepo.deleteById(subAreaId);
        }catch(DataIntegrityViolationException ex){
            throw new RuntimeException("Failed to delete subarea: " + ex.getMessage());
        }
    }
}
