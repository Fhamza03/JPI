package com.JESA.JPI.Service;

import com.JESA.JPI.Model.SubAreaModel;

import java.util.List;

public interface SubAreaServiceImpl {
    SubAreaModel getSubArea(Integer subAreaId);
    List<SubAreaModel> getAllSubAreas();
    SubAreaModel createSubArea(SubAreaModel subAreaModel);
    SubAreaModel updateSubArea(SubAreaModel subAreaModel);
    void deleteSubArea(Integer subAreaId);
}
