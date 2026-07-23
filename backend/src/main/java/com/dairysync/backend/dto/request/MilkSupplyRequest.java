package com.dairysync.backend.dto.request;

import com.dairysync.backend.model.enums.Shift;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class MilkSupplyRequest {

    @NotNull(message = "Milk Type is required")
    private Long milkTypeId;

    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.1" , message = "Quantity must be greater than 0")
    private BigDecimal quantity;

    @NotNull(message = "Fat Percentage is required")
    @DecimalMin(value = "0.1", message = "Fat Percentage must be greater than 0")
    private BigDecimal fatPercentage;

    @NotNull(message = "SNF Percentage is required")
    @DecimalMin(value = "0.1", message = "SNF Percentage must be greater than 0")
    private BigDecimal snfPercentage;

    @NotNull(message = "Supply Date is required")
    private LocalDate supplyDate;

    @NotNull(message = "Supply Time is required")
    private LocalTime supplyTime;

    @NotNull(message = "Shift is required")
    private Shift shift;



    public MilkSupplyRequest(){

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

    public void setShift(Shift shift) {
        this.shift = shift;
    }


}
