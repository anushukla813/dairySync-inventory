package com.dairysync.backend.controller;

import com.dairysync.backend.dto.response.ApiResponse;
import com.dairysync.backend.dto.response.InventoryHistoryResponse;
import com.dairysync.backend.service.InventoryHistoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory-history")
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryHistoryController {

    private final InventoryHistoryService inventoryHistoryService;

    public InventoryHistoryController(
            InventoryHistoryService inventoryHistoryService
    ) {
        this.inventoryHistoryService = inventoryHistoryService;
    }

    @GetMapping
    public ApiResponse<List<InventoryHistoryResponse>> getHistory() {

        return ApiResponse.success(

                "Inventory History",

                inventoryHistoryService.getAllHistory()

        );

    }

}