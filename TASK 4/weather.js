let API_key = "d57d07049944a25a3ee286f80f452484";
let city = document.getElementById("city");
let temp = document.getElementById("temp");
let image = document.getElementById("img");
let type = document.getElementById("type");
let humidity = document.getElementById("humidity"); // New element
let wind = document.getElementById("wind"); // New element
let input = document.getElementById("inp");

const data = async function(search) {
    try {
        let getData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}&units=metric`);
        let jsonData = await getData.json();
        
        if (jsonData.cod == 400) {
            alert("Please Enter Location");
            image.src = "error1.png";
            city.innerHTML = "";
            temp.innerHTML = "";
            type.innerHTML = "";
            humidity.innerHTML = "";
            wind.innerHTML = "";
            return;
        }
        
        if (jsonData.cod == 404) {
            alert("Please Enter a Valid Location");
            image.src = "error2.png";
            city.innerHTML = search;
            temp.innerHTML = "";
            type.innerHTML = "";
            humidity.innerHTML = "";
            wind.innerHTML = "";
            return;
        }

        city.innerHTML = search;
        temp.innerHTML = Math.floor(jsonData.main.temp) + "°C";
        type.innerHTML = jsonData.weather[0].main;
        humidity.innerHTML = "Humidity: " + jsonData.main.humidity + "%"; // Display humidity
        wind.innerHTML = "Wind Speed: " + jsonData.wind.speed + " m/s"; // Display wind speed

        switch (type.innerHTML) {
            case "Clouds":
                image.src = "clouds.png";
                break;
            case "Clear":
                image.src = "clears.png";
                break;
            case "Rain":
                image.src = "rain.png";
                break;
            case "Snow":
                image.src = "snow.png";
                break;
            case "Haze":
                image.src = "haze.png";
                break;
            case "Storm":
                image.src = "storm.png";
                break;
            default:
                image.src = "clouds.png";
        }

        input.value = "";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching weather data.");
    }
}

function myFun() {
    let search = input.value;
    data(search);
}
