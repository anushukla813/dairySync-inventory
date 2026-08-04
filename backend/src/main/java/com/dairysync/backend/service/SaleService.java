package com.dairysync.backend.service;

import com.dairysync.backend.dto.request.SaleRequest;
import com.dairysync.backend.dto.response.SaleResponse;

import java.time.LocalDate;
import java.util.List;

public interface SaleService {

    SaleResponse createSale(SaleRequest request, String email);


    SaleResponse getSaleById(Long saleId);


    List<SaleResponse> getAllSales();

    List<SaleResponse> getSalesByDate(LocalDate saleDate);


    List<SaleResponse> searchCustomer(String customerName);


}
