var express = require('express');

var app = express();

app.get("/", function(req, res){
    res.send("hello how are you");
})

app.listen(8080, function(){
    console.log("listening to port 8080")
});