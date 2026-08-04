package com.dairysync.backend.controller;
import com.dairysync.backend.dto.request.MilkSupplyRequest;
import com.dairysync.backend.dto.response.ApiResponse;
import com.dairysync.backend.dto.response.MilkSupplyResponse;
import com.dairysync.backend.service.MilkSupplyService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
@RestController
@RequestMapping("/milk-supplies")
public class MilkSupplyController {
    private final MilkSupplyService milkSupplyService;

    public MilkSupplyController(MilkSupplyService milkSupplyService) {
        this.milkSupplyService = milkSupplyService;
    }
    @PostMapping("/{vendorId}")
    public ApiResponse<MilkSupplyResponse> createMilkSupply(
            @PathVariable Long vendorId,
            @Valid
            @RequestBody MilkSupplyRequest request) {


        MilkSupplyResponse response =
                milkSupplyService.createMilkSupply(vendorId, request);

        return ApiResponse.success(
                "Milk supply added successfully",
                response
        );
    }
    @GetMapping("/vendors/{vendorId}")
    public ApiResponse<List<MilkSupplyResponse>> getVendorMilkSupply(
            @PathVariable Long vendorId) {


        List<MilkSupplyResponse> response =
                milkSupplyService.getVendorMilkSupply(vendorId);

        return ApiResponse.success(
                "Vendor milk supply fetched successfully",
                response
        );
    }
    @GetMapping("/today")
    public ApiResponse<List<MilkSupplyResponse>> getTodayMilkSupply(
            @RequestParam LocalDate date) {

        List<MilkSupplyResponse> response =
                milkSupplyService.getTodayMilkSupply(date);

        return ApiResponse.success(
                "Today's milk supply fetched successfully",
                response
        );
    }
    @PutMapping("/{supplyId}/verify")
    public ApiResponse<MilkSupplyResponse> verifyMilkSupply(
            @PathVariable Long supplyId) {

        MilkSupplyResponse response =
                milkSupplyService.verifyMilkSupply(supplyId);

        return ApiResponse.success(
                "Milk supply verified successfully",
                response
        );
    }

    @GetMapping
    public ApiResponse<List<MilkSupplyResponse>> getAllMilkSupplies() {

        List<MilkSupplyResponse> response =
               milkSupplyService.getAllMilkSupplies();

        return ApiResponse.success(
            "All milk supplies fetched successfully",
            response
        );
     }
}

