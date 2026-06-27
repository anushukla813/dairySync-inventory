package com.dairysync.backend.service;

import com.dairysync.backend.dto.request.LoginRequest;
import com.dairysync.backend.dto.request.RegisterRequest;
import com.dairysync.backend.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest registerRequest);
    AuthResponse login(LoginRequest loginRequest);
}