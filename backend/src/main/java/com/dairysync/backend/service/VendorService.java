package com.dairysync.backend.service;

import com.dairysync.backend.dto.request.VendorRequest;
import com.dairysync.backend.dto.response.VendorResponse;

public interface VendorService {

    VendorResponse createVendor(Long userId, VendorRequest request);

    VendorResponse getVendorByUserId(Long userId);

    VendorResponse updateVendor(Long userId, VendorRequest request);

}
