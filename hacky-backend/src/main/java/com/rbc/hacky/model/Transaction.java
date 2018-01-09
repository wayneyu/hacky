package com.rbc.hacky.model;

import org.springframework.hateoas.ResourceSupport;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "potluck")
public class Transaction extends ResourceSupport{

    @Id
    @Column(name = "id")
    private String transactionId;
    @Column(name = "name")
    private String name;
    @Column(name = "food")
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
