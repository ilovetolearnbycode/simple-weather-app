const express = require('express');
require('dotenv').config();
const fetch = require('node-fetch');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.listen(PORT,()=>console.log('listening on the port: '+PORT));


app.get('/',(req,res)=>{
    res.send('this is a sample route!');
});

app.post('/sendData',(req,res)=>{
    const {cityname} = req.body;
    const base_url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${process.env.SECRET_KEY}&unit=celcius`;
    // console.log(base_url);
    // fetch the url
    fetch(base_url)
    .then(response=>response.json())
    .then(weatherData=>{
        if(weatherData.cod == 200){
            weatherData.status = 'success'; 
        }else{
            weatherData.status = "failure";
        }
         res.send(weatherData)
    })
});