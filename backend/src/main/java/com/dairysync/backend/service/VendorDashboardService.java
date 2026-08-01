package com.dairysync.backend.service;


import java.util.Map;


public interface VendorDashboardService {


    Map<String, Object> getDashboardData(
            String email
    );

}