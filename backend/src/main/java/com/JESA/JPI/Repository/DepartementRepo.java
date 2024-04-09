package com.JESA.JPI.Repository;

import com.JESA.JPI.Model.DepartementModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartementRepo extends JpaRepository<DepartementModel,Integer> {
}
