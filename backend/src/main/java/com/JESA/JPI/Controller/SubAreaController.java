package com.JESA.JPI.Controller;

import com.JESA.JPI.Model.AreaModel;
import com.JESA.JPI.Model.DatabaseModel;
import com.JESA.JPI.Model.SubAreaModel;
import com.JESA.JPI.Service.AreaService;
import com.JESA.JPI.Service.SubAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SubAreaController {
    @Autowired
    SubAreaService subAreaService;
    @Autowired
    AreaService areaService;
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
    @PostMapping("/admin/createSubArea/{areaId}")
    public SubAreaModel createSubArea(@PathVariable Integer areaId, @RequestBody SubAreaModel subAreaModel){
        try{
            AreaModel area = areaService.getArea(areaId);
            if (area == null) {
                return null;
            }
            subAreaModel.setArea(area);
            return subAreaService.createSubArea(subAreaModel);
        }catch (Exception e){
            throw new RuntimeException("Failed to create SubArea");
        }
    }
    @PostMapping("/admin/updateSubArea/{subAreaId}")
    public SubAreaModel updateSubArea(@PathVariable Integer subAreaId,@RequestBody SubAreaModel subAreaModel){
        try{
            AreaModel area = subAreaService.getSubArea(subAreaId).getArea();
            subAreaModel.setSubAreaId(subAreaId);
            subAreaModel.setArea(area);
            return subAreaService.updateSubArea(subAreaModel);
        }catch (Exception e){
            throw new RuntimeException("Failed to update SubArea"+ e.getMessage());
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
    @GetMapping("/getSubAreasByArea/{areaId}")
    public List<SubAreaModel> getSubAreasByArea(@PathVariable Integer areaId) {
        try {
            AreaModel area = areaService.getArea(areaId);
            return area.getSubAreas();
        } catch (Exception e) {
            throw new RuntimeException("Failed to get SubAreas of Area number " + areaId);
        }
    }
}
