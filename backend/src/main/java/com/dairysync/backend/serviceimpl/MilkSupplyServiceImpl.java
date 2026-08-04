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
import com.dairysync.backend.repository.PaymentRepository;
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
    private final PaymentRepository paymentRepository;



    public MilkSupplyServiceImpl(
            MilkSupplyRepository milkSupplyRepository,
            VendorRepository vendorRepository,
            MilkTypeRepository milkTypeRepository,
            InventoryRepository inventoryRepository,
            UserRepository userRepository,
            PaymentRepository paymentRepository
    ) {

        this.milkSupplyRepository = milkSupplyRepository;
        this.vendorRepository = vendorRepository;
        this.milkTypeRepository = milkTypeRepository;
        this.inventoryRepository = inventoryRepository;
        this.userRepository = userRepository;
        this.paymentRepository = paymentRepository;

    }



    @Override
    public MilkSupplyResponse createMilkSupply(
            Long vendorId,
            MilkSupplyRequest request
    ) {


        Vendor vendor =
                vendorRepository.findById(vendorId)
                .orElseThrow(
                        () -> new RuntimeException("Vendor not found")
                );


        MilkType milkType =
                milkTypeRepository.findById(request.getMilkTypeId())
                .orElseThrow(
                        () -> new RuntimeException("Milk Type not found")
                );



        MilkSupply milkSupply = new MilkSupply();


        milkSupply.setVendor(vendor);
        milkSupply.setMilkType(milkType);
        milkSupply.setQuantity(request.getQuantity());
        milkSupply.setFatPercentage(request.getFatPercentage());
        milkSupply.setSnfPercentage(request.getSnfPercentage());
        milkSupply.setSupplyDate(request.getSupplyDate());
        milkSupply.setSupplyTime(request.getSupplyTime());
        milkSupply.setShift(request.getShift());
        milkSupply.setPricePerLiter(
                milkType.getPricePerLiter()
        );


        milkSupply.calculateTotalAmount();



        MilkSupply savedMilkSupply =
                milkSupplyRepository.save(milkSupply);



        MilkSupplyResponse response =
                convertToResponse(savedMilkSupply);



        return response;

    }




    @Override
    public List<MilkSupplyResponse> getVendorMilkSupply(Long vendorId) {


        List<MilkSupply> milkSupplies =
                milkSupplyRepository
                .findByVendorVendorIdOrderBySupplyDateDesc(vendorId);



        List<MilkSupplyResponse> responses =
                new ArrayList<>();


        for(MilkSupply milkSupply : milkSupplies){

            responses.add(
                    convertToResponse(milkSupply)
            );

        }


        return responses;

    }




    @Override
    public List<MilkSupplyResponse> getTodayMilkSupply(LocalDate date) {


        List<MilkSupply> milkSupplies =
                milkSupplyRepository.findBySupplyDate(date);



        List<MilkSupplyResponse> responses =
                new ArrayList<>();



        for(MilkSupply milkSupply : milkSupplies){

            responses.add(
                    convertToResponse(milkSupply)
            );

        }



        return responses;

    }




    @Override
    public List<MilkSupplyResponse> getAllMilkSupplies() {


        List<MilkSupply> milkSupplies =
                milkSupplyRepository.findAll();



        List<MilkSupplyResponse> responses =
                new ArrayList<>();



        for(MilkSupply milkSupply : milkSupplies){

            responses.add(
                    convertToResponse(milkSupply)
            );

        }


        return responses;

    }




    @Override
    public MilkSupplyResponse verifyMilkSupply(Long supplyId) {


        MilkSupply milkSupply =
                milkSupplyRepository.findById(supplyId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Milk Supply not found"
                        )
                );



        if(
            milkSupply.getVerificationStatus()
            == VerificationStatus.Verified
        ){

            throw new RuntimeException(
                    "Milk Supply is already verified"
            );

        }



        milkSupply.setVerificationStatus(
                VerificationStatus.Verified
        );



        MilkSupply updatedMilkSupply =
                milkSupplyRepository.save(milkSupply);



        Inventory inventory =
                inventoryRepository
                .findByMilkTypeMilkTypeId(
                        updatedMilkSupply
                        .getMilkType()
                        .getMilkTypeId()
                )
                .orElse(null);




        if(inventory == null){


            inventory = new Inventory();

            inventory.setMilkType(
                    updatedMilkSupply.getMilkType()
            );

            inventory.setAvailableQuantity(
                    updatedMilkSupply.getQuantity()
            );

            inventory.setUnit("Liter");

            inventory.setLastUpdated(
                    LocalDateTime.now()
            );


        }
        else{


            inventory.setAvailableQuantity(
                    inventory.getAvailableQuantity()
                    .add(
                        updatedMilkSupply.getQuantity()
                    )
            );


            inventory.setLastUpdated(
                    LocalDateTime.now()
            );

        }



        inventoryRepository.save(inventory);



        return convertToResponse(updatedMilkSupply);

    }




    @Override
    public List<MilkSupplyResponse> getMilkHistory(String email) {


        User user =
                userRepository.findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );



        Vendor vendor =
                vendorRepository.findByUserId(user.getId())
                .orElseThrow(
                        () -> new RuntimeException(
                                "Vendor not found"
                        )
                );



        List<MilkSupply> milkSupplies =
                milkSupplyRepository
                .findByVendorVendorIdOrderBySupplyDateDesc(
                        vendor.getVendorId()
                );



        List<MilkSupplyResponse> responses =
                new ArrayList<>();



        for(MilkSupply milkSupply : milkSupplies){


            responses.add(
                    convertToResponse(milkSupply)
            );

        }



        return responses;

    }






    private MilkSupplyResponse convertToResponse(
            MilkSupply milkSupply
    ){


        MilkSupplyResponse response =
                new MilkSupplyResponse();



        response.setSupplyId(
                milkSupply.getSupplyId()
        );


        response.setVendorId(
                milkSupply.getVendor().getVendorId()
        );


        response.setVendorName(
                milkSupply
                .getVendor()
                .getUser()
                .getFullName()
        );


        response.setMilkType(
                milkSupply
                .getMilkType()
                .getMilkName()
        );


        response.setQuantity(
                milkSupply.getQuantity()
        );


        response.setFatPercentage(
                milkSupply.getFatPercentage()
        );


        response.setSnfPercentage(
                milkSupply.getSnfPercentage()
        );


        response.setPricePerLiter(
                milkSupply.getPricePerLiter()
        );


        response.setSupplyDate(
                milkSupply.getSupplyDate()
        );


        response.setSupplyTime(
                milkSupply.getSupplyTime()
        );


        response.setShift(
                milkSupply.getShift()
        );


        response.setVerificationStatus(
                milkSupply.getVerificationStatus()
        );


        response.setTotalAmount(
                milkSupply.getTotalAmount()
        );



        setPaymentDetails(
                response,
                milkSupply.getSupplyId()
        );



        return response;

    }





    private void setPaymentDetails(
            MilkSupplyResponse response,
            Long supplyId
    ){


        paymentRepository
        .findByMilkSupplySupplyId(supplyId)
        .ifPresent(payment -> {



            response.setPaymentStatus(
                    payment.getPaymentStatus()
            );



            response.setReceiptNumber(
                    payment.getReceiptNumber()
            );



        });


    }



}