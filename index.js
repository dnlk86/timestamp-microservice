var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date_string?", function (req, res) {
  let date_string = req.params.date_string;
  let unixDate;
  let utcDate;
  if (date_string) {
    if (/\-/g.test(date_string)) {
      utcDate = new Date(date_string);
      unixDate = utcDate.getTime();
    } else {
      unixDate = Number(date_string);
      utcDate = new Date(unixDate);
    }
  } else {
    unixDate = Date.now();
    utcDate = new Date(unixDate);
  }
  if (!unixDate) {
    res.json({error: "Invalid Date"});
  } else {
    res.json({unix: unixDate, utc: utcDate.toUTCString()});
  }
})

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
