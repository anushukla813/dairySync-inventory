package com.dairysync.backend.serviceimpl;

import com.dairysync.backend.dto.request.InventoryUpdateRequest;
import com.dairysync.backend.dto.response.InventoryResponse;
import com.dairysync.backend.model.entity.Inventory;
import com.dairysync.backend.repository.InventoryRepository;
import com.dairysync.backend.service.InventoryService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
    public class InventoryServiceImpl implements InventoryService {

        private final InventoryRepository inventoryRepository;

        public InventoryServiceImpl(InventoryRepository inventoryRepository) {
            this.inventoryRepository = inventoryRepository;
        }

        @Override
        public List<InventoryResponse> getAllInventory() {

            List<Inventory> inventories = inventoryRepository.findAll();

            List<InventoryResponse> responseList = new ArrayList<>();

            for (Inventory inventory : inventories) {

                InventoryResponse response = new InventoryResponse();

                response.setInventoryId(inventory.getInventoryId());
                response.setMilkTypeId(inventory.getMilkType().getMilkTypeId());
                response.setMilkType(inventory.getMilkType().getMilkName());
                response.setAvailableQuantity(inventory.getAvailableQuantity());
                response.setUnit(inventory.getUnit());
                response.setLastUpdated(inventory.getLastUpdated());

                responseList.add(response);
            }

            return responseList;
        }

        @Override
        public InventoryResponse getInventoryById(Long inventoryId) {

            Inventory inventory = inventoryRepository.findById(inventoryId)
                    .orElseThrow(() -> new RuntimeException("Inventory not found"));

            InventoryResponse response = new InventoryResponse();

            response.setInventoryId(inventory.getInventoryId());
            response.setMilkTypeId(inventory.getMilkType().getMilkTypeId());
            response.setMilkType(inventory.getMilkType().getMilkName());
            response.setAvailableQuantity(inventory.getAvailableQuantity());
            response.setUnit(inventory.getUnit());
            response.setLastUpdated(inventory.getLastUpdated());

            return response;
        }

        @Override
        public InventoryResponse updateInventory(Long inventoryId,
                                                 InventoryUpdateRequest request) {

            Inventory inventory = inventoryRepository.findById(inventoryId)
                    .orElseThrow(() -> new RuntimeException("Inventory not found"));

            inventory.setAvailableQuantity(request.getAvailableQuantity());
            inventory.setLastUpdated(LocalDateTime.now());

            Inventory updatedInventory = inventoryRepository.save(inventory);

            InventoryResponse response = new InventoryResponse();

            response.setInventoryId(updatedInventory.getInventoryId());
            response.setMilkTypeId(updatedInventory.getMilkType().getMilkTypeId());
            response.setMilkType(updatedInventory.getMilkType().getMilkName());
            response.setAvailableQuantity(updatedInventory.getAvailableQuantity());
            response.setUnit(updatedInventory.getUnit());
            response.setLastUpdated(updatedInventory.getLastUpdated());

            return response;
        }
    }

