package com.rbc.hacky.model;

import org.springframework.hateoas.ResourceSupport;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "funds")
public class Fund extends ResourceSupport {

    @Id
    @Column(name = "id")
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "top_subs")
    private Integer topSubscriber;
    @Column(name = "top_perf")
    private Integer topPerformance;
    @Column(name = "percent_dealers")
    private Integer percentDealers;
    @Column(name = "category")
    private String category;
    @Column(name = "price")
    private Double price;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getTopSubscriber() {
        return topSubscriber;
    }

    public void setTopSubscriber(Integer topSubscriber) {
        this.topSubscriber = topSubscriber;
    }

    public Integer getTopPerformance() {
        return topPerformance;
    }

    public void setTopPerformance(Integer topPerformance) {
        this.topPerformance = topPerformance;
    }

    public Integer getPercentDealers() {
        return percentDealers;
    }

    public void setPercentDealers(Integer percentDealers) {
        this.percentDealers = percentDealers;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getFundId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        Fund fund = (Fund) o;

        return id != null ? id.equals(fund.id) : fund.id == null;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (id != null ? id.hashCode() : 0);
        return result;
    }
}
