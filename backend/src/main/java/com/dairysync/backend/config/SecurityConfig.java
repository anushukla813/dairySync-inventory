package com.dairysync.backend.config;


import com.dairysync.backend.security.jwt.JwtAuthFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Autowired
    private JwtAuthFilter jwtAuthFilter;



    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {


        http


                // Enable CORS
                .cors(cors -> {})


                // Disable CSRF because this is REST API
                .csrf(csrf -> csrf.disable())


                // JWT Authentication - No Session
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                .authorizeHttpRequests(auth -> auth



                        // ==========================
                        // PUBLIC APIs
                        // ==========================

                        .requestMatchers(
                                "/auth/**"
                        )
                        .permitAll()



                        // CORS Preflight
                        .requestMatchers(
                                org.springframework.http.HttpMethod.OPTIONS,
                                "/**"
                        )
                        .permitAll()



                        // ==========================
                        // VENDOR APIs
                        // ==========================

                        .requestMatchers(
                                "/vendor/**"
                        )
                        .hasAuthority("ROLE_VENDOR")



                        // ==========================
                        // OTHER PROTECTED APIs
                        // ==========================

                        .anyRequest()
                        .authenticated()

                )



                // Add JWT Filter
                .addFilterBefore(
                        jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class
                );



        return http.build();

    }

}