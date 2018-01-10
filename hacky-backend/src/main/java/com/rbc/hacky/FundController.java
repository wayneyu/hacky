package com.rbc.hacky;

import com.rbc.hacky.model.Fund;
import com.rbc.hacky.service.FundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.AbstractMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/funds")
public class FundController {

    private final FundService fundService;

    @Autowired
    public FundController(FundService fundService) {
        this.fundService = fundService;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public HttpEntity<Page<Fund>> getFund(@PageableDefault(size = 5)
                                          @SortDefault.SortDefaults({
                                                  @SortDefault(sort = "id", direction = Sort.Direction.DESC)
                                          }) Pageable pageRequest) {

        Page<Fund> transactionList = fundService.findAll(pageRequest);
        return new ResponseEntity<>(transactionList, HttpStatus.OK);
    }

    @RequestMapping(value = "/transferMap", method = RequestMethod.GET)
    public HttpEntity<Map<String,List<AbstractMap.SimpleEntry<String,Integer>>>> getTransferMap() {
        return new ResponseEntity<>(fundService.createFundTransferGraph(), HttpStatus.OK);
    }
}
