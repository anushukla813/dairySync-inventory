package com.dairysync.backend.dto.response;

public class AuthResponse {
    private Long userId;
    private String fullName;
    private String email;
    private String role;
    private String message;
    private String token;


    public AuthResponse(){}
    public Long getUserId(){
        return userId;
    }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getMessage() { return message; }
    public String getToken() { return token; }


    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setEmail(String email) { this.email = email; }
    public void setRole(String role) { this.role = role; }
    public void setMessage(String message) { this.message = message; }
    public void setToken(String token) { this.token = token; }



    public static Builder builder() {
        return new Builder();
    }

        public static class Builder {
            private Long userId;
            private String fullName;
            private String email;
            private String role;
            private String message;
            private String token;


            public Builder userId(Long userId){
                this.userId = userId;
                return this;
            }
            public Builder fullName(String fullName) {
                this.fullName = fullName;
                return this;
            }

            public Builder email(String email) {
                this.email = email;
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
                r.setUserId(this.userId);
                r.setFullName(this.fullName);
                r.setEmail(this.email);
                r.setRole(this.role);
                r.setMessage(this.message);
                r.setToken(this.token);
                return r;
            }
        }
}