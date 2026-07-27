package com.dairysync.backend.serviceimpl;

import com.dairysync.backend.dto.response.MilkTypeResponse;
import com.dairysync.backend.model.entity.MilkType;
import com.dairysync.backend.repository.MilkTypeRepository;
import com.dairysync.backend.service.MilkTypeService;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class MilkTypeServiceImpl implements MilkTypeService {
    private final MilkTypeRepository milkTypeRepository;

    public MilkTypeServiceImpl(MilkTypeRepository milkTypeRepository) {
        this.milkTypeRepository = milkTypeRepository;
    }

    @Override
    public List<MilkTypeResponse> getAllMilkTypes() {

        List<MilkType> milkTypes = milkTypeRepository.findAll();

        List<MilkTypeResponse> responseList = new ArrayList<>();

        for (MilkType milkType : milkTypes) {

            MilkTypeResponse response = new MilkTypeResponse();

            response.setMilkTypeId(milkType.getMilkTypeId());
            response.setMilkName(milkType.getMilkName());

            responseList.add(response);
        }

        return responseList;
    }


    @Override
    public MilkTypeResponse getMilkTypeById(Long milkTypeId) {
        MilkType milkType = milkTypeRepository.findById(milkTypeId)
                .orElseThrow(() -> new RuntimeException("Milk Type not found"));

        MilkTypeResponse response = new MilkTypeResponse();

        response.setMilkTypeId(milkType.getMilkTypeId());
        response.setMilkName(milkType.getMilkName());

        return response;
    }
}

