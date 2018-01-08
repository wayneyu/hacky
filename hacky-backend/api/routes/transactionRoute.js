'use strict';

module.exports = function (app) {

    var transactionController = require('../controllers/transactionController');

    app.route('/transactions')
        .get(transactionController.getTransactions);

};
