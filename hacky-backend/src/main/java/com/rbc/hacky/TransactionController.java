package com.rbc.hacky;

import com.google.common.collect.Lists;
import com.rbc.hacky.model.Transaction;
import com.rbc.hacky.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionRepository;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionRepository = transactionService;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public HttpEntity<List<Transaction>> greeting() {

        Iterable<Transaction> transactionList = transactionRepository.findAll();
        transactionList.forEach(transaction -> transaction.add(linkTo(TransactionController.class).slash(transaction.getTransactionId()).withSelfRel()));

        return new ResponseEntity<>(Lists.newArrayList(transactionList), HttpStatus.OK);
    }
}
