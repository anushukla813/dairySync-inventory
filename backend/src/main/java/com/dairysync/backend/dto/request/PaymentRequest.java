package com.dairysync.backend.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class PaymentRequest {
    @NotNull(message = "Vendor is required") //check code
    private Long vendorId;

    @NotNull(message = "Milk Supply is required")//check code
    private Long supplyId;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.1", message = "Amount must be greater than 0")
    private BigDecimal amount;

    @NotNull(message = "Payment Date is required")
    private LocalDate paymentDate;


    public PaymentRequest(){

    }

    public Long getVendorId() {
        return vendorId;
    }

    public void setVendorId(Long vendorId) {
        this.vendorId = vendorId;
    }

    public Long getSupplyId() {
        return supplyId;
    }

    public void setSupplyId(Long supplyId) {
        this.supplyId = supplyId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }
}
