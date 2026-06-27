package com.dairysync.backend.controller;

import com.dairysync.backend.dto.request.LoginRequest;
import com.dairysync.backend.dto.request.RegisterRequest;
import com.dairysync.backend.dto.response.ApiResponse;
import com.dairysync.backend.dto.response.AuthResponse;
import com.dairysync.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Registered successfully!", response)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Login successful!", response)
        );
    }
}