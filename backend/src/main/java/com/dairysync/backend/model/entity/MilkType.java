package com.dairysync.backend.model.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name="milk_type")
public class MilkType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="milk_type_id")
    private Long milkTypeId;

    @Column(name="milk_name", nullable = false, length = 50)
    private String milkName;


    @Column(name = "base_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal basePrice;


    @OneToMany(mappedBy = "milkType", fetch = FetchType.LAZY)
    private List<MilkSupply>milkSupplies;

    public MilkType(){

    }

    public Long getMilkTypeId() {
        return milkTypeId;
    }

    public void setMilkTypeId(Long milkTypeId) {
        this.milkTypeId = milkTypeId;
    }

    public String getMilkName() {
        return milkName;
    }

    public void setMilkName(String milkName) {
        this.milkName = milkName;
    }

    public BigDecimal getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(BigDecimal basePrice) {
        this.basePrice = basePrice;
    }

    public List<MilkSupply> getMilkSupplies() {
        return milkSupplies;
    }

    public void setMilkSupplies(List<MilkSupply> milkSupplies) {
        this.milkSupplies = milkSupplies;
    }
}
