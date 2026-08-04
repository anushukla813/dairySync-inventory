package com.dairysync.backend.serviceimpl;

import com.dairysync.backend.dto.request.InventoryReduceRequest;
import com.dairysync.backend.dto.request.InventoryUpdateRequest;
import com.dairysync.backend.dto.response.InventoryResponse;
import com.dairysync.backend.model.entity.Inventory;
import com.dairysync.backend.repository.InventoryRepository;
import com.dairysync.backend.service.InventoryHistoryService;
import com.dairysync.backend.service.InventoryService;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class InventoryServiceImpl implements InventoryService {


    private final InventoryRepository inventoryRepository;

    private final InventoryHistoryService inventoryHistoryService;



    public InventoryServiceImpl(
            InventoryRepository inventoryRepository,
            InventoryHistoryService inventoryHistoryService
    ) {

        this.inventoryRepository = inventoryRepository;
        this.inventoryHistoryService = inventoryHistoryService;

    }

    @Override
    public List<InventoryResponse> getAllInventory() {


        List<Inventory> inventories =
                inventoryRepository.findAll();


        List<InventoryResponse> responseList =
                new ArrayList<>();


        for(Inventory inventory : inventories){


            responseList.add(
                    mapToResponse(inventory)
            );

        }


        return responseList;

    }

    @Override
    public InventoryResponse getInventoryById(Long inventoryId) {


        Inventory inventory =
                inventoryRepository.findById(inventoryId)

                .orElseThrow(() ->
                        new RuntimeException(
                                "Inventory not found"
                        ));


        return mapToResponse(inventory);

    }

    @Override
    public InventoryResponse updateInventory(
            Long inventoryId,
            InventoryUpdateRequest request
    ) {


        Inventory inventory =
                inventoryRepository.findById(inventoryId)

                .orElseThrow(() ->
                        new RuntimeException(
                                "Inventory not found"
                        ));

        inventory.setAvailableQuantity(
                request.getAvailableQuantity()
        );


        inventory.setLastUpdated(
                LocalDateTime.now()
        );

        Inventory updatedInventory =
                inventoryRepository.save(inventory);

        inventoryHistoryService.saveHistory(

                updatedInventory.getInventoryId(),

                "ADDED",

                request.getAvailableQuantity(),

                "Seller"

        );

        return mapToResponse(updatedInventory);

    }

    @Override
    public InventoryResponse reduceInventory(
            Long inventoryId,
            InventoryReduceRequest request
    ) {

        Inventory inventory =
                inventoryRepository.findById(inventoryId)

                .orElseThrow(() ->
                        new RuntimeException(
                                "Inventory not found"
                        ));

        BigDecimal currentQuantity =
                inventory.getAvailableQuantity();

        if(currentQuantity.compareTo(
                request.getQuantity()) < 0
        ){

            throw new RuntimeException(
                    "Insufficient stock"
            );

        }

        BigDecimal updatedQuantity =
                currentQuantity.subtract(
                        request.getQuantity()
                );

        inventory.setAvailableQuantity(
                updatedQuantity
        );

        inventory.setLastUpdated(
                LocalDateTime.now()
        );

        Inventory updatedInventory =
                inventoryRepository.save(inventory);

        inventoryHistoryService.saveHistory(

                updatedInventory.getInventoryId(),

                "REDUCED",

                request.getQuantity(),

                "Seller"

        );

        return mapToResponse(updatedInventory);

    }

    private InventoryResponse mapToResponse(
            Inventory inventory
    ){

       InventoryResponse response =
                new InventoryResponse();

        response.setInventoryId(
                inventory.getInventoryId()
        );

        response.setMilkTypeId(
                inventory.getMilkType()
                        .getMilkTypeId()
        );

        response.setMilkType(
                inventory.getMilkType()
                        .getMilkName()
        );

        response.setAvailableQuantity(
                inventory.getAvailableQuantity()
        );

        response.setUnit(
                inventory.getUnit()
        );

        response.setLastUpdated(
                inventory.getLastUpdated()
        );

        response.setPricePerLiter(
                inventory.getMilkType()
                        .getPricePerLiter()
        );

        return response;

    }



}