package com.JESA.JPI.Controller;

import com.JESA.JPI.Model.DepartementModel;
import com.JESA.JPI.Service.DepartementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DepartementController {
    @Autowired
    DepartementService departementService;
    @PostMapping("/index")
    public DepartementModel saveToDatabase(@RequestBody DepartementModel departement){
        try {
            return departementService.CreateDepartement(departement);
        }catch (Exception e){
            throw new RuntimeException("FAILED TO ADD DEPARTEMENT");
        }
    }

}
