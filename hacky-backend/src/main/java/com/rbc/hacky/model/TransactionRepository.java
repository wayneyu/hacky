package com.rbc.hacky.model;

import org.springframework.data.repository.CrudRepository;

public interface TransactionRepository  extends CrudRepository<Transaction, String> {
}
