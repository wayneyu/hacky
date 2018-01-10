package com.rbc.hacky.service;

import com.google.common.collect.Lists;
import com.rbc.hacky.FundController;
import com.rbc.hacky.model.CityWIthFund;
import com.rbc.hacky.model.Fund;
import com.rbc.hacky.model.FundRepository;
import com.rbc.hacky.model.Transfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import static com.rbc.hacky.model.CityWIthFund.mockedCityFunds;
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

    @Cacheable("transferMapCache")
    public  Map<String,List<Transfer>> createFundTransferGraph() {

        List<Fund> allFunds = Lists.newArrayList(fundRepository.findAll());

        Map<String,List<Transfer>> fundTransferMap = new HashMap<>();

        allFunds.forEach(fund ->
            fundTransferMap.put(fund.getName(), allFunds.stream().map(fund1 ->
                    new Transfer(fund1.getName(), generateRandomTransferRate(fund.getFundId(), fund1.getFundId()))
            ).collect(Collectors.toList()))
        );

       return fundTransferMap;
    }

    public List<CityWIthFund> getCityFundMap() {
        return mockedCityFunds;
    }

    private static double generateRandomTransferRate (int fund1, int fund2) {
        Random rand = new Random();
        return fund1 == fund2 ? 0.0 : rand.nextDouble() * 20000 - 9999;
    }

}
