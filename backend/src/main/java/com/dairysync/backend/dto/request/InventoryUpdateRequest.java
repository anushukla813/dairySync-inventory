package com.dairysync.backend.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class InventoryUpdateRequest {

    @NotNull(message = "Available quantity is required")
    @DecimalMin(value = "0.0", inclusive = true,
            message = "Quantity cannot be negative")
    private BigDecimal availableQuantity;

    public InventoryUpdateRequest() {

    }

    public BigDecimal getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(BigDecimal availableQuantity) {
        this.availableQuantity = availableQuantity;
    }
}
