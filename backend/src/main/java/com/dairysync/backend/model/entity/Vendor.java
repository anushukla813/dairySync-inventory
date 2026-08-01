package com.dairysync.backend.model.entity;
import com.dairysync.backend.model.enums.VendorStatus;


import jakarta.persistence.*;

@Entity
@Table(name="vendor")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vendor_id")
    private Long vendorId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false, unique = true)
    private User user;

    @Column(length = 255)
    private String address;

    @Column(name = "bank_holder_name", length = 100)
    private String bankHolderName;

    @Column(name = "bank_account",length = 30)
    private String bankAccount;

    @Column(name = "ifsc_code", length = 11, nullable = false)
    private String ifscCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VendorStatus status =VendorStatus.ACTIVE;

    public Vendor(){

    }

    public void setVendorId(Long vendorId) {
        this.vendorId = vendorId;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public void setBankHolderName(String bankHolderName) {
        this.bankHolderName = bankHolderName;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public void setStatus(VendorStatus status) {
        this.status = status;
    }

    public Long getVendorId() {
        return vendorId;
    }

    public User getUser() {
        return user;
    }
    public String getBankHolderName() {
        return bankHolderName;
    }

    public String getAddress() {
        return address;
    }


    public String getBankAccount() {
        return bankAccount;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public VendorStatus getStatus() {
        return status;
    }


}
