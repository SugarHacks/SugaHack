/*jslint node: true */
/*global */

var MongoClient = require('mongodb').MongoClient,
    Hashids = require('hashids'),
    hashids = new Hashids('iknowthisisntagoodsalt');

MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
    'use strict';
    if (err) { return err; }
    var collection = db.collection('values'),
        users = collection.find(),
        emails = [
            'mailinator@ill.be.b.ack',
            'bruce-mailis@yippe-ki-yeah.com',
            'sylvester@mail.one'
        ];
    function edit(user) {
        var randEmail = emails[Math.floor(Math.random() * emails.length)],
            emailHash = hashids.encrypt(randEmail);
        user.email = emailHash;


        if (user.hasNext()) {
            edit(user.next());
        } else {
            console.log('done');
        }
    }
    edit(users);
});
