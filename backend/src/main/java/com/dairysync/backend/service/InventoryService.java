package com.dairysync.backend.service;

import com.dairysync.backend.dto.request.InventoryUpdateRequest;
import com.dairysync.backend.dto.response.InventoryResponse;

import java.util.List;

public interface InventoryService {

    List<InventoryResponse> getAllInventory();

    InventoryResponse getInventoryById(Long inventoryId);

    InventoryResponse updateInventory(Long inventoryId,
                                      InventoryUpdateRequest request);
}
