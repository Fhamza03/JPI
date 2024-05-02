package com.JESA.JPI.Configuration;

import com.JESA.JPI.Model.UserModel;
import com.JESA.JPI.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserModel> user = userRepo.findByUsername(username);
        if (user.isPresent()) {
            var userObj = user.get();
            // Construct user details map including user ID
            Map<String, String> userDetailsMap = new HashMap<>();
            userDetailsMap.put("userId", String.valueOf(userObj.getUserId()));
            userDetailsMap.put("username", userObj.getUsername());
            userDetailsMap.put("password", userObj.getUserPassword());
            userDetailsMap.put("role", userObj.getUserRole());

            // Return user details map
            return new CustomUser(userDetailsMap);
        } else {
            throw new UsernameNotFoundException(username);
        }
    }


}
