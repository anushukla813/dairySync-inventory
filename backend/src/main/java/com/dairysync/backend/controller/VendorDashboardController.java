package com.dairysync.backend.controller;


//import com.dairysync.backend.dto.response.ApiResponse;
import com.dairysync.backend.model.entity.User;
import com.dairysync.backend.service.VendorService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.dairysync.backend.service.MilkSupplyService;


@RestController
@RequestMapping("/vendor")
public class VendorDashboardController {


    private final VendorService vendorService;
    private final MilkSupplyService milkSupplyService;


    public VendorDashboardController(
            VendorService vendorService,
             MilkSupplyService milkSupplyService){
        
        this.vendorService = vendorService;
        this.milkSupplyService = milkSupplyService;
    }



    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(Authentication authentication){

    User user = (User) authentication.getPrincipal();

    String email = user.getEmail();

    System.out.println("Dashboard Email = " + email);

    return ResponseEntity.ok(
            vendorService.getDashboard(email)
    );
    }

    @GetMapping("/milk-history")
    public ResponseEntity<?> getMilkHistory(Authentication authentication) {

    User user = (User) authentication.getPrincipal();

    return ResponseEntity.ok(
            milkSupplyService.getMilkHistory(user.getEmail())
    );
}

}