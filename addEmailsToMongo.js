/*jslint node: true */
/*global */

var MongoClient = require('mongodb').MongoClient,
    Hashids = require('hashids'),
    hashids = new Hashids('iknowthisisntagoodsalt');

MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
    'use strict';
    if (err) { return err; }
    var collection = db.collection('values'),
        users = collection.findAll(),
        emails = [
            'mailinator@ill.be.b.ack',
            'bruce-mailis@yippe-ki-yeah.com',
            'sylvester@mail.one'
        ];
    users.forEach(function (currentUser) {
        var randEmail = emails[Math.floor(Math.random() * emails.length)],
            emailHash = hashids.encrypt(randEmail);
        currentUser.email = emailHash;
        console.log(emailHash);
    });
});
