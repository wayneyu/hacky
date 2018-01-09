package com.rbc.hacky;

import com.google.common.collect.Lists;
import com.rbc.hacky.model.Transaction;
import com.rbc.hacky.model.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public HttpEntity<List<Transaction>> greeting(
            @RequestParam(value = "name", required = false, defaultValue = "World") String name) {

        Iterable<Transaction> transactionList = transactionRepository.findAll();
        transactionList.forEach(transaction -> transaction.add(linkTo(TransactionController.class).slash(transaction.getTransactionId()).withSelfRel()));

        return new ResponseEntity<>(Lists.newArrayList(transactionList), HttpStatus.OK);
    }
}
