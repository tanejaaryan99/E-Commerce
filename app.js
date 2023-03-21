const express = require('express');
const app = express();
let path = require('path');
const mongoose = require('mongoose');
let ejsMate = require('ejs-mate');
var methodOverride = require('method-override');





mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/ECommerceDB')
    .then(() => { console.log("DB connected") })
    .catch((err) => { console.log(err) })


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); //static files


let port = 5000;
app.listen(port, () => {
    console.log(`server connected at port ${port}`)
})