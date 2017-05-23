const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} - ${req.originalUrl}`;
	console.log(log);
	fs.appendFile('server.log', log + "\n", (err) => {
		if(err) {
			console.log("Unable to append to server.log file.");
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
	res.render('index.hbs', {
		pageTitle: "Home Page",
		welcomeMessage: "Welcome to the Home Page of NodeJS tutorial"
	});
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
		pageTitle: "About Page",
	});
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "This is an error message"
    });
});

app.listen(3000, () => {
	console.log("App is running on port 3000");
});
