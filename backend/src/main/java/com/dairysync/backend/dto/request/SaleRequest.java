package com.dairysync.backend.dto.request;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public class SaleRequest {


    @NotBlank(message = "Customer name is required")
    @Size(min = 3, max = 100, message = "Customer name must be between 3 and 100 characters")
    private String customerName;

    @NotBlank(message = "Customer phone is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must contain exactly 10 digits")
    private String customerPhone;

    @NotNull(message = "Milk type is required")
    private Long milkTypeId;

    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.01", inclusive = true, message = "Quantity must be greater than 0")
    private BigDecimal quantity;

    @NotNull(message = "Sale date is required")
    private LocalDate saleDate;

    public SaleRequest() {
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public Long getMilkTypeId() {
        return milkTypeId;
    }

    public void setMilkTypeId(Long milkTypeId) {
        this.milkTypeId = milkTypeId;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public LocalDate getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(LocalDate saleDate) {
        this.saleDate = saleDate;
    }
}
