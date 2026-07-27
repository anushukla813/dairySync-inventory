package com.dairysync.backend.dto.response;


import com.dairysync.backend.model.enums.Shift;
import com.dairysync.backend.model.enums.VerificationStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class MilkSupplyResponse {
    private Long supplyId;
    private String milkType;
    private BigDecimal quantity;
    private BigDecimal fatPercentage;
    private BigDecimal snfPercentage;
    private BigDecimal pricePerLiter;
    private LocalDate supplyDate;
    private LocalTime supplyTime;
    private Shift shift;

    private VerificationStatus verificationStatus;

    private BigDecimal totalAmount;

    public MilkSupplyResponse(){
    }

    public Long getSupplyId() {
        return supplyId;
    }

    public void setSupplyId(Long supplyId) {
        this.supplyId = supplyId;
    }

    public String getMilkType() {
        return milkType;
    }

    public void setMilkType(String milkType) {
        this.milkType = milkType;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public BigDecimal getFatPercentage() {
        return fatPercentage;
    }

    public void setFatPercentage(BigDecimal fatPercentage) {
        this.fatPercentage = fatPercentage;
    }

    public BigDecimal getSnfPercentage() {
        return snfPercentage;
    }

    public void setSnfPercentage(BigDecimal snfPercentage) {
        this.snfPercentage = snfPercentage;
    }


    public BigDecimal getPricePerLiter() {
        return pricePerLiter;
    }

    public void setPricePerLiter(BigDecimal pricePerLiter) {
        this.pricePerLiter = pricePerLiter;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }


    public LocalDate getSupplyDate() {
        return supplyDate;
    }

    public void setSupplyDate(LocalDate supplyDate) {
        this.supplyDate = supplyDate;
    }

    public LocalTime getSupplyTime() {
        return supplyTime;
    }

    public void setSupplyTime(LocalTime supplyTime) {
        this.supplyTime = supplyTime;
    }

    public Shift getShift() {
        return shift;
    }

    public void setShift(Shift shift) {
        this.shift = shift;
    }



    public VerificationStatus getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(VerificationStatus verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }
}
