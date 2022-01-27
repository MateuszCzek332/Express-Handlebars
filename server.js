var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")
var hbs = require('express-handlebars');
const { all } = require("express/lib/application");
const e = require("express");

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main-loged.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.use(express.urlencoded({
    extended: true
}));

let users = [
    {id:1, login:123, pass:123, wiek:12, uczen:"on", plec:"m"},
    {id:2, login:234, pass:234, wiek:23, uczen:"on", plec:"k"},
    {id:3, login:345, pass:345, wiek:34, uczen:undefined, plec:"m"}
];
let islog = true;

app.get("/", function (req, res) {
    res.render('main.hbs');
})

app.get("/login", function (req, res) {
    res.render('login.hbs');
})

app.post("/handlePost2", function (req, res) {
    for(i=0; i<users.length; i++){
        if(users[i].login == req.body.login && users[i].pass == req.body.password){
            islog = true;
            app.engine('hbs', hbs({ defaultLayout: 'main-loged.hbs' }));
            res.render("main.hbs")
            return;
        }
    }

    res.send("Błędny login i/lub hasło");

})

app.get("/logout", function (req, res) {
    islog = false;
    app.engine('hbs', hbs({ defaultLayout: 'main-unloged.hbs' })); 
    res.render('main.hbs');
})

app.get("/register", function (req, res) {
    res.render('register.hbs');
})

app.post("/handlePost", function (req, res) {
    for(i=0; i<users.length; i++){
        if(users[i].login == req.body.login){
            res.send("Użytkownik o takim loginie już istnieje")
            return;
        }
    }

    users.push({
         id:users.length +1,
         login:req.body.login, 
         pass:req.body.password, 
         wiek:req.body.age, 
         uczen:req.body.uczen, 
         plec:req.body.gender
        })
    res.render("register.hbs")

})

app.get("/admin", function (req, res) {
    if(islog)
        res.render('admin.hbs');
    else
        res.send('Najpierw musisz się zalogowac')

})

app.get("/show", function (req, res) {
    let context = {
        subject:" Wszyscy użytkownicy",
        users1: users,
    }
    res.render("show.hbs", context)
})

app.get("/sort", function (req, res) {

    let context = {
        subject:"Sortowanie względem wieku",
        sort: undefined,
        usersA: users.sort(function (a, b) {
            if(req.query.sort == "r")
                return parseFloat(a.wiek) - parseFloat(b.wiek);
            else
                return parseFloat(b.wiek) - parseFloat(a.wiek);
        }),
    }

    if(req.query.sort == "r")
    context.sort = "r";

    res.render('sort.hbs', context);
})

app.get("/gender", function (req, res) {

    let context = {
        subject: "Podział ze wzgledu na płeć",
        male: [],
        female:[],
    }

    for(i=0; i<users.length; i++){
        if(users[i].plec == "m")
            context.male.push(users[i])
        else
            context.female.push(users[i])
    }

    res.render('gender.hbs', context);
})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})