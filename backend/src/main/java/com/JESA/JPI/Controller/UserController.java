package com.JESA.JPI.Controller;

import com.JESA.JPI.Model.UserModel;
import com.JESA.JPI.Repository.UserRepo;
import com.JESA.JPI.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/home")
    public UserModel createUser(@RequestBody UserModel user) {
        user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
        return userService.CreateUser(user);
    }
}
