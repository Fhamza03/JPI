package com.JESA.JPI.Configuration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

    @Autowired
    private UserDetailsService userDetailService;

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//        return httpSecurity
//                .csrf(AbstractHttpConfigurer::disable)
//                .authorizeHttpRequests(registry -> {
//                    registry.requestMatchers("/signup","/login").permitAll();
//                    registry.requestMatchers("/admin/**").permitAll();
//                    registry.requestMatchers("/user/**").hasRole("USER");
//                    registry.requestMatchers("/**").permitAll();
//                    registry.anyRequest().authenticated();
//                })
//                .logout((logout) -> logout
//                        .logoutSuccessUrl("/logoutUser")
//                        .deleteCookies("JSESSIONID")
//                        .permitAll()
//                )
//                .build();
//    }
@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    http.csrf().disable()
            .authorizeRequests((authorize) -> {
                authorize.requestMatchers(HttpMethod.POST,"/signup","/login").permitAll();
                    authorize.requestMatchers(HttpMethod.POST, "/admin/**").hasRole("ADMIN");
                    authorize.requestMatchers(HttpMethod.POST, "/user/**").hasRole("USER");
                    authorize.requestMatchers(HttpMethod.DELETE, "/admin/**").hasRole("ADMIN");
                    authorize.requestMatchers(HttpMethod.GET, "/getArea/**","/getAllAreas","/getAriasByDatabase/**","/getDatabase/**","/getAllDatabases","/getDatabasesByProject/**").hasAnyRole("ADMIN", "USER");
                    authorize.requestMatchers(HttpMethod.GET,"/getAllProjects","/getSubArea/**","/getAllSubAreas","/getSubAreasByArea/**","/getDepartementsBySubArea/**","/getDepartement/**").hasAnyRole("ADMIN","USER");
                    authorize.requestMatchers(HttpMethod.GET,"/getTasksByDepartement/**").hasAnyRole("ADMIN","USER");
                    authorize.anyRequest().authenticated();
            }).httpBasic(Customizer.withDefaults());
    http.logout((logout) -> logout
                        .logoutSuccessUrl("/logoutUser")
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                );
    return http.build();
}
    @Bean
    public UserDetailsService userDetailsService() {
        return userDetailService;
    }
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(Collections.singletonList(provider));
    }
}
