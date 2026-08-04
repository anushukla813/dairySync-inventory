package com.dairysync.backend.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class InventoryReduceRequest {

    @NotNull(message = "Quantity is required")
    @DecimalMin(
            value = "0.01",
            message = "Quantity must be greater than zero"
    )
    private BigDecimal quantity;


    public InventoryReduceRequest() {

    }


    public BigDecimal getQuantity() {

        return quantity;

    }


    public void setQuantity(BigDecimal quantity) {

        this.quantity = quantity;

    }

}