package com.dairysync.backend.service;

import com.dairysync.backend.dto.request.LoginRequest;
import com.dairysync.backend.dto.request.RegisterRequest;
import com.dairysync.backend.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse registerUser(RegisterRequest registerRequest);
    AuthResponse loginUser(LoginRequest loginRequest);
}