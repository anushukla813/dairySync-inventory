package com.dairysync.backend.serviceimpl;


import com.dairysync.backend.dto.response.SellerDashboardResponse;
import com.dairysync.backend.model.entity.Inventory;
import com.dairysync.backend.repository.InventoryRepository;
import com.dairysync.backend.repository.MilkTypeRepository;
import com.dairysync.backend.service.SellerDashboardService;

import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.util.List;



@Service
public class SellerDashboardServiceImpl 
        implements SellerDashboardService {



    private final InventoryRepository inventoryRepository;

    private final MilkTypeRepository milkTypeRepository;



    public SellerDashboardServiceImpl(
            InventoryRepository inventoryRepository,
            MilkTypeRepository milkTypeRepository
    ){

        this.inventoryRepository = inventoryRepository;

        this.milkTypeRepository = milkTypeRepository;

    }





    @Override
    public SellerDashboardResponse getDashboard(){


        SellerDashboardResponse response =
                new SellerDashboardResponse();



        List<Inventory> inventories =
                inventoryRepository.findAll();



        long lowStockCount =
                inventories.stream()
                        .filter(
                                inventory ->
                                inventory.getAvailableQuantity()
                                .compareTo(
                                    BigDecimal.valueOf(50)
                                ) < 0
                        )
                        .count();



        response.setTotalInventory(
                inventoryRepository.count()
        );



        response.setTotalMilkTypes(
                milkTypeRepository.count()
        );



        response.setLowStockItems(
                lowStockCount
        );



        return response;

    }


}