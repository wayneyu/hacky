package com.rbc.hacky.model;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface FundRepository extends PagingAndSortingRepository<Fund, String> {

    Page<Fund> findAll(Pageable pageRequest);
}
