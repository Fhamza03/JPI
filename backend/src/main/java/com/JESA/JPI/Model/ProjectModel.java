package com.JESA.JPI.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity(name = "Project")
public class ProjectModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ProjectId;
    private String ProjectName;
    private String ProjectCode;
    private String Client;
    private String LeadServer;
    private String LeadOffice;
    private String Location;
    private String DatabaseLocation;
    private String LineOfBusiness;
    private String ServerName;
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<DatabaseModel> databases;

    public Integer getProjectId() {
        return ProjectId;
    }

    public void setProjectId(Integer projectId) {
        ProjectId = projectId;
    }

    public String getProjectName() {
        return ProjectName;
    }

    public void setProjectName(String projectName) {
        ProjectName = projectName;
    }

    public String getProjectCode() {
        return ProjectCode;
    }

    public void setProjectCode(String projectCode) {
        ProjectCode = projectCode;
    }

    public String getClient() {
        return Client;
    }

    public void setClient(String client) {
        Client = client;
    }

    public String getLeadServer() {
        return LeadServer;
    }

    public void setLeadServer(String leadServer) {
        LeadServer = leadServer;
    }

    public String getLeadOffice() {
        return LeadOffice;
    }

    public void setLeadOffice(String leadOffice) {
        LeadOffice = leadOffice;
    }

    public String getLocation() {
        return Location;
    }

    public void setLocation(String location) {
        Location = location;
    }

    public String getDatabaseLocation() {
        return DatabaseLocation;
    }

    public void setDatabaseLocation(String databaseLocation) {
        DatabaseLocation = databaseLocation;
    }

    public String getLineOfBusiness() {
        return LineOfBusiness;
    }

    public void setLineOfBusiness(String lineOfBusiness) {
        LineOfBusiness = lineOfBusiness;
    }

    public String getServerName() {
        return ServerName;
    }

    public void setServerName(String serverName) {
        ServerName = serverName;
    }

    public List<DatabaseModel> getDatabases() {
        return databases;
    }

    public void setDatabases(List<DatabaseModel> databases) {
        this.databases = databases;
    }
}
