package com.dairysync.backend.controller;

import com.dairysync.backend.dto.response.ApiResponse;
import com.dairysync.backend.dto.response.MilkTypeResponse;
import com.dairysync.backend.service.MilkTypeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/milk-types")
public class MilkTypeController {
    private final MilkTypeService milkTypeService;

    public MilkTypeController(MilkTypeService milkTypeService) {
        this.milkTypeService = milkTypeService;
    }
    @GetMapping
    public ApiResponse<List<MilkTypeResponse>> getAllMilkTypes() {

        List<MilkTypeResponse> response =
                milkTypeService.getAllMilkTypes();

        return ApiResponse.success(
                "Milk types fetched successfully",
                response
        );
    }
    @GetMapping("/{milkTypeId}")
    public ApiResponse<MilkTypeResponse> getMilkTypeById(
            @PathVariable Long milkTypeId) {

        MilkTypeResponse response =
                milkTypeService.getMilkTypeById(milkTypeId);

        return ApiResponse.success(
                "Milk type fetched successfully",
                response
        );
    }
}
