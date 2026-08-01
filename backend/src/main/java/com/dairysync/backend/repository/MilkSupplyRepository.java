package com.dairysync.backend.repository;

import com.dairysync.backend.model.entity.MilkSupply;
import com.dairysync.backend.model.enums.Shift;
import com.dairysync.backend.model.enums.VerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface MilkSupplyRepository extends JpaRepository<MilkSupply, Long> {

    /* Existing Methods */

    List<MilkSupply> findByVendorVendorId(Long vendorId);

    List<MilkSupply> findByVerificationStatus(
            VerificationStatus verificationStatus
    );

    List<MilkSupply> findBySupplyDate(LocalDate supplyDate);

    List<MilkSupply> findByShift(Shift shift);

    List<MilkSupply> findByVendorVendorIdOrderBySupplyDateDesc(
            Long vendorId
    );


    /* ================================
       DASHBOARD QUERIES
    ================================= */

    @Query("""
            SELECT COALESCE(SUM(m.quantity), 0)
            FROM MilkSupply m
            WHERE m.vendor.vendorId = :vendorId
            """)
    BigDecimal getTotalMilkSupplied(
            @Param("vendorId") Long vendorId
    );


    @Query("""
            SELECT COALESCE(SUM(m.totalAmount), 0)
            FROM MilkSupply m
            WHERE m.vendor.vendorId = :vendorId
            """)
    BigDecimal getTotalEarnings(
            @Param("vendorId") Long vendorId
    );


    Long countByVendorVendorId(Long vendorId);

}