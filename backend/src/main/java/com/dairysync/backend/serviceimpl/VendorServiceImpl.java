package com.dairysync.backend.serviceimpl;

import com.dairysync.backend.dto.request.VendorRequest;
import com.dairysync.backend.dto.response.VendorResponse;
import com.dairysync.backend.model.entity.Vendor;
import com.dairysync.backend.model.entity.User;
import com.dairysync.backend.model.enums.VendorStatus;
import com.dairysync.backend.repository.UserRepository;
import com.dairysync.backend.repository.VendorRepository;
import com.dairysync.backend.service.VendorService;
import org.springframework.stereotype.Service;


@Service
public class VendorServiceImpl implements VendorService {
    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;

    public VendorServiceImpl(VendorRepository vendorRepository, UserRepository userRepository){
        this.vendorRepository = vendorRepository;
        this.userRepository = userRepository;
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


}
