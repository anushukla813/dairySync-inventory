package com.dairysync.backend.security.jwt;


import com.dairysync.backend.security.service.UserDetailsServiceImpl;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;


import java.io.IOException;



@Component
public class JwtAuthFilter extends OncePerRequestFilter {


    @Autowired
    private JwtUtils jwtUtils;



    @Autowired
    private UserDetailsServiceImpl userDetailsService;



    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    )
            throws ServletException, IOException {



        String authHeader = request.getHeader("Authorization");



        if(authHeader == null || !authHeader.startsWith("Bearer ")){

            filterChain.doFilter(request,response);
            return;

        }



        String token = authHeader.substring(7);



        try {


            if(jwtUtils.validateToken(token)){


                String email = jwtUtils.extractEmail(token);



                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(email);



                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );



                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);



                System.out.println("==============================");
                System.out.println("Authenticated User : " 
                        + userDetails.getUsername());

                System.out.println("==============================");


            }



        }
        catch(Exception e){

            System.out.println("JWT Authentication Failed");
            e.printStackTrace();

        }



        filterChain.doFilter(request,response);

    }

}