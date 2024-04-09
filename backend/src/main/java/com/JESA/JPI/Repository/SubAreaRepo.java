package com.JESA.JPI.Repository;

import com.JESA.JPI.Model.SubAreaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubAreaRepo extends JpaRepository<SubAreaModel,Integer> {
}
