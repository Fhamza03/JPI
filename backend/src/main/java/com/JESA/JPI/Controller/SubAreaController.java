package com.JESA.JPI.Controller;

import com.JESA.JPI.Model.SubAreaModel;
import com.JESA.JPI.Service.SubAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SubAreaController {
    @Autowired
    SubAreaService subAreaService;
    @GetMapping("/getSubArea/{subAreaId}")
    public SubAreaModel getSubArea(@PathVariable Integer subAreaId){
        try{
            return subAreaService.getSubArea(subAreaId);
        }catch (Exception e){
            throw new RuntimeException("Failed to getSubArea");
        }
    }
    @GetMapping("/getAllSubAreas")
    public List<SubAreaModel> getAllSubAreas(){
        try{
            return subAreaService.getAllSubAreas();
        }catch (Exception e){
            throw new RuntimeException("Failed to get all SubAreas");
        }
    }
    @PostMapping("/admin/createSubArea")
    public SubAreaModel createSubArea(@RequestBody SubAreaModel subAreaModel){
        try{
            return subAreaService.createSubArea(subAreaModel);
        }catch (Exception e){
            throw new RuntimeException("Failed to create SubArea");
        }
    }
    @PostMapping("/admin/updateSubArea/{subAreaId}")
    public SubAreaModel updateSubArea(@PathVariable Integer subAreaId,@RequestBody SubAreaModel subAreaModel){
        try{
            subAreaModel.setSubAreaId(subAreaId);
            return subAreaService.updateSubArea(subAreaModel);
        }catch (Exception e){
            throw new RuntimeException("Failed to update SubArea");
        }
    }
    @DeleteMapping("/admin/deleteSubArea/{subAreaId}")
    public void deleteSubArea(@PathVariable Integer subAreaId){
        try{
            subAreaService.deleteSubArea(subAreaId);
        }catch (Exception e){
            throw new RuntimeException("Failed to delete SubArea");
        }
    }
}
