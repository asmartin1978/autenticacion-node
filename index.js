// file: index.js

var express = require("express");
var bodyParser = require("body-parser");


var passport = require("passport");

var app = express();


//Importamos la estrategia
var auth     = require('./auth');

//Le decimos a passport que la use
passport.use(auth.strategy);


app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())

app.get("/", function(req, res) {
  res.json({message: "Express is up!"});
});



//Ruta para el login 

app.post("/login", function(req, res) {
  //Pillamos parametros del request
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }

  return auth.autenticar(name, password, res);

});


//Ruta protegida
app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Success! You can not see this without a token");
});


app.listen(3000, function() {
  console.log("Express running");
});