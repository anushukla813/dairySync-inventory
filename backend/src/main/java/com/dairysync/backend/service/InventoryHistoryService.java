package com.dairysync.backend.service;

import com.dairysync.backend.dto.response.InventoryHistoryResponse;

import java.math.BigDecimal;
import java.util.List;

public interface InventoryHistoryService {

    void saveHistory(
            Long inventoryId,
            String action,
            BigDecimal quantity,
            String updatedBy
    );

    List<InventoryHistoryResponse> getAllHistory();

}