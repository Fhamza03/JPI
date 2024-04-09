package com.JESA.JPI.Repository;

import com.JESA.JPI.Model.DatabaseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface DatabaseRepo extends JpaRepository<DatabaseModel,Integer> {
}
