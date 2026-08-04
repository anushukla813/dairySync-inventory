package com.dairysync.backend.service;

import com.dairysync.backend.dto.request.InventoryReduceRequest;
import com.dairysync.backend.dto.request.InventoryUpdateRequest;
import com.dairysync.backend.dto.response.InventoryResponse;
import com.dairysync.backend.model.entity.Inventory;
import com.dairysync.backend.dto.request.InventoryReduceRequest;

import java.util.List;

public interface InventoryService {

    List<InventoryResponse> getAllInventory();

    InventoryResponse getInventoryById(Long inventoryId);

    InventoryResponse updateInventory(Long inventoryId, 
        InventoryUpdateRequest request);

    InventoryResponse reduceInventory(
        Long inventoryId,
        InventoryReduceRequest request
    );
}
