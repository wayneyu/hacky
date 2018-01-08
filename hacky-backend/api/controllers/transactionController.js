'use strict';

exports.getTransactions = function (req, res) {

    var dummyTransaction = {
        id: 'foo',
        description: 'bar'
    };

    res.json(dummyTransaction);
};

