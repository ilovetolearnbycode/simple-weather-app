let modal = document.querySelector('.modal');
let form = document.querySelector('form');
let submitBtn = document.querySelector('#submit');
let closeModal = document.querySelector('#closeModal');
let weatherSpan = document.querySelector('#weather');
let celciusSpan = document.querySelector('.celcius');
let fahrenheitSpan = document.querySelector('.fahrenheit');
// let temp = document.querySelector('#temp');
let windSpan = document.querySelector("#wind");
let countryName = document.querySelector('#countryName');
let dangerModal = document.querySelector('.danger');

submitBtn.addEventListener('click',e=>{
    e.preventDefault();
    let cityname = document.querySelector('#cityName').value;
    let data = {
        cityname,
    }
    const options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
    };
    fetch('/sendData',options)
    .then(response=>response.json())
    .then(returnData=>{
        console.log(returnData);
        if(returnData.status === "success"){
            countryName.textContent = data.cityname;
            let tempinF = returnData.main.temp;
            let tempinC = toCelcius(Number(tempinF));
            let windSpeed = returnData.wind.speed  + 'miles/hr';
            let weather = returnData.weather[0].description;
            celciusSpan.textContent = tempinC + "°C";
            windSpan.textContent = windSpeed;
            weatherSpan.textContent = weather;
            modal.style.display = "flex";
        }else{
            dangerModal.style.display = "block";
            setTimeout(()=>{
                dangerModal.style.display = "none";
            },1000);
        }
    });
    form.reset();
});
closeModal.addEventListener('click',e=>{
    e.preventDefault();
    modal.style.display = "none";
});

function toCelcius(fah){
    fah = Number(fah);
    return ((fah-32)*5)/9;
}