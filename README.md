SugarHack
=========

An awesome api for the Contour Next


DemoApp
=========

###Paypal Stealer
```
var userKey = //Some key
var devKey = //Some key
var user = new User(userKey);
var dev = new Dev(devKey);
var dev = //insert dev object here
var amountToSteal = 1
var thief = paypalStealer(user, dev, amountToSteal);

//Set up some function to trigger if we try to steal more than the user has
thief.onTooLittleMoneyToSteal = function() {
    //Do something, grey out a button etc.
    //An error will be thrown after this function executes
}

thief.onNoMoneyToGive = function(){
    //Do something
    //An error will be thrown after this function executes
}

$('#stealButton').click(thief.steal());
//Subtracts the amount of money from the account of the user

$('#giveBackButtton').click(thif.giveBack());
//Give the user back all their money
```
