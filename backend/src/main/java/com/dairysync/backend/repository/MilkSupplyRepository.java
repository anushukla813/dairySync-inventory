package com.dairysync.backend.repository;

import com.dairysync.backend.model.entity.MilkSupply;
import com.dairysync.backend.model.enums.Shift;
import com.dairysync.backend.model.enums.VerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MilkSupplyRepository extends JpaRepository<MilkSupply, Long> {
    List<MilkSupply> findByVendorVendorId(Long vendorId);
    List<MilkSupply> findByVerificationStatus(VerificationStatus verificationStatus);
    List<MilkSupply> findBySupplyDate(LocalDate supplyDate);

    List<MilkSupply> findByShift(Shift shift);
    List<MilkSupply> findByVendorVendorIdOrderBySupplyDateDesc(Long vendorId);
}
