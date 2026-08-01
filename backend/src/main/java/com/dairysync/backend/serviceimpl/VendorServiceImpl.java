package com.dairysync.backend.serviceimpl;

import com.dairysync.backend.dto.request.VendorRequest;
import com.dairysync.backend.dto.response.VendorResponse;
import com.dairysync.backend.model.entity.Vendor;
import com.dairysync.backend.model.entity.User;
import com.dairysync.backend.model.enums.VendorStatus;
import com.dairysync.backend.repository.MilkSupplyRepository;
import com.dairysync.backend.repository.UserRepository;
import com.dairysync.backend.repository.VendorRepository;
import com.dairysync.backend.service.VendorService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class VendorServiceImpl implements VendorService {
    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;
    private final MilkSupplyRepository milkSupplyRepository;

    public VendorServiceImpl(VendorRepository vendorRepository, 
        UserRepository userRepository,
        MilkSupplyRepository milkSupplyRepository){
        
      this.vendorRepository = vendorRepository;
      this.userRepository = userRepository;
      this.milkSupplyRepository = milkSupplyRepository;
    
    }

    @Override
    public VendorResponse createVendor(Long userId, VendorRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));


        if (vendorRepository.existsByUserId(userId)) {
            throw new RuntimeException("Vendor profile already exists");
        }

        Vendor vendor = new Vendor();
        vendor.setUser(user);
        vendor.setAddress(request.getAddress());
        vendor.setBankHolderName(request.getBankHolderName());
        vendor.setBankAccount(request.getBankAccount());
        vendor.setIfscCode(request.getIfscCode());
        vendor.setStatus(VendorStatus.ACTIVE);

        Vendor savedVendor = vendorRepository.save(vendor);

        VendorResponse response = new VendorResponse();
        response.setVendorId(savedVendor.getVendorId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setPhoneNumber(user.getPhone());
        response.setAddress(savedVendor.getAddress());
        response.setBankHolderName(savedVendor.getBankHolderName());
        response.setVendorStatus(savedVendor.getStatus());

        return response;
    }

    @Override
    public VendorResponse getVendorByUserId(Long userId) {
        Vendor vendor = vendorRepository.findByUserId(userId)
                .orElseThrow(() ->new RuntimeException("Vendor not found"));

        User user = vendor.getUser();
        VendorResponse response = new VendorResponse();

        response.setVendorId(vendor.getVendorId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setPhoneNumber(user.getPhone());
        response.setAddress(vendor.getAddress());
        response.setBankHolderName(vendor.getBankHolderName());
        response.setVendorStatus(vendor.getStatus());

        return response;

    }

    @Override
    public VendorResponse updateVendor(Long userId, VendorRequest request){
        Vendor vendor = vendorRepository.findByUserId(userId)
                .orElseThrow(()->new RuntimeException("Vendor not found"));

        vendor.setAddress(request.getAddress());
        vendor.setBankHolderName(request.getBankHolderName());
        vendor.setBankAccount(request.getBankAccount());
        vendor.setIfscCode(request.getIfscCode());

        Vendor updatedVendor = vendorRepository.save(vendor);

        User user = updatedVendor.getUser();

        VendorResponse response = new VendorResponse();
        response.setVendorId(updatedVendor.getVendorId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setPhoneNumber(user.getPhone());
        response.setAddress(updatedVendor.getAddress());
        response.setBankHolderName(updatedVendor.getBankHolderName());
        response.setVendorStatus(updatedVendor.getStatus());

        return response;

    }

   @Override
    public Object getDashboard(String email) {

    System.out.println("==============================");
    System.out.println("EMAIL RECEIVED IN SERVICE = [" + email + "]");

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> {
                System.out.println("USER NOT FOUND FOR EMAIL = [" + email + "]");
                return new RuntimeException("User not found");
            });

    Vendor vendor = vendorRepository.findByUserId(user.getId())
            .orElseThrow(() -> new RuntimeException("Vendor not found by User ID"));

    BigDecimal totalMilkSupplied =
            milkSupplyRepository.getTotalMilkSupplied(vendor.getVendorId());

    BigDecimal totalEarnings =
            milkSupplyRepository.getTotalEarnings(vendor.getVendorId());

    Long totalOrders =
            milkSupplyRepository.countByVendorVendorId(vendor.getVendorId());

    Map<String, Object> dashboard = new HashMap<>();

    dashboard.put("vendorId", vendor.getVendorId());
    dashboard.put("vendorName", user.getFullName());
    dashboard.put("email", user.getEmail());
    dashboard.put("phone", user.getPhone());
    dashboard.put("address", vendor.getAddress());
    dashboard.put("status", vendor.getStatus());

    dashboard.put("totalMilkSupplied", totalMilkSupplied);
    dashboard.put("totalEarnings", totalEarnings);
    dashboard.put("totalOrders", totalOrders);

    // We'll calculate real growth later
    dashboard.put("growth", 0);

    return dashboard;
}
}
