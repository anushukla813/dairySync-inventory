package com.dairysync.backend.dto.response;

import com.dairysync.backend.model.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PaymentResponse {
    private Long paymentId;
    private String receiptNumber;
    private BigDecimal amount;
    private LocalDate paymentDate;
    private PaymentStatus paymentStatus;

    public PaymentResponse(){

    }

    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
