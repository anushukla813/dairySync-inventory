package com.dairysync.backend.serviceimpl;

import com.dairysync.backend.dto.request.SaleRequest;
import com.dairysync.backend.dto.response.SaleResponse;
import com.dairysync.backend.model.entity.Inventory;
import com.dairysync.backend.model.entity.MilkType;
import com.dairysync.backend.model.entity.Sale;
import com.dairysync.backend.model.entity.User;
import com.dairysync.backend.repository.InventoryRepository;
import com.dairysync.backend.repository.MilkTypeRepository;
import com.dairysync.backend.repository.SaleRepository;
import com.dairysync.backend.repository.UserRepository;
import com.dairysync.backend.service.SaleService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
@Transactional
public class SaleServiceImpl implements SaleService {


    private final SaleRepository saleRepository;
    private final MilkTypeRepository milkTypeRepository;
    private final InventoryRepository inventoryRepository;
    private final UserRepository userRepository;


    public SaleServiceImpl(
            SaleRepository saleRepository,
            MilkTypeRepository milkTypeRepository,
            InventoryRepository inventoryRepository,
            UserRepository userRepository) {

        this.saleRepository = saleRepository;
        this.milkTypeRepository = milkTypeRepository;
        this.inventoryRepository = inventoryRepository;
        this.userRepository = userRepository;
    }


    @Override
    public SaleResponse createSale(SaleRequest request) {


        MilkType milkType = milkTypeRepository
                .findById(request.getMilkTypeId())
                .orElseThrow(() ->
                        new RuntimeException("Milk Type not found"));


        Inventory inventory = inventoryRepository
                .findByMilkTypeMilkTypeId(request.getMilkTypeId())
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found"));


        User seller = userRepository.findById(1L)
                .orElseThrow(() ->
                        new RuntimeException("Seller not found"));


        if (inventory.getAvailableQuantity()
                .compareTo(request.getQuantity()) < 0) {

            throw new RuntimeException(
                    "Insufficient milk stock");
        }

        BigDecimal pricePerLiter =
                milkType.getPricePerLiter();


        BigDecimal totalAmount =
                request.getQuantity()
                        .multiply(pricePerLiter);


        Sale sale = new Sale();

        sale.setCustomerName(request.getCustomerName());

        sale.setCustomerPhone(request.getCustomerPhone());

        sale.setMilkType(milkType);

        sale.setQuantity(request.getQuantity());

        sale.setPricePerLiter(pricePerLiter);

        sale.setTotalAmount(totalAmount);

        sale.setReceiptNumber(generateReceiptNumber());

        sale.setSeller(seller);

        sale.setSaleDate(LocalDate.now());


        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity()
                        .subtract(request.getQuantity())
        );


        inventoryRepository.save(inventory);


        Sale savedSale =
                saleRepository.save(sale);


        return mapToResponse(savedSale);
    }
    @Override
    public List<SaleResponse> getAllSales() {

        return saleRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();

    }



    @Override
    public SaleResponse getSaleById(Long saleId) {


        Sale sale = saleRepository.findById(saleId)
                .orElseThrow(() ->
                        new RuntimeException("Sale not found"));


        return mapToResponse(sale);

    }

    @Override
    public List<SaleResponse> searchCustomer(String customerName) {


        return saleRepository
                .findByCustomerNameContainingIgnoreCase(customerName)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    @Override
    public List<SaleResponse> getSalesByDate(LocalDate saleDate) {


        return saleRepository
                .findBySaleDate(saleDate)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    private String generateReceiptNumber() {


        String date = LocalDate.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd"));


        long count = saleRepository.count() + 1;


        return "SALE-" + date + "-"
                + String.format("%04d", count);
    }

    private SaleResponse mapToResponse(Sale sale) {


        SaleResponse response = new SaleResponse();


        response.setSaleId(sale.getSaleId());

        response.setCustomerName(
                sale.getCustomerName()
        );

        response.setMilkType(
                sale.getMilkType()
                        .getMilkName()
        );

        response.setQuantity(
                sale.getQuantity()
        );

        response.setPricePerLiter(
                sale.getPricePerLiter()
        );

        response.setTotalAmount(
                sale.getTotalAmount()
        );

        response.setReceiptNumber(
                sale.getReceiptNumber()
        );

        response.setSaleDate(
                sale.getSaleDate()
        );


        return response;
    }


}