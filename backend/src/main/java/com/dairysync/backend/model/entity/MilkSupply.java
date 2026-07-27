package com.dairysync.backend.model.entity;

import com.dairysync.backend.model.enums.Shift;
import com.dairysync.backend.model.enums.VerificationStatus;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "milk_supply")
public class MilkSupply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supply_id")
    private  Long supplyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="vendor_id" , nullable = false)
    private Vendor vendor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="milk_type_id", nullable = false)
    private MilkType milkType;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantity;

    @Column(name = "fat_percentage", precision = 5, scale = 2)
    private BigDecimal fatPercentage;

    @Column(name = "snf_percentage", precision = 5, scale = 2)
    private BigDecimal snfPercentage;

    @Column(name = "price_per_liter", precision = 10, scale = 2)
    private BigDecimal pricePerLiter;


    @Column(name = "supply_date", nullable = false)
    private LocalDate supplyDate;

    @Column(name = "supply_time", nullable = false)
    private LocalTime supplyTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Shift shift;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false)
    private VerificationStatus verificationStatus = VerificationStatus.Pending;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    public  MilkSupply(){

    }

    public Long getSupplyId() {
        return supplyId;
    }

    public void setSupplyId(Long supplyId) {
        this.supplyId = supplyId;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public MilkType getMilkType() {
        return milkType;
    }

    public void setMilkType(MilkType milkType) {
        this.milkType = milkType;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
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
    public void calculateTotalAmount() {

        if (quantity != null && pricePerLiter != null) {
            this.totalAmount = quantity.multiply(pricePerLiter);
        }
    }
}
