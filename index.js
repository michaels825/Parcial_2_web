var express = require('express');

var motorRender = require('express-handlebars');
var exphbs = require('express-handlebars');


var fs = require('fs');

var app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var visitas = {};

visitas.general = [];

visitas.registro = [];

fs.readFile(__dirname + '/registro.txt', (err, data) => {
    if (err) {

    } else {
        visitas = JSON.parse(data);
    }

});





function registrarVisita(url) {
    if (visitas.general.length != 0) {
        let encontrado = false;

        visitas.general.forEach((v, index) => {
            if (v.url == url) {
                v.visitas++;
                let vis = v.visitas;
                encontrado = true;
                visitas.registro.push({ url: url, visitas: vis, fecha: new Date() });
            }
        });
        if (encontrado == false) {
            visitas.general.push({ url: url, visitas: 1, fecha: new Date() });
            visitas.registro.push({ url: url, visitas: 1, fecha: new Date() });
        }

    } else {
        visitas.general.push({ url: url, visitas: 1, fecha: new Date() });
        visitas.registro.push({ url: url, visitas: 1, fecha: new Date() });
    }

    fs.writeFile('registro.txt', JSON.stringify(visitas), 'utf8', function () { });
}

app.get('/inicio', function (request, response) {
    response.render('main', { layout: false });
    registrarVisita("inicio");
});

app.get('/nosotros', function (request, response) {
    response.render('nosotros', { layout: false });
    registrarVisita("nosotros");
});

app.get('/admin', function (request, response) {
    response.render('admin', { layout: false , visitas:visitas});
    registrarVisita("admin");
});

app.get('/contacto', function (request, response) {
    response.render('contacto', { layout: false });
    registrarVisita("contacto");
});

app.listen(5000, function () {
    console.log('Aplicación, escuchando el puerto 5000!');
});