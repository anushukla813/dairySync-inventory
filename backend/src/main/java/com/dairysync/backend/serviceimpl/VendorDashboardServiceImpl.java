package com.dairysync.backend.serviceimpl;


import com.dairysync.backend.model.entity.User;
import com.dairysync.backend.model.entity.Vendor;
import com.dairysync.backend.repository.VendorRepository;
import com.dairysync.backend.service.VendorDashboardService;

import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.Map;



@Service
public class VendorDashboardServiceImpl
        implements VendorDashboardService {


    private final VendorRepository vendorRepository;



    public VendorDashboardServiceImpl(
            VendorRepository vendorRepository
    ){

        this.vendorRepository = vendorRepository;

    }



    @Override
    public Map<String,Object> getDashboardData(
            String email
    ){


        Vendor vendor =
                vendorRepository
                        .findByUser_Email(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Vendor not found"
                                )
                        );



        User user = vendor.getUser();



        Map<String,Object> dashboard =
                new HashMap<>();


        dashboard.put(
                "vendorId",
                vendor.getVendorId()
        );


        dashboard.put(
                "vendorName",
                user.getFullName()
        );


        dashboard.put(
                "email",
                user.getEmail()
        );


        dashboard.put(
                "phone",
                user.getPhone()
        );


        dashboard.put(
                "location",
                user.getLocation()
        );


        dashboard.put(
                "address",
                vendor.getAddress()
        );


        dashboard.put(
                "status",
                vendor.getStatus()
        );


        return dashboard;

    }

}