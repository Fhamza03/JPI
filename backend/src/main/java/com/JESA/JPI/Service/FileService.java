package com.JESA.JPI.Service;

import com.JESA.JPI.Model.FileModel;
import com.JESA.JPI.Repository.FileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FileService implements  FileServiceImpl{
    @Autowired
    FileRepo fileRepo;
    @Override
    public FileModel createFile(FileModel file) {
        try{
            return fileRepo.save(file);
        }catch (DataIntegrityViolationException ex){
            throw new RuntimeException("Failed to create file");
        }
    }

    @Override
    public FileModel updateFile(FileModel file) {
        try{
            return fileRepo.save(file);
        }catch (DataIntegrityViolationException ex){
            throw new RuntimeException("Failed to create file");
        }
    }

    @Override
    public void deleteFile(Integer fileId) {
        try{
            fileRepo.deleteById(fileId);
        }catch (DataIntegrityViolationException ex){
            throw new RuntimeException("Failed to create file");
        }
    }

    @Override
    public FileModel getFile(Integer fileId) {
        Optional<FileModel> file = fileRepo.findById(fileId);
        return file.orElse(null);
    }

    @Override
    public List<FileModel> getAllFiles() {
        List<FileModel> files = fileRepo.findAll();
        if (files.isEmpty()){
            throw new RuntimeException("No file found");
        }
        return files;
    }
}
