package com.dairysync.backend.service;

import com.dairysync.backend.dto.request.PaymentRequest;
import com.dairysync.backend.dto.response.PaymentResponse;

import java.util.List;

public interface PaymentService {

    PaymentResponse createPayment(PaymentRequest request);

    List<PaymentResponse> getPaymentByVendor(Long vendorId);
    PaymentResponse getPaymentById(Long paymentId);
}
