package com.dairysync.backend.model.entity;
import com.dairysync.backend.model.enums.Role;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;

    private String location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private Boolean isActive = true;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public User(){}

    public  Long getId(){
        return id;
    }
    public String getFullName(){
        return fullName;
    }
    public String getEmail(){
        return  email;
    }
    public String getPassword(){
        return password;
    }
    public String getPhone(){
        return  phone;
    }
    public String getLocation(){
        return location;
    }
    public Role getRole(){
        return role;
    }
    public Boolean getIsActive(){
        return isActive;
    }
    public LocalDateTime getCreatedAt(){
        return createdAt;
    }
    public LocalDateTime getUpdatedAt(){
        return  updatedAt;
    }


    public  void setId(Long id){
        this.id = id;
    }
    public  void setFullName(String fullName){
        this.fullName = fullName;
    }
    public  void setEmail(String email){
        this.email = email;
    }
    public  void setPassword(String password){
        this.password = password;
    }
    public  void setPhone(String phone){
        this.phone = phone;
    }
    public  void setLocation(String location){
        this.location = location;
    }
    public  void setRole(Role role){
        this.role = role;
    }
    public  void setIsActive(Boolean isActive){
        this.isActive = isActive;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}



