package com.JESA.JPI.Repository;

import com.JESA.JPI.Model.FileModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepo extends JpaRepository<FileModel,Integer> {
}
