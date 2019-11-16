'use strict';

var fs = require('fs');

fs.readFile('test_1_191116/sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});