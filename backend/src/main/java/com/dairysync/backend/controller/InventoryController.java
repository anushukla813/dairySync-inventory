package com.dairysync.backend.controller;

import com.dairysync.backend.dto.request.InventoryUpdateRequest;
import com.dairysync.backend.dto.response.ApiResponse;
import com.dairysync.backend.dto.response.InventoryResponse;
import com.dairysync.backend.service.InventoryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @RequestMapping("/inventory")
    public class InventoryController {

        private final InventoryService inventoryService;

        public InventoryController(InventoryService inventoryService) {
            this.inventoryService = inventoryService;
        }

        @GetMapping
        public ApiResponse<List<InventoryResponse>> getAllInventory() {

            List<InventoryResponse> response =
                    inventoryService.getAllInventory();

            return ApiResponse.success(
                    "Inventory fetched successfully",
                    response
            );
        }

        @GetMapping("/{inventoryId}")
        public ApiResponse<InventoryResponse> getInventoryById(
                @PathVariable Long inventoryId) {

            InventoryResponse response =
                    inventoryService.getInventoryById(inventoryId);

            return ApiResponse.success(
                    "Inventory fetched successfully",
                    response
            );
        }

        @PutMapping("/{inventoryId}")
        public ApiResponse<InventoryResponse> updateInventory(
                @PathVariable Long inventoryId,
                @Valid @RequestBody InventoryUpdateRequest request) {

            InventoryResponse response =
                    inventoryService.updateInventory(inventoryId, request);

            return ApiResponse.success(
                    "Inventory updated successfully",
                    response
            );
        }
    }
