package com.dairysync.backend.serviceimpl;

import com.dairysync.backend.dto.request.MilkSupplyRequest;
import com.dairysync.backend.dto.response.MilkSupplyResponse;
import com.dairysync.backend.model.entity.Inventory;
import com.dairysync.backend.model.entity.MilkSupply;
import com.dairysync.backend.model.entity.MilkType;
import com.dairysync.backend.model.entity.User;
import com.dairysync.backend.model.entity.Vendor;
import com.dairysync.backend.model.enums.VerificationStatus;
import com.dairysync.backend.repository.InventoryRepository;
import com.dairysync.backend.repository.MilkSupplyRepository;
import com.dairysync.backend.repository.MilkTypeRepository;
import com.dairysync.backend.repository.UserRepository;
import com.dairysync.backend.repository.VendorRepository;
import com.dairysync.backend.service.MilkSupplyService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MilkSupplyServiceImpl implements MilkSupplyService {

    private final MilkTypeRepository milkTypeRepository;
    private final VendorRepository vendorRepository;
    private final MilkSupplyRepository milkSupplyRepository;
    private final UserRepository userRepository;
    private final InventoryRepository inventoryRepository;

    public MilkSupplyServiceImpl(
            MilkSupplyRepository milkSupplyRepository,
            VendorRepository vendorRepository,
            MilkTypeRepository milkTypeRepository,
            InventoryRepository inventoryRepository,
            UserRepository userRepository) {

        this.milkSupplyRepository = milkSupplyRepository;
        this.vendorRepository = vendorRepository;
        this.milkTypeRepository = milkTypeRepository;
        this.inventoryRepository = inventoryRepository;
        this.userRepository = userRepository;
    }

    @Override
    public MilkSupplyResponse createMilkSupply(Long vendorId,
                                               MilkSupplyRequest request) {

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        MilkType milkType = milkTypeRepository.findById(request.getMilkTypeId())
                .orElseThrow(() -> new RuntimeException("Milk Type not found"));

        MilkSupply milkSupply = new MilkSupply();

        milkSupply.setVendor(vendor);
        milkSupply.setMilkType(milkType);
        milkSupply.setQuantity(request.getQuantity());
        milkSupply.setFatPercentage(request.getFatPercentage());
        milkSupply.setSnfPercentage(request.getSnfPercentage());
        milkSupply.setSupplyDate(request.getSupplyDate());
        milkSupply.setSupplyTime(request.getSupplyTime());
        milkSupply.setShift(request.getShift());
        milkSupply.setPricePerLiter(milkType.getPricePerLiter());

        milkSupply.calculateTotalAmount();

        MilkSupply savedMilkSupply = milkSupplyRepository.save(milkSupply);

        MilkSupplyResponse response = new MilkSupplyResponse();

        response.setSupplyId(savedMilkSupply.getSupplyId());
        response.setVendorId(savedMilkSupply.getVendor().getVendorId());
        response.setVendorName(savedMilkSupply.getVendor().getUser().getFullName());
        response.setMilkType(savedMilkSupply.getMilkType().getMilkName());
        response.setQuantity(savedMilkSupply.getQuantity());
        response.setFatPercentage(savedMilkSupply.getFatPercentage());
        response.setSnfPercentage(savedMilkSupply.getSnfPercentage());
        response.setSupplyDate(savedMilkSupply.getSupplyDate());
        response.setSupplyTime(savedMilkSupply.getSupplyTime());
        response.setShift(savedMilkSupply.getShift());
        response.setVerificationStatus(savedMilkSupply.getVerificationStatus());
        response.setPricePerLiter(savedMilkSupply.getPricePerLiter());
        response.setTotalAmount(savedMilkSupply.getTotalAmount());

        return response;
    }

    @Override
    public List<MilkSupplyResponse> getVendorMilkSupply(Long vendorId) {

        List<MilkSupply> milkSupplies =
                milkSupplyRepository.findByVendorVendorIdOrderBySupplyDateDesc(vendorId);

        List<MilkSupplyResponse> responseList = new ArrayList<>();

        for (MilkSupply milkSupply : milkSupplies) {

            MilkSupplyResponse response = new MilkSupplyResponse();

            response.setSupplyId(milkSupply.getSupplyId());
            response.setVendorId(milkSupply.getVendor().getVendorId());
            response.setVendorName(milkSupply.getVendor().getUser().getFullName());
            response.setMilkType(milkSupply.getMilkType().getMilkName());
            response.setQuantity(milkSupply.getQuantity());
            response.setFatPercentage(milkSupply.getFatPercentage());
            response.setSnfPercentage(milkSupply.getSnfPercentage());
            response.setPricePerLiter(milkSupply.getPricePerLiter());
            response.setSupplyDate(milkSupply.getSupplyDate());
            response.setSupplyTime(milkSupply.getSupplyTime());
            response.setShift(milkSupply.getShift());
            response.setVerificationStatus(milkSupply.getVerificationStatus());
            response.setTotalAmount(milkSupply.getTotalAmount());

            responseList.add(response);
        }

        return responseList;
    }

    @Override
    public List<MilkSupplyResponse> getTodayMilkSupply(LocalDate date) {

        List<MilkSupply> milkSupplies =
                milkSupplyRepository.findBySupplyDate(date);

        List<MilkSupplyResponse> responseList = new ArrayList<>();

        for (MilkSupply milkSupply : milkSupplies) {

            MilkSupplyResponse response = new MilkSupplyResponse();

            response.setSupplyId(milkSupply.getSupplyId());
            response.setVendorId(milkSupply.getVendor().getVendorId());
            response.setVendorName(milkSupply.getVendor().getUser().getFullName());
            response.setMilkType(milkSupply.getMilkType().getMilkName());
            response.setQuantity(milkSupply.getQuantity());
            response.setFatPercentage(milkSupply.getFatPercentage());
            response.setSnfPercentage(milkSupply.getSnfPercentage());
            response.setSupplyDate(milkSupply.getSupplyDate());
            response.setSupplyTime(milkSupply.getSupplyTime());
            response.setShift(milkSupply.getShift());
            response.setVerificationStatus(milkSupply.getVerificationStatus());
            response.setPricePerLiter(milkSupply.getPricePerLiter());
            response.setTotalAmount(milkSupply.getTotalAmount());

            responseList.add(response);
        }

        return responseList;
    }

    @Override
    public List<MilkSupplyResponse> getAllMilkSupplies() {
        
        List<MilkSupply> milkSupplies = milkSupplyRepository.findAll();

        List<MilkSupplyResponse> responseList = new ArrayList<>();

        for (MilkSupply milkSupply : milkSupplies) {

            MilkSupplyResponse response = new MilkSupplyResponse();

            response.setSupplyId(milkSupply.getSupplyId());
            response.setVendorId(milkSupply.getVendor().getVendorId());
            response.setVendorName(milkSupply.getVendor().getUser().getFullName());
            response.setMilkType(milkSupply.getMilkType().getMilkName());
            response.setQuantity(milkSupply.getQuantity());
            response.setFatPercentage(milkSupply.getFatPercentage());
            response.setSnfPercentage(milkSupply.getSnfPercentage());
            response.setPricePerLiter(milkSupply.getPricePerLiter());
            response.setSupplyDate(milkSupply.getSupplyDate());
            response.setSupplyTime(milkSupply.getSupplyTime());
            response.setShift(milkSupply.getShift());
            response.setVerificationStatus(milkSupply.getVerificationStatus());
            response.setTotalAmount(milkSupply.getTotalAmount());

            responseList.add(response);
        }

        return responseList;
    }

    @Override
    public MilkSupplyResponse verifyMilkSupply(Long supplyId) {

        MilkSupply milkSupply = milkSupplyRepository.findById(supplyId)
                .orElseThrow(() -> new RuntimeException("Milk Supply not found"));

        if (milkSupply.getVerificationStatus() == VerificationStatus.Verified) {
            throw new RuntimeException("Milk Supply is already verified");
        }

        milkSupply.setVerificationStatus(VerificationStatus.Verified);

        MilkSupply updatedMilkSupply = milkSupplyRepository.save(milkSupply);

        Inventory inventory = inventoryRepository
                .findByMilkTypeMilkTypeId(
                        updatedMilkSupply.getMilkType().getMilkTypeId())
                .orElse(null);

        if (inventory == null) {

            inventory = new Inventory();
            inventory.setMilkType(updatedMilkSupply.getMilkType());
            inventory.setAvailableQuantity(updatedMilkSupply.getQuantity());
            inventory.setUnit("Liter");
            inventory.setLastUpdated(LocalDateTime.now());

        } else {

            inventory.setAvailableQuantity(
                    inventory.getAvailableQuantity()
                            .add(updatedMilkSupply.getQuantity())
            );

            inventory.setLastUpdated(LocalDateTime.now());
        }

        inventoryRepository.save(inventory);

        MilkSupplyResponse response = new MilkSupplyResponse();

        response.setSupplyId(updatedMilkSupply.getSupplyId());
        response.setVendorId(updatedMilkSupply.getVendor().getVendorId());
        response.setVendorName(updatedMilkSupply.getVendor().getUser().getFullName());
        response.setMilkType(updatedMilkSupply.getMilkType().getMilkName());
        response.setQuantity(updatedMilkSupply.getQuantity());
        response.setFatPercentage(updatedMilkSupply.getFatPercentage());
        response.setSnfPercentage(updatedMilkSupply.getSnfPercentage());
        response.setSupplyDate(updatedMilkSupply.getSupplyDate());
        response.setSupplyTime(updatedMilkSupply.getSupplyTime());
        response.setShift(updatedMilkSupply.getShift());
        response.setVerificationStatus(updatedMilkSupply.getVerificationStatus());
        response.setPricePerLiter(updatedMilkSupply.getPricePerLiter());
        response.setTotalAmount(updatedMilkSupply.getTotalAmount());

        return response;
    }

    @Override
    public List<MilkSupplyResponse> getMilkHistory(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vendor vendor = vendorRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        List<MilkSupply> milkSupplies =
                milkSupplyRepository.findByVendorVendorIdOrderBySupplyDateDesc(
                        vendor.getVendorId()
                );

        List<MilkSupplyResponse> responseList = new ArrayList<>();

        for (MilkSupply milkSupply : milkSupplies) {

            MilkSupplyResponse response = new MilkSupplyResponse();

            response.setSupplyId(milkSupply.getSupplyId());
            response.setVendorId(milkSupply.getVendor().getVendorId());
            response.setVendorName(milkSupply.getVendor().getUser().getFullName());
            response.setMilkType(milkSupply.getMilkType().getMilkName());
            response.setQuantity(milkSupply.getQuantity());
            response.setFatPercentage(milkSupply.getFatPercentage());
            response.setSnfPercentage(milkSupply.getSnfPercentage());
            response.setSupplyDate(milkSupply.getSupplyDate());
            response.setSupplyTime(milkSupply.getSupplyTime());
            response.setShift(milkSupply.getShift());
            response.setVerificationStatus(milkSupply.getVerificationStatus());
            response.setPricePerLiter(milkSupply.getPricePerLiter());
            response.setTotalAmount(milkSupply.getTotalAmount());

            responseList.add(response);
        }

        return responseList;
    }
}