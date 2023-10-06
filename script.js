let data = []

function cityData() {
    let dataList = document.getElementById("datalistOptions");
    let cityData = [
        "Bangkok",
        "Nakhon Si Thammarat",
        "London",
        "Paris",
        "Tokyo",
        "New York",
        "Dubai",
        "Singapore",
        "Hong Kong",
    ]

    cityData.forEach((city) => {
        dataList.innerHTML += `<option value="${city}">`;
    }
    )
}

cityData();

async function searchData() {
    let search = document.getElementById("searchInput").value;
    const apiKey = "4b7014edd438622eb1ab38a5a9c1d738";

    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`);
        data = await response.json();
        appendData();
    } catch (error) {
        console.log(error);
    }
}

function appendData() {
    let mainData = document.getElementById("data");
    let icon = data.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
    let temp = Math.round(data.main.temp - 273.15) + "°C";
    let tempMax = Math.round(data.main.temp_max - 273.15) + "°C";
    let tempMin = Math.round(data.main.temp_min - 273.15) + "°C";

    mainData.innerHTML = `
    <div class="card text-center px-5 py-3">
        <h2>${data.name}</h2>
        <div class="d-flex flex-row justify-content-center">
            <img src="${iconUrl}" alt="weather icon" style="min-width: 200px;">
        </div>
        <h1>${temp}</h1>
        <h4>${data.weather[0].main}</h4>
        <div class="d-flex flex-row justify-content-around">
            <div class="text-start mx-2">
                <h4>${tempMax}</h4>
                <h6>Max temp</h6>
                <h4>${data.main.humidity} %</h4>
                <h6>Humidity</h6>
            </div>
            <div class="text-start mx-2">
                <h4>${tempMin}</h4>
                <h6>Min temp</h6>
                <h4>${data.wind.speed} Km/h</h4>
                <h6>Wind speed</h6>
            </div>
        </div>
    </div>
    `
}