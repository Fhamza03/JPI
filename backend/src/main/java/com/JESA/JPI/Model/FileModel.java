package com.JESA.JPI.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity(name = "File")
public class FileModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer FileId;
    private String FileName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date Created_On;
    private String FileCode;
    private String Rev;
    private String SubjectOfRev;
    private String pdf_path;
    @ManyToOne
    @JsonIgnoreProperties({"files"})
    @JoinColumn(name = "task_id")
    private TaskModel task;
    @ManyToOne
    @JsonIgnoreProperties({"files"})
    @JoinColumn(name = "user_id")
    private UserModel user;

    public Integer getFileId() {
        return FileId;
    }

    public void setFileId(Integer fileId) {
        FileId = fileId;
    }

    public String getFileName() {
        return FileName;
    }

    public void setFileName(String fileName) {
        FileName = fileName;
    }

    public Date getCreated_On() {
        return Created_On;
    }

    public void setCreated_On(Date created_On) {
        Created_On = created_On;
    }

    public String getFileCode() {
        return FileCode;
    }

    public void setFileCode(String fileCode) {
        FileCode = fileCode;
    }

    public String getRev() {
        return Rev;
    }

    public void setRev(String rev) {
        Rev = rev;
    }

    public String getSubjectOfRev() {
        return SubjectOfRev;
    }

    public void setSubjectOfRev(String subjectOfRev) {
        SubjectOfRev = subjectOfRev;
    }

    public String getPdf_path() {
        return pdf_path;
    }

    public void setPdf_path(String pdf_path) {
        this.pdf_path = pdf_path;
    }

    public TaskModel getTask() {
        return task;
    }

    public void setTask(TaskModel task) {
        this.task = task;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }
}
