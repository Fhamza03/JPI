package com.JESA.JPI.Service;

import com.JESA.JPI.Model.DatabaseModel;

import java.util.List;

public interface DatabaseServiceImpl {
    DatabaseModel createDatabase(DatabaseModel database);
    void deleteDatabase(Integer databaseId);
    DatabaseModel updateDatabase(DatabaseModel database);
    List<DatabaseModel> getAllDatabases();
    DatabaseModel getDatabase(Integer databaseId);
}
