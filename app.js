const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser")
const request = require("request");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index")
});

app.post("/", (req, res) => {

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
   var options = {
       url: "https://apiv2.bitcoinaverage.com/convert/global",
       method: "Get",
       qs: {
           from: crypto,
           to: fiat,
           amount: req.body.amount
       }
   }
    

    request(options, (err, response, body) => {
        var data = JSON.parse(body);
        var price = data.price;
        console.log(price);

        res.render("response", {
            crypto: req.body.crypto,
            price: data.price,
            fiat: req.body.fiat
        })
    })
})

app.listen(3000, () => {
    console.log("App running at port 3000");
})