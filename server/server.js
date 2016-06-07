//modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var watson = require('watson-developer-cloud');




//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


/////////WATSON personality_insights
var personality_insights = watson.personality_insights({
  username: 'Username-From-Watson-Platform',
  password: 'Password-From-Watson-Platform',
  version: 'v2'
});



app.post('/textanal', function(req, res) {


console.log(req.body.message);
res.header('Access-Control-Allow-Origin', '*');


var obj = {"contentItems": [
  {
    "content" : req.body.message
  }]};
  console.log(obj);

personality_insights.profile(obj, function(error, response) {
  if (error)
    console.log('error:', error);
  else
  {
    console.log(JSON.stringify(response, null, 2));

    var jsonFiles = ["Drama.json", "Art.json", "Aviation.json", "Business.json", "ComputerScience.json", "Education.json", "EnglishLiterature.json", "Kinisiology.json", "Law.json", "MechanicalEngineering.json"];
    var min = 100;
    var diff = [];
    var j = 0;
    var match = [];

    for (var i = 0; i < 10; i ++) {
      diff[i] = compareMaj(response, jsonFiles[i]);
    }
                           
    match = [diff[9], diff[8], diff[7]];
  }
  res.send(JSON.stringify(match));

  }
);


});



function compareMaj(obj, fileName){
  var file = require("./majors/" + fileName);
  console.log("**************************8");
  var diff = 0;
  var val = [0, 0];
  var num = [1, 4, 3];

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 5; j++) {
      val[0] += (file.tree.children[0].children[0].children[num[i]].children[j].percentage + file.tree.children[0].children[0].children[num[i]].children[j + 1].percentage);
      val[1] += (obj.tree.children[0].children[0].children[num[i]].children[j].percentage + obj.tree.children[0].children[0].children[num[i]].children[j + 1].percentage);
    }
}
    console.log(val[0]);
    console.log(val[1]);


    diff = Math.abs(val[0] - val[1]);
    console.log("dif == " + diff);

    var retObj = {"major": fileName.replace(".json", ""), "score": diff };
    return retObj;
}


app.listen(3000,function(){
  console.log("running app on port 3000");
});
