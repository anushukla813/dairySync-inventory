package com.dairysync.backend.controller;
import com.dairysync.backend.dto.request.PaymentRequest;
import com.dairysync.backend.dto.response.ApiResponse;
import com.dairysync.backend.dto.response.PaymentResponse;
import com.dairysync.backend.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    @PostMapping
    public ApiResponse<PaymentResponse> createPayment(
            @Valid
            @RequestBody PaymentRequest request) {

        PaymentResponse response =
                paymentService.createPayment(request);

        return ApiResponse.success(
                "Payment created successfully",
                response
        );
    }

    @GetMapping("/vendor")
     public ApiResponse<List<PaymentResponse>> getLoggedInVendorPayments(
        Authentication authentication) {

        List<PaymentResponse> response =
            paymentService.getLoggedInVendorPayments(
                    authentication.getName()
            );

        return ApiResponse.success(
            "Vendor payments fetched successfully",
            response
        );

    } 


    @GetMapping("/vendors/{vendorId}")
    public ApiResponse<List<PaymentResponse>> getPaymentByVendor(
            @PathVariable Long vendorId) {

        List<PaymentResponse> response =
                paymentService.getPaymentByVendor(vendorId);

        return ApiResponse.success(
                "Vendor payments fetched successfully",
                response
        );
    }
    @GetMapping("/{paymentId}")
    public ApiResponse<PaymentResponse> getPaymentById(
            @PathVariable Long paymentId) {

        PaymentResponse response =
                paymentService.getPaymentById(paymentId);

        return ApiResponse.success(
                "Payment fetched successfully",
                response
        );
    }
}

