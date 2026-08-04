package com.dairysync.backend.controller;


import com.dairysync.backend.dto.response.ApiResponse;
import com.dairysync.backend.dto.response.SellerDashboardResponse;
import com.dairysync.backend.service.SellerDashboardService;

import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/seller/dashboard")
public class SellerDashboardController {



    private final SellerDashboardService sellerDashboardService;



    public SellerDashboardController(
            SellerDashboardService sellerDashboardService
    ){

        this.sellerDashboardService =
                sellerDashboardService;

    }





    @GetMapping
    public ApiResponse<SellerDashboardResponse> getDashboard(){


        SellerDashboardResponse response =
                sellerDashboardService.getDashboard();



        return ApiResponse.success(

                "Seller dashboard fetched successfully",

                response

        );

    }

}