package com.dairysync.backend.service;

import com.dairysync.backend.dto.response.MilkTypeResponse;
import java.util.List;

public interface MilkTypeService {
    List<MilkTypeResponse>getAllMilkTypes();

    MilkTypeResponse getMilkTypeById(Long milkTypeId);
}
