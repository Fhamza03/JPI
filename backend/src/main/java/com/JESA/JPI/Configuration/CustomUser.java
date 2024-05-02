package com.JESA.JPI.Configuration;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

public class CustomUser implements UserDetails {

    private final Map<String, String> userDetailsMap;

    public CustomUser(Map<String, String> userDetailsMap) {
        this.userDetailsMap = userDetailsMap;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Create a SimpleGrantedAuthority list containing user's role
        return Collections.singleton(new SimpleGrantedAuthority(userDetailsMap.get("role")));
    }

    @Override
    public String getPassword() {
        return userDetailsMap.get("password");
    }

    @Override
    public String getUsername() {
        return userDetailsMap.get("username");
    }

    // Additional method to get user ID from userDetailsMap
    public String getUserId() {
        return userDetailsMap.get("userId");
    }

    // Implement other UserDetails methods as needed
    // ...

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
