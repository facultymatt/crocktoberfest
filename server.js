/**
* Add express to package.json
* Keep the app.get('*') for nice sinlge page app support
*
*/
 
var express = require("express"),
  app = express(),
  port = parseInt(process.env.PORT, 10) || 4567;
 
app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/dist'));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(app.router);
});
 
// send all non-api requests to our main index.html page, which starts our app
// this is a nice way to support non hash links on single page apps... and why we started using
// angular and genesis in the first place <3
app.get('*', function(req, res, next) {
  res.redirect('/#' + req.url);
});
 
app.listen(port, function() {
  console.log("Express server listening on port " + port);
});