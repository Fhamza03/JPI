package com.JESA.JPI.Service;

import com.JESA.JPI.Model.AreaModel;

import java.util.List;

public interface AreaServiceImpl {
    AreaModel getArea(Integer areaId);
    List<AreaModel> getAllAreas();
    AreaModel createArea(AreaModel area);
    AreaModel updateArea(AreaModel area);
    void deleteArea(Integer areaId);

}
