package com.dairysync.backend.controller;


import com.dairysync.backend.dto.request.SaleRequest;
import com.dairysync.backend.dto.response.SaleResponse;
import com.dairysync.backend.service.SaleService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/sales")
public class SaleController {


    private final SaleService saleService;


    public SaleController(SaleService saleService) {

        this.saleService = saleService;
    }


    @PostMapping
    public ResponseEntity<SaleResponse> createSale(
            @Valid @RequestBody SaleRequest request) {


        SaleResponse response =
                saleService.createSale(request);


        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<SaleResponse>> getAllSales() {


        return ResponseEntity.ok(
                saleService.getAllSales()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaleResponse> getSaleById(
            @PathVariable Long id) {


        return ResponseEntity.ok(
                saleService.getSaleById(id)
        );

    }
    @GetMapping("/search")
    public ResponseEntity<List<SaleResponse>> searchCustomer(
            @RequestParam String name) {

        return ResponseEntity.ok(
                saleService.searchCustomer(name)
        );
    }
    @GetMapping("/date/{date}")
    public ResponseEntity<List<SaleResponse>> getSalesByDate(
            @PathVariable LocalDate date) {


        return ResponseEntity.ok(
                saleService.getSalesByDate(date)
        );
    }
}







