package com.JESA.JPI.Service;

import com.JESA.JPI.Model.DatabaseModel;
import com.JESA.JPI.Model.DepartementModel;
import com.JESA.JPI.Model.ProjectModel;
import com.JESA.JPI.Repository.DatabaseRepo;
import com.JESA.JPI.Repository.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DatabaseService implements DatabaseServiceImpl {
    @Autowired
    DatabaseRepo databaseRepo;
    @Autowired
    ProjectRepo projectRepo;
    @Override
    public DatabaseModel createDatabase(DatabaseModel database) {
        try {
            return databaseRepo.save(database);
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Failed to create database: " + ex.getMessage());
        }
    }

    @Override
    public void deleteDatabase(Integer databaseId) {
        try {
            databaseRepo.deleteById(databaseId);
        }catch (DataIntegrityViolationException ex){
            throw new RuntimeException("Failed to delete database: " + ex.getMessage());
        }
    }

    @Override
    public DatabaseModel updateDatabase(DatabaseModel database) {
        try {
            return databaseRepo.save(database);
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Failed to update database: " + ex.getMessage());
        }
    }

    @Override
    public List<DatabaseModel> getAllDatabases() {
        List<DatabaseModel> databases = databaseRepo.findAll();
        if (databases.isEmpty()) {
            throw new RuntimeException("No department found");
        }
        return databases;
    }

    @Override
    public DatabaseModel getDatabase(Integer databaseId) {
        Optional<DatabaseModel> database = databaseRepo.findById(databaseId);
        return database.orElse(null);
    }
}
