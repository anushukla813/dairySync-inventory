package com.dairysync.backend.dto.response;


public class SellerDashboardResponse {


    private long totalInventory;


    private long totalMilkTypes;


    private long lowStockItems;



    public SellerDashboardResponse() {

    }



    public long getTotalInventory() {
        return totalInventory;
    }


    public void setTotalInventory(long totalInventory) {
        this.totalInventory = totalInventory;
    }



    public long getTotalMilkTypes() {
        return totalMilkTypes;
    }


    public void setTotalMilkTypes(long totalMilkTypes) {
        this.totalMilkTypes = totalMilkTypes;
    }



    public long getLowStockItems() {
        return lowStockItems;
    }


    public void setLowStockItems(long lowStockItems) {
        this.lowStockItems = lowStockItems;
    }

}