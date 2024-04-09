package com.JESA.JPI.Repository;

import com.JESA.JPI.Model.AreaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaRepo extends JpaRepository<AreaModel,Integer>{
}
