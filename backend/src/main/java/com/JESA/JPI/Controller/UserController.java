package com.JESA.JPI.Controller;

import com.JESA.JPI.Model.UserModel;
import com.JESA.JPI.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private static final Logger LOGGER = Logger.getLogger(UserController.class.getName());

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    UserDetailsService userDetailsService;

    @PostMapping("/signup")
    public ResponseEntity<UserModel> SignUp(@RequestBody UserModel user) {
        try {
            user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
            UserModel newUser = userService.CreateUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error occurred while signing up user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserModel user, HttpServletRequest request) {
        try {
            // Load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());

            // Set session attributes
            HttpSession session = request.getSession();
            session.setAttribute("username", userDetails.getUsername());
            session.setAttribute("role", userDetails.getAuthorities());

            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getUserPassword()));

            // Set authentication in security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            LOGGER.info("User logged in: " + userDetails.getUsername());

            // Extract role without prefix and return successful response
            String role = userDetails.getAuthorities().iterator().next().getAuthority();
            return ResponseEntity.ok(role);
        } catch (UsernameNotFoundException e) {
            LOGGER.warning("User not found: " + user.getUsername());
            // Return unauthorized response for invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error occurred during login", e);
            // Return internal server error response for other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during login");
        }
    }
    @PostMapping("/logoutUser")
    public ResponseEntity<String> Logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }
            return ResponseEntity.ok("Logout successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during logout");
        }
    }

    @GetMapping("/user/hello")
    public String getTextUser(){
        return "hello user";
    }
    @GetMapping("/admin/hello")
    public String getTextAdmin(){
        return "hello admin";
    }

}
