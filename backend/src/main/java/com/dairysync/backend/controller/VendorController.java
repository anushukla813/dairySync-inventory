package com.dairysync.backend.controller;
import com.dairysync.backend.dto.request.VendorRequest;
import com.dairysync.backend.dto.response.ApiResponse;
import com.dairysync.backend.dto.response.VendorResponse;
import com.dairysync.backend.service.VendorService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vendors")
public class VendorController {

    private final VendorService vendorService;

    public VendorController(VendorService vendorService) {
        this.vendorService = vendorService;
    }
    @PostMapping("/{userId}")
    public ApiResponse<VendorResponse> createVendor(
            @PathVariable Long userId,
            @Valid @RequestBody VendorRequest request) {

        VendorResponse response = vendorService.createVendor(userId, request);

        return ApiResponse.success("Vendor profile created successfully", response);
    }
    @GetMapping("/{userId}")
    public ApiResponse<VendorResponse> getVendorByUserId(
            @PathVariable Long userId) {

        VendorResponse response = vendorService.getVendorByUserId(userId);

        return ApiResponse.success("Vendor details fetched successfully", response);
    }
    @PutMapping("/{userId}")
    public ApiResponse<VendorResponse> updateVendor(
            @PathVariable Long userId,
            @Valid @RequestBody VendorRequest request) {

        VendorResponse response =
                vendorService.updateVendor(userId, request);

        return ApiResponse.success("Vendor profile updated successfully", response);
    }

}
