package com.dairysync.backend.service;

import com.dairysync.backend.dto.request.MilkSupplyRequest;
import com.dairysync.backend.dto.response.MilkSupplyResponse;

import java.time.LocalDate;
import java.util.List;

public interface MilkSupplyService {

    MilkSupplyResponse createMilkSupply(Long vendorId, MilkSupplyRequest request);

    List<MilkSupplyResponse> getVendorMilkSupply(Long vendorId);

    List<MilkSupplyResponse> getTodayMilkSupply(LocalDate date);

    MilkSupplyResponse verifyMilkSupply(Long supplyId);

    List<MilkSupplyResponse> getMilkHistory(String email);

}
