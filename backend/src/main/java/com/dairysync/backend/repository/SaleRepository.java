package com.dairysync.backend.repository;
import com.dairysync.backend.model.entity.Sale;
import com.dairysync.backend.model.entity.MilkType;
import com.dairysync.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findBySaleDate(LocalDate saleDate);

    List<Sale> findByCustomerNameContainingIgnoreCase(String customerName);

    Optional<Sale> findByReceiptNumber(String receiptNumber);

    List<Sale> findByMilkType(MilkType milkType);

    List<Sale> findBySeller(User seller);
}


