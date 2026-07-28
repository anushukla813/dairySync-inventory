package com.dairysync.backend.serviceimpl;

import com.dairysync.backend.dto.request.PaymentRequest;
import com.dairysync.backend.dto.response.PaymentResponse;
import com.dairysync.backend.model.entity.MilkSupply;
import com.dairysync.backend.model.entity.Payment;
import com.dairysync.backend.model.entity.Vendor;
import com.dairysync.backend.model.enums.PaymentStatus;
import com.dairysync.backend.repository.MilkSupplyRepository;
import com.dairysync.backend.repository.PaymentRepository;
import com.dairysync.backend.repository.VendorRepository;
import com.dairysync.backend.service.PaymentService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final VendorRepository vendorRepository;
    private final MilkSupplyRepository milkSupplyRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository,
                              VendorRepository vendorRepository,
                              MilkSupplyRepository milkSupplyRepository) {

        this.paymentRepository = paymentRepository;
        this.vendorRepository = vendorRepository;
        this.milkSupplyRepository = milkSupplyRepository;
    }

    @Override
    public PaymentResponse createPayment(PaymentRequest request) {

        Vendor vendor = vendorRepository.findById(request.getVendorId())
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        MilkSupply milkSupply = milkSupplyRepository.findById(request.getSupplyId())
                .orElseThrow(() -> new RuntimeException("Milk Supply not found"));

        Payment payment = new Payment();

        payment.setVendor(vendor);
        payment.setMilkSupply(milkSupply);
        payment.setAmount(request.getAmount());
        payment.setPaymentDate(request.getPaymentDate());
        payment.setPaymentStatus(PaymentStatus.Paid);

        payment.setReceiptNumber("REC-" + System.currentTimeMillis());

        Payment savedPayment = paymentRepository.save(payment);

        PaymentResponse response = new PaymentResponse();
        response.setPaymentId(savedPayment.getPaymentId());
        response.setReceiptNumber(savedPayment.getReceiptNumber());
        response.setAmount(savedPayment.getAmount());
        response.setPaymentDate(savedPayment.getPaymentDate());
        response.setPaymentStatus(savedPayment.getPaymentStatus());

        return response;
    }

    @Override
    public List<PaymentResponse> getPaymentByVendor(Long vendorId) {

        List<Payment> payments =
                paymentRepository.findByVendorVendorId(vendorId);

        List<PaymentResponse> responseList = new ArrayList<>();

        for (Payment payment : payments) {

            PaymentResponse response = new PaymentResponse();

            response.setPaymentId(payment.getPaymentId());
            response.setReceiptNumber(payment.getReceiptNumber());
            response.setAmount(payment.getAmount());
            response.setPaymentDate(payment.getPaymentDate());
            response.setPaymentStatus(payment.getPaymentStatus());

            responseList.add(response);
        }

        return responseList;
    }

    @Override
    public PaymentResponse getPaymentById(Long paymentId) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        PaymentResponse response = new PaymentResponse();

        response.setPaymentId(payment.getPaymentId());
        response.setReceiptNumber(payment.getReceiptNumber());
        response.setAmount(payment.getAmount());
        response.setPaymentDate(payment.getPaymentDate());
        response.setPaymentStatus(payment.getPaymentStatus());

        return response;
    }
}
