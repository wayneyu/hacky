package com.rbc.hacky.model;

public class Transfer {

    public Transfer(String to, Double amount) {
        this.to = to;
        this.amount = amount;
    }

    private String to;

    private Double amount;

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

}
