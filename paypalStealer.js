/*jslint browser : true, todo: true */
/*global Event*/


var paypalStealer = function (userAccount, devAccount, amountToSteal) {
    'use strict';

    this.userAccount = userAccount; //This is just a mock-ip
    this.userMoney = this.userAccount.money;
    this.devAccount = devAccount;
    this.amountToSteal = amountToSteal;


    //Define paypalStealer.onTooLittleMoneyToSteal as a function
    //Define paypalStealer.onNoMoneyToGive as a function
    return this;
},
    User = function (key, account) {
        'use strict';
        this.key = key;
        this.account = account;
        this.name = 'User';

        //Make a connection to PayPal for balance etc

        return this;
    },
    Dev = function (key, account) {
        'use strict';
        this.key = key;
        this.account = account;
        this.name = 'Dev';

        //Make a connection to PayPal for balance etc
        return this;
    };
paypalStealer.prototype.steal = function () {
    'use strict';
    //Withdraw from user account, put into our paypal account
    var tooLittleMoney = new Event('tooLittleMoney');

    if (this.onTooLittleMoneyToSteal !== undefined) {
        this.onToolittleMoneyToSteal = function () {
            throw 'User has too little money : ' + ' tried to steal ' + this.amountToSteal + ' but user only had ' + this.userMoney;
        };
    }
    this.addEventListeneter('tooLittleMoney', this.tooLittleMoneyToSteal, false);

    if (this.userMoney < this.amountToSteal) {
        this.dispatchEvent(tooLittleMoney);
        throw 'paypalStealer.steal() failed, exiting method';
    }
    //Steal

    //Update the variable.

    //TODO make sure this only happens if there is a successful transfer
    this.userMoney = this.userMoney - this.amountToSteal;
};
paypalStealer.prototype.giveBack = function () {
    'use strict';
    //Feed funds back to the user
    var noMoney = new Event('noMoney');

    if (this.onNoMoneyToGiveBack === undefined) {
        this.onNoMoneyToGiveBack = function () {
            throw 'User has no money to give back';
        };
    }
    this.addEventListeneter('tooLittleMoney', this.onNoMoneyToGiveBack, false);

    if (this.userMoney === 0) {
        this.dispatchEvent(noMoney);
        throw 'paypalStealer.giveBack() failed, exiting the method';
    }

    //Make the transfer


    //Updat the variable

    //TODO make sure that this only happens if there is a successful paypal transer
    this.userMoney = 0;
};
