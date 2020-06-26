
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

// --> 7)  Mount the Logger middleware here
/** 7) Root-level Middleware - A logger */
var middleware = function (req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  // Call the next function in line:
  next();
}
//  place it before all the routes !
app.use('/',middleware);


// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


/** 3) Serve an HTML file */


/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
/** 6) Use the .env file to configure the app */
app.get("/json",function(req,res){
   if (process.env.MESSAGE_STYLE == "uppercase") {
   res.json({"message": "Hello json".toUpperCase()});
  } else {
  res.json({"message": "Hello json"});
}
});

 
/** 8) Chaining middleware. A Time server */
app.get("/now",function(req,res,next){
  req.time = new Date().toString();
  next();
},function(req,res){
  res.send({time:req.time});
});

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo",(req,res,next)=>{
  res.send({echo: req.params.word});
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name",(req,res)=>{
  var firstname = req.query.first;
  var lastname = req.query.last;
  res.json({name: `${firstname} ${lastname}`});
});
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** 12) Get data form POST  */
app.post("/name",(req,res)=>{
  var firstname = req.body.first;
  var lastname = req.body.last;
  res.json({name: `${firstname} ${lastname}`});
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
