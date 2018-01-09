package com.rbc.hacky.model;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.ResourceSupport;

public class Transaction extends ResourceSupport{

    private String transactionId;
    private String name;
    private String description;


    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String id) {
        this.transactionId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
