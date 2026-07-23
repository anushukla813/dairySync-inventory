package com.dairysync.backend.dto.response;

public class MilkTypeResponse {
    private Long milkTypeId;
    private String milkName;

    public MilkTypeResponse(){

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
}
