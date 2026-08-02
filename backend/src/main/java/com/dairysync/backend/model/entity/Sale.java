package com.dairysync.backend.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

    @Entity
    @Table(name = "sale")
    public class Sale {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long saleId;

        @Column(nullable = false)
        private String customerName;

        @Column(nullable = false, length = 15)
        private String customerPhone;

        @ManyToOne
        @JoinColumn(name = "milk_type_id", nullable = false)
        private MilkType milkType;

        @ManyToOne
        @JoinColumn(name = "seller_id", nullable = false)
        private User seller;

        @Column(nullable = false)
        private BigDecimal quantity;

        @Column(nullable = false)
        private BigDecimal pricePerLiter;

        @Column(nullable = false)
        private BigDecimal totalAmount;

        @Column(nullable = false)
        private LocalDate saleDate;

        @Column(nullable = false, unique = true)
        private String receiptNumber;

        public Sale() {
        }

        public Long getSaleId() {
            return saleId;
        }

        public void setSaleId(Long saleId) {
            this.saleId = saleId;
        }

        public String getCustomerName() {
            return customerName;
        }

        public void setCustomerName(String customerName) {
            this.customerName = customerName;
        }

        public String getCustomerPhone() {
            return customerPhone;
        }

        public void setCustomerPhone(String customerPhone) {
            this.customerPhone = customerPhone;
        }

        public MilkType getMilkType() {
            return milkType;
        }

        public void setMilkType(MilkType milkType) {
            this.milkType = milkType;
        }

        public User getSeller() {
            return seller;
        }

        public void setSeller(User seller) {
            this.seller = seller;
        }

        public BigDecimal getQuantity() {
            return quantity;
        }

        public void setQuantity(BigDecimal quantity) {
            this.quantity = quantity;
        }

        public BigDecimal getPricePerLiter() {
            return pricePerLiter;
        }

        public void setPricePerLiter(BigDecimal pricePerLiter) {
            this.pricePerLiter = pricePerLiter;
        }

        public BigDecimal getTotalAmount() {
            return totalAmount;
        }

        public void setTotalAmount(BigDecimal totalAmount) {
            this.totalAmount = totalAmount;
        }

        public LocalDate getSaleDate() {
            return saleDate;
        }

        public void setSaleDate(LocalDate saleDate) {
            this.saleDate = saleDate;
        }

        public String getReceiptNumber() {
            return receiptNumber;
        }

        public void setReceiptNumber(String receiptNumber) {
            this.receiptNumber = receiptNumber;
        }
    }
