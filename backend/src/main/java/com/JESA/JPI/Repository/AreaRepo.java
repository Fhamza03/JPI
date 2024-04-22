package com.JESA.JPI.Repository;

import com.JESA.JPI.Model.AreaModel;
import com.JESA.JPI.Model.DatabaseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaRepo extends JpaRepository<AreaModel,Integer>{

}
