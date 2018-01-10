package com.rbc.hacky.model;

import java.text.NumberFormat;
import java.util.Arrays;
import java.util.List;

public class CityWIthFund {

    public static final List<CityWIthFund> mockedCityFunds = Arrays.asList(
            new CityWIthFund(146244435.04, "CA" , "ON" , "Toronto" , "43.653963" , "-79.387207"),
            new CityWIthFund(160303350.80, "CA" , "BC" , "Vancouver" , "49.2608724" , "-123.1139529"),
            new CityWIthFund(156066039.29, "CA" , "AB" , "Calgary" , "51.0534234","-114.0625892"),
            new CityWIthFund(10222054.16, "CA" , "QC" , "Quebec" , "52.9399","-73.5491"),
            new CityWIthFund( 6661491.07, "CA" , "NS" , "Halifax" , "44.651070","-63.582687"),
            new CityWIthFund(24873414.18, "CA" , "AB" , "Edmonton" , "53.5444","-113.4909"),
            new CityWIthFund( 24280033.59, "CA" , "QC" , "Montreal" , "45.5017","-73.5673")

//            new CityWIthFund(845655.44, "USA" , "TX" , "Dallas" , "32.7762719" , "-96.7968559"),
//            new CityWIthFund(93475.98, "USA" , "CA" , "San Francisco" , "37.7792808" , "-122.4192363"),
//            new CityWIthFund(2345.17, "USA" , "NY" , "Manhattan" , "40.7902778" , "-73.9597222"),
//            new CityWIthFund(-6491.17, "USA" , "FL" , "Miami" , "25.7742658" , "-80.1936589"),
//            new CityWIthFund(8745.21, "USA" , "DC" , "Washington" , "38.8949549" , "-77.0366456"),
//            new CityWIthFund(-3743.75, "USA" , "UT" , "Salt Lake City" , "40.7670126" , "-111.8904308"),
//            new CityWIthFund(53341.1, "USA" , "NE" , "Omaha" , "41.2587317" , "-95.9378732")
    );

    private Double netAmount;
    private String country;
    private String state;
    private String city;
    private String lon;
    private String lat;
    private String color; // this is a hack

    public CityWIthFund(Double netAmount, String country, String state, String city, String lat, String lon) {
        this.netAmount = netAmount;
        this.country = country;
        this.state = state;
        this.city = city;
        this.lon = lon;
        this.lat = lat;
        this.color = netAmount > 0 ? "green" : "red";
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getNetAmount() {
        NumberFormat formatter = NumberFormat.getCurrencyInstance();
        return formatter.format(netAmount);
    }

    public void setNetAmount(Double netAmount) {
        this.netAmount = netAmount;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getLon() {
        return lon;
    }

    public void setLon(String lon) {
        this.lon = lon;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }
}
