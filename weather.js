const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https")
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}))
app.get("/", (req, response)=>{
    response.sendFile(__dirname + "/weather.html");
})

app.post("/", (request,response)=>{
    console.log(process.env.API_KEY)
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+request.body.cname+"&appid=" + process.env.API_KEY + "&units=metric";
    https.get(url, (res)=>{
        res.on("data",(data)=>{
            let WeatherInfo = JSON.parse(data);
            response.write("<div style='background-color: #0093E9; background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%); margin: -1%; height: 100vh;'><div style='height: 30%';></div><img style='display: block;margin-left: auto;margin-right: auto;' src='http://openweathermap.org/img/wn/"+WeatherInfo.weather[0].icon+"@2x.png'/><h1 style='font-family:verdana;text-align:center'>It's " + WeatherInfo.weather[0].main + " in " + WeatherInfo.name + " with a temperature of " + WeatherInfo.main.temp + ".<h1></div>");
        })
    })
})
app.listen(3000, ()=>{
    console.log("Server Running");
})