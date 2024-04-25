package com.JESA.JPI.Controller;

import com.JESA.JPI.Model.DepartementModel;
import com.JESA.JPI.Model.SubAreaModel;
import com.JESA.JPI.Service.DepartementService;
import com.JESA.JPI.Service.SubAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DepartementController {
    @Autowired
    DepartementService departementService;
    @Autowired
    SubAreaService subAreaService;
    @GetMapping("/getDepartementsBySubArea/{subAreaId}")
    public List<DepartementModel> getDepartementsBySubArea(@PathVariable Integer subAreaId){
        try{
            SubAreaModel subarea = subAreaService.getSubArea(subAreaId);
            return subarea.getDepartements();
        }catch (Exception e){
            throw new RuntimeException("Failed to get Departements of subArea : " + subAreaId);
        }
    }
    @GetMapping("/getDepartement/{departementId}")
    public DepartementModel getDepartement(@PathVariable Integer departementId){
        try{
            return departementService.GetDepartementById(departementId);
        }catch (Exception e){
            throw new RuntimeException("Failed to get departement "+ departementId);
        }
    }
    @PostMapping("/admin/createDepartement/{subAreaId}")
    public DepartementModel saveDepartementForSubArea(@PathVariable Integer subAreaId , @RequestBody DepartementModel departement){
        try {
            SubAreaModel subarea = subAreaService.getSubArea(subAreaId);
            if(subarea ==null){
                return null;
            }
            departement.setSubArea(subarea);
            return departementService.CreateDepartement(departement);
        }catch (Exception e){
            throw new RuntimeException("FAILED TO ADD DEPARTEMENT");
        }
    }
    @PostMapping("/admin/updateDepartement/{departementId}")
    public DepartementModel updateDepartement(@PathVariable Integer departementId,@RequestBody DepartementModel departementModel){
        try{
            SubAreaModel subarea = departementService.GetDepartementById(departementId).getSubArea();
            departementModel.setDepartementId(departementId);
            departementModel.setSubArea(subarea);
            return departementService.UpdateDepartement(departementModel);
        }catch (Exception e){
            throw new RuntimeException("Failed to update Departement "+ departementId);
        }
    }
    @DeleteMapping("/admin/deleteDepartement/{departementId}")
    public void deleteDepartement(@PathVariable Integer departementId){
        try{
            departementService.DeleteDepartement(departementId);
        }catch (Exception e){
            throw new RuntimeException("Failed to delete departement "+ departementId);
        }
    }

}
