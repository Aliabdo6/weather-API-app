const apiKey = '37754d4b53a0571f4274d02b3784b2aa&units=imperial';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const postUrl = 'http://localhost:8080/addWeatherData';
const allDataUrl = 'http://localhost:8080/all';

document.getElementById('generate').addEventListener('click', async () => {
    const postCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const date = new Date().toString().substr(0, 15);
    // const date = new Date().toISOString().split("T")[0];
    try {
        const weatherData = await fetchWeather(apiUrl, postCode, apiKey);
        postWeatherData(postUrl, { temperature: weatherData.main.temp, date: date, user_response: feelings }).then(() => {
            console.log('done');
        });

        updateWeatherUI(allDataUrl);
    } catch (error) {
        console.log(error);
    }
});

const fetchWeather = async (baseUrl, zip, key) => {
    const url = `${baseUrl}${zip},us&APPID=${key}`;
    const response = await fetch(url);
    return await response.json();
}

const postWeatherData = async (url, data) => {
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

const updateWeatherUI = async (url) => {
    const request = await fetch(url);
    const allData = await request.json();
    document.querySelector('#date').textContent = allData.date;
    document.querySelector('#temp').textContent = allData.temperature;
    document.querySelector('#content').textContent = allData.user_response;
}
