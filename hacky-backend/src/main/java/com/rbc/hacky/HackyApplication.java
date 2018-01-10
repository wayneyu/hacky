package com.rbc.hacky;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class HackyApplication {

	public static void main(String[] args) {
		SpringApplication.run(HackyApplication.class, args);
	}
}
