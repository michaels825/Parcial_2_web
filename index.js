var express = require('express');

var motorRender = require('express-handlebars');
var exphbs = require('express-handlebars');


var fs = require('fs');

var app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/inicio', function(request, response){
    response.render('main',{layout:false});
    });

app.get('/nosotros', function(request, response){
        response.render('nosotros',{layout:false});
        });
 
app.listen(5000, function() {
    console.log('Aplicación, escuchando el puerto 5000!');
  });