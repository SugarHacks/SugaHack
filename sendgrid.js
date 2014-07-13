var sendgrid  = require('sendgrid')('user_id', 'pw');


var email     = new sendgrid.Email({
  to:       [user.email],
  toname:   [user.name],
  from:     'bot@sugahack.me',
  subject:  'Busy busy?',
  date:     new Date(),
  html:     '<p>Hello Amin<br>Have you been busy the last couple of days?<br>We noticed that you did not plug your Contour USB in the last two days<br>you probably should do so.<br>Happy sugahacking! </p>',
});

//if (last upload is > 2 days) then: 

sendgrid.send(email, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});