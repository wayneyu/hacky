package com.rbc.hacky;

import com.rbc.hacky.model.Transaction;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public HttpEntity<Transaction> greeting(
            @RequestParam(value = "name", required = false, defaultValue = "World") String name) {

        Transaction transaction = new Transaction();
        transaction.setDescription("foo");
        transaction.setName(name);
        transaction.setTransactionId("fooId");
        transaction.add(linkTo(TransactionController.class).slash(transaction.getTransactionId()).withSelfRel());

        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }
}
