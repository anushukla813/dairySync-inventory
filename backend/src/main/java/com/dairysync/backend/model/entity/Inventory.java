package com.dairysync.backend.model.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Entity
@Table(name = "inventory")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_id")
    private Long inventoryId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "milk_type_id", nullable = false, unique = true)
    private MilkType milkType;

    @Column(name = "available_quantity", nullable = false, precision = 10, scale = 2)
    private BigDecimal availableQuantity;

    @Column(name = "unit", nullable = false, length = 20)
    private String unit;

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated;

    public Inventory() {

    }

    public Long getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(Long inventoryId) {
        this.inventoryId = inventoryId;
    }

    public MilkType getMilkType() {
        return milkType;
    }

    public void setMilkType(MilkType milkType) {
        this.milkType = milkType;
    }

    public BigDecimal getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(BigDecimal availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

}
