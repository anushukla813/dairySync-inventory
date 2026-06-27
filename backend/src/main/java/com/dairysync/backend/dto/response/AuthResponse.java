package com.dairysync.backend.dto.response;

public class AuthResponse {
    private String email;
    private String fullName;
    private String role;
    private String message;
    private String token;

    public AuthResponse(){}
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public String getRole() { return role; }
    public String getMessage() { return message; }
    public String getToken() { return token; }

    public void setEmail(String email) { this.email = email; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setRole(String role) { this.role = role; }
    public void setMessage(String message) { this.message = message; }
    public void setToken(String token) { this.token = token; }

    public static Builder builder() {
        return new Builder();
    }

        public static class Builder {
            private String email;
            private String fullName;
            private String role;
            private String message;
            private String token;


            public Builder email(String email) {
                this.email = email;
                return this;
            }

            public Builder fullName(String fullName) {
                this.fullName = fullName;
                return this;
            }

            public Builder role(String role) {
                this.role = role;
                return this;
            }

            public Builder message(String message) {
                this.message = message;
                return this;
            }

            public Builder token(String token) {
                this.token = token;
                return this;
            }

            public AuthResponse build() {
                AuthResponse r = new AuthResponse();
                r.setEmail(this.email);
                r.setFullName(this.fullName);
                r.setRole(this.role);
                r.setMessage(this.message);
                r.setToken(this.token);
                return r;
            }
        }
}