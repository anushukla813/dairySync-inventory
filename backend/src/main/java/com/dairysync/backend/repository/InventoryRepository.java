package com.dairysync.backend.repository;

import com.dairysync.backend.model.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
    @Repository
    public interface InventoryRepository extends JpaRepository<Inventory, Long> {

        Optional<Inventory> findByMilkTypeMilkTypeId(Long milkTypeId);

    }


