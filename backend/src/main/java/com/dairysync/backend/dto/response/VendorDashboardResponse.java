package com.dairysync.backend.dto.response;

import java.math.BigDecimal;

public class VendorDashboardResponse {


    private BigDecimal totalEarnings;

    private BigDecimal totalMilkSupplied;

    private Long totalOrders;

    private Double growth;


    public VendorDashboardResponse(){}


    public BigDecimal getTotalEarnings() {
        return totalEarnings;
    }


    public void setTotalEarnings(BigDecimal totalEarnings) {
        this.totalEarnings = totalEarnings;
    }


    public BigDecimal getTotalMilkSupplied() {
        return totalMilkSupplied;
    }


    public void setTotalMilkSupplied(BigDecimal totalMilkSupplied) {
        this.totalMilkSupplied = totalMilkSupplied;
    }


    public Long getTotalOrders() {
        return totalOrders;
    }


    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }


    public Double getGrowth() {
        return growth;
    }


    public void setGrowth(Double growth) {
        this.growth = growth;
    }
}