package com.JESA.JPI.Controller;

import com.JESA.JPI.Configuration.CustomUser;
import com.JESA.JPI.Model.UserModel;
import com.JESA.JPI.Repository.UserRepo;
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

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private static final Logger LOGGER = Logger.getLogger(UserController.class.getName());

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepo userRepo;

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
    public ResponseEntity<Map<String, String>> login(@RequestBody UserModel user, HttpServletRequest request) {
        try {
            // Load user details including user ID
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());

            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getUserPassword()));

            // Set authentication in security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Set session attributes
            HttpSession session = request.getSession();
            session.setAttribute("username", userDetails.getUsername());
            session.setAttribute("role", userDetails.getAuthorities());

            LOGGER.info("User logged in: " + userDetails.getUsername());

            // Extract role without prefix
            String role = userDetails.getAuthorities().iterator().next().getAuthority();

            // Create response body with user ID and role
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("userId", ((CustomUser) userDetails).getUserId()); // Include user ID
            responseBody.put("role", role);

            // Return successful response with user ID and role
            return ResponseEntity.ok(responseBody);
        } catch (UsernameNotFoundException e) {
            LOGGER.warning("User not found: " + user.getUsername());
            // Return unauthorized response for invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "Invalid username or password"));
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error occurred during login", e);
            // Return internal server error response for other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Error occurred during login" + e.getMessage()));
        }
    }



    @PostMapping("/logoutUser")
    public ResponseEntity<String> Logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }
            LOGGER.info("User logged out");
            return ResponseEntity.ok("Logout successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during logout");
        }
    }
}
