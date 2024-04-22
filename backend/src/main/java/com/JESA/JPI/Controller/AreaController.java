package com.JESA.JPI.Controller;

import com.JESA.JPI.Model.AreaModel;
import com.JESA.JPI.Model.DatabaseModel;
import com.JESA.JPI.Service.AreaService;
import com.JESA.JPI.Service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AreaController {
    @Autowired
    AreaService areaService;
    @Autowired
    DatabaseService databaseService;
    @GetMapping("/getArea/{areaId}")
    public AreaModel getArea(@PathVariable Integer areaId){
        try{
            return areaService.getArea(areaId);
        }catch (Exception e){
            throw new RuntimeException("FAILED TO GET AREA");
        }
    }
    @GetMapping("/getAllAreas")
    public List<AreaModel> getAllAreas(){
        try{
            return areaService.getAllAreas();
        }catch (Exception e){
            throw new RuntimeException("FAILED TO GET ALL AREAS");
        }
    }
    @PostMapping("/admin/createArea/{databaseId}")
    public AreaModel createArea(@RequestBody AreaModel area,@PathVariable Integer databaseId){
        try{
            DatabaseModel database = databaseService.getDatabase(databaseId);
            if (database == null) {
                return null;
            }
            area.setDatabase(database);
            return areaService.createArea(area);
        }catch (Exception e){
            throw new RuntimeException("FAILED TO CREATE AREA");
        }
    }
    @PostMapping("/admin/updateArea/{areaId}")
    public AreaModel updateDatabase(@PathVariable Integer areaId, @RequestBody AreaModel area){
        try{
            area.setAreaId(areaId);
            return areaService.updateArea(area);
        }catch (Exception e){
            throw new RuntimeException("FAILED TO UPDATE AREA");
        }
    }
    @DeleteMapping("/admin/deleteArea/{areaId}")
    public void deleteArea(@PathVariable Integer areaId){
        try{
            areaService.deleteArea(areaId);
        }catch (Exception e){
            throw new RuntimeException("FAILED TO DELETE AREA");
        }
    }

    @GetMapping("/getAriasByDatabase/{databaseId}")
    public List<AreaModel> getAreasByDatabaseId(@PathVariable Integer databaseId) {
        try {
            DatabaseModel database = databaseService.getDatabase(databaseId);
            return database.getAreas();
        } catch (Exception e) {
            throw new RuntimeException("Failed to get Area of database number " + databaseId);
        }
    }
}
