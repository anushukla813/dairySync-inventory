package com.dairysync.backend.serviceimpl;

import com.dairysync.backend.dto.request.LoginRequest;
import com.dairysync.backend.dto.request.RegisterRequest;
import com.dairysync.backend.dto.response.AuthResponse;
import com.dairysync.backend.model.entity.User;
import com.dairysync.backend.model.enums.Role;
import com.dairysync.backend.repository.UserRepository;
import com.dairysync.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public AuthResponse register(RegisterRequest registerRequest) {

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }
        Role role;
        try {
            role = Role.valueOf(
                    registerRequest.getRole() != null
                            ? registerRequest.getRole()
                            : "ROLE_VENDOR"
            );
        } catch (IllegalArgumentException e) {
            role = Role.ROLE_VENDOR;
        }

        User user = new User();
                user.setFullName(registerRequest.getFullName());
                user.setEmail(registerRequest.getEmail());
                user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
                user.setPhone(registerRequest.getPhone());
                user.setLocation(registerRequest.getLocation());
                user.setRole(role);
                user.setIsActive(true);


        User savedUser = userRepository.save(user);

        return AuthResponse.builder()
                .email(savedUser.getEmail())
                .fullName(savedUser.getFullName())
                .role(savedUser.getRole().name())
                .token("SESSION_ACTIVE_TOKEN")
                .message("Registration successful!")
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Error: User not found with this email!"));

        if (!passwordEncoder.matches(loginRequest.getPassword(),user.getPassword())) {
            throw new RuntimeException("Error: Invalid password credentials!");
        }
        if (!user.getIsActive()) {
            throw new RuntimeException("Account disabled!");
        }


        return AuthResponse.builder()
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().name())
                .token("SESSION_ACTIVE_TOKEN")
                .message("Login successful!")
                .build();
    }
}