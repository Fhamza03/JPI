package com.JESA.JPI.Service;

import com.JESA.JPI.Model.FileModel;

import java.util.List;

public interface FileServiceImpl {
    public FileModel createFile(FileModel file);
    public FileModel updateFile(FileModel file);
    public void deleteFile(Integer fileId);
    public FileModel getFile(Integer fileId);
    public List<FileModel> getAllFiles();
}
