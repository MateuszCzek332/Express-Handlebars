var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")
var hbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main-loged.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

let users = [
    {id:1, login:123, pass:123, wiek:12, uczen:"checked", plec:"m"},
    {id:2, login:234, pass:234, wiek:23, uczen:"checked", plec:"k"},
    {id:3, login:345, pass:345, wiek:34, uczen:"unchecked", plec:"m"}
];
let islog = true;

app.get("/", function (req, res) {
    res.render('main.hbs');
})

app.get("/login", function (req, res) {
    res.render('login.hbs');
})

app.get("/logout", function (req, res) {
    islog = false;
    app.engine('hbs', hbs({ defaultLayout: 'main-unloged.hbs' })); 
    res.render('main.hbs');
})

app.get("/register", function (req, res) {
    res.render('register.hbs');
})

app.get("/admin", function (req, res) {

    if(islog){

        res.render('admin.hbs', { layout: "main-loged.hbs" });
    }
    else{
        res.send('Najpier musisz się zalogowac')
    }

})

app.get("/show", function (req, res) {
    res.render('show.hbs');
})

app.get("/sort", function (req, res) {
    res.render('sort.hbs');
})

app.get("/gender", function (req, res) {
    res.render('gender.hbs');
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})