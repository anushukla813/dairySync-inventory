package com.dairysync.backend.repository;

import com.dairysync.backend.model.entity.Payment;
import com.dairysync.backend.model.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long> {
    List<Payment> findByVendorId(Long vendorId);
    List<Payment> findByPaymentStatus(PaymentStatus paymentStatus);

    Optional<Payment> findByReceiptNumber(String receiptNumber);
}
