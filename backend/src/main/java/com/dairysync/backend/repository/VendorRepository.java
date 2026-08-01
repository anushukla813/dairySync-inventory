package com.dairysync.backend.repository;

import com.dairysync.backend.model.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {


    Optional<Vendor> findByUserId(Long userId);


    Optional<Vendor> findByUser_Email(String email);


    boolean existsByUserId(Long userId);

}