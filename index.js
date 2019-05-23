var express = require('express');
var motorRender = require('express-handlebars');

var fs = require('fs');

var app = express();

app.use(express.static('public'));

app.engine('handlebars', motorRender());
app.set('view engine', 'handlebars');

app.get('/carrito', function(request, response){
    response.render('carrito',{});
    });