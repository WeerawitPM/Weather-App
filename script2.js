let data = [];

async function searchData() {
    let latitude = document.getElementById("latitude").value;
    let longitude = document.getElementById("longitude").value;
    const apiKey = "4b7014edd438622eb1ab38a5a9c1d738";

    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=current&appid=${apiKey}`);
        data = await response.json();
        appendData();
    } catch (error) {
        console.log(error);
    }
}

function appendData() {
    let mainData = document.getElementById("data");
    let iconUrl;
    let temp = Math.round(data.main.temp - 273.15) + "°C";
    let tempMax = Math.round(data.main.temp_max - 273.15) + "°C";
    let tempMin = Math.round(data.main.temp_min - 273.15) + "°C";

    switch (data.weather[0].main) {
        case "Clouds":
            iconUrl = "https://cdn-icons-png.flaticon.com/512/3222/3222800.png"; //มีเมฆมาก
            break;
        case "Clear":
            iconUrl = "https://cdn-icons-png.flaticon.com/512/6974/6974833.png"; //อากาศแจ่มใส
            break;
        case "Rain":
            iconUrl = "https://cdn-icons-png.flaticon.com/512/8841/8841317.png"; //ฝนตก
            break;
        case "Snow":
            iconUrl = "https://cdn-icons-png.flaticon.com/512/2315/2315309.png"; //หิมะ
            break;
        case "Thunderstorm":
            iconUrl = "https://cdn-icons-png.flaticon.com/512/1779/1779927.png"; //ฝนฟ้าคะนอง
            break;
        case "Drizzle":
            iconUrl = "https://cdn-icons-png.flaticon.com/512/3075/3075858.png"; //ฝนตกปรอย ๆ
            break;
        default:
            iconUrl = "https://cdn-icons-png.flaticon.com/512/1779/1779807.png";
    }

    mainData.innerHTML = `
    <div class="card text-center px-5 py-3">
        <h2>${data.name}</h2>
        <div class="d-flex flex-row justify-content-center">
            <img src="${iconUrl}" alt="weather icon" style="max-width: 200px;">
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