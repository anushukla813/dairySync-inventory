package com.dairysync.backend.repository;

import com.dairysync.backend.model.entity.MilkType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MilkTypeRepository extends JpaRepository<MilkType, Long> {
    Optional<MilkType> findByMilkName(String milkName);

}
