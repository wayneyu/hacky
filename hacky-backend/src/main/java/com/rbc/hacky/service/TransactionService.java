package com.rbc.hacky.service;

import com.rbc.hacky.model.Transaction;
import com.rbc.hacky.model.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TransactionService {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Iterable<Transaction> findAll() {
        return transactionRepository.findAll();
    }
}
