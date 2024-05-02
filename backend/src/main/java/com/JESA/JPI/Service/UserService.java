package com.JESA.JPI.Service;

import com.JESA.JPI.Model.DepartementModel;
import com.JESA.JPI.Model.UserModel;
import com.JESA.JPI.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;
    public UserModel CreateUser(UserModel user) {
        try {
            return userRepo.save(user);
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Failed to create user: " + ex.getMessage());
        }
    }

}
