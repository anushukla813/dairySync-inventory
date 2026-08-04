package com.dairysync.backend.serviceimpl;

import com.dairysync.backend.dto.response.InventoryHistoryResponse;
import com.dairysync.backend.model.entity.Inventory;
import com.dairysync.backend.model.entity.InventoryHistory;
import com.dairysync.backend.repository.InventoryHistoryRepository;
import com.dairysync.backend.repository.InventoryRepository;
import com.dairysync.backend.service.InventoryHistoryService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class InventoryHistoryServiceImpl implements InventoryHistoryService {

    private final InventoryRepository inventoryRepository;
    private final InventoryHistoryRepository historyRepository;

    public InventoryHistoryServiceImpl(
            InventoryRepository inventoryRepository,
            InventoryHistoryRepository historyRepository
    ) {
        this.inventoryRepository = inventoryRepository;
        this.historyRepository = historyRepository;
    }

    @Override
    public void saveHistory(
            Long inventoryId,
            String action,
            BigDecimal quantity,
            String updatedBy
    ) {

        Inventory inventory = inventoryRepository
                .findById(inventoryId)
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found"));

        InventoryHistory history = new InventoryHistory();

        history.setInventory(inventory);
        history.setAction(action);
        history.setQuantity(quantity);
        history.setUpdatedBy(updatedBy);

        historyRepository.save(history);

    }

    @Override
    public List<InventoryHistoryResponse> getAllHistory() {

        return historyRepository
                .findAllByOrderByActionDateDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    private InventoryHistoryResponse mapToResponse(
            InventoryHistory history
    ) {

        InventoryHistoryResponse response =
                new InventoryHistoryResponse();

        response.setHistoryId(history.getHistoryId());

        response.setMilkType(
                history.getInventory()
                        .getMilkType()
                        .getMilkName()
        );

        response.setAction(history.getAction());

        response.setQuantity(history.getQuantity());

        response.setActionDate(history.getActionDate());

        response.setUpdatedBy(history.getUpdatedBy());

        return response;
    }

}