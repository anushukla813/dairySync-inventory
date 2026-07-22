package com.dairysync.backend.model.entity;

import com.dairysync.backend.model.enums.PaymentStatus;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;


@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @Column(name = "payment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long paymentId;

    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "vendor_id" , nullable = false)
    private Vendor vendor;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supply_id", nullable = false, unique = true)
    private MilkSupply milkSupply;

    @Column(nullable = false)
    private BigDecimal amount;


    @Column(name = "payment_date", nullable = false)
    private LocalDate paymentDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus;

    @Column(name = "receipt_number", unique = true)
    private String receiptNumber;


    public Payment(){

    }

    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public MilkSupply getMilkSupply() {
        return milkSupply;
    }

    public void setMilkSupply(MilkSupply milkSupply) {
        this.milkSupply = milkSupply;
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

    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }
}
