package com.dairysync.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class VendorRequest {

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Bank Holder Name is required")
    private String bankHolderName;


    @NotBlank(message = "Bank Account Number is required")
    private String bankAccount;

    @NotBlank(message = "IFSC Code is required")
    @Size(min = 11, max = 11, message = "IFSC Code must be 11 Characters")
    private String ifscCode;

    public VendorRequest(){

    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBankHolderName() {
        return bankHolderName;
    }

    public void setBankHolderName(String bankHolderName) {
        this.bankHolderName = bankHolderName;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }
}
