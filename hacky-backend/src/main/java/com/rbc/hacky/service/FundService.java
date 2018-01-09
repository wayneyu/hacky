package com.rbc.hacky.service;

import com.rbc.hacky.FundController;
import com.rbc.hacky.model.Fund;
import com.rbc.hacky.model.FundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

@Component
public class FundService {

    private final FundRepository fundRepository;

    @Autowired
    public FundService(FundRepository fundRepository) {
        this.fundRepository = fundRepository;
    }

    public Page<Fund> findAll(Pageable pageRequest) {
        Page<Fund> transactionPage = fundRepository.findAll(pageRequest);
        List<Fund> fundList = transactionPage.getContent();
        fundList.forEach(fund -> fund.add(linkTo(FundController.class).slash(fund.getFundId()).withSelfRel()));
        return transactionPage;
    }
}
