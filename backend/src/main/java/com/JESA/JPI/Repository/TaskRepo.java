package com.JESA.JPI.Repository;

import com.JESA.JPI.Model.TaskModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends JpaRepository<TaskModel,Integer> {
}
