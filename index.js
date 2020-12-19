var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req,res){
	res.json({message:'hooray! Welcome to our API!'})
})

router.get('/:dt', function(req,res){

	// dt is a number (use isNaN (not a number) == false)
	// how to create a Date and Time from a unix timestamp in JS

	if (!isNaN(req.params.dt)){
		res.json({ "unix": req.params.dt, 
			"natural": new Date(req.params.dt * 1000) })
	}
	// :dt is a date
	else if (!isNaN(new Date(req.params.dt).getTime()) ){
		res.json({ "unix": new Date(req.params.dt).getTime()/1000, 
			"natural": req.params.dt})
	}
	else {
    // dt is rubbish -> something that i cannot use
    res.json({ "unix": null, "natural": null })
}

});
app.listen(port)
app.use(router);
