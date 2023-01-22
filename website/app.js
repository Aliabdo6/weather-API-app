/* Global Variables */

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let key = '37754d4b53a0571f4274d02b3784b2aa';

// Create a new date instance dynamically with JS

const newDate = new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

document.getElementById('generate').addEventListener('click', () => {
    const postCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);

    getTemperature(baseURL, postCode, key)
        .then(weatherData => {
            return postData('http://localhost:8080/addWeatherData', { temperature: weatherData.main.temp, date: newDate, user_response: feelings });
        })
        .then(_postResponse => {
            updateUI();
        })
        .catch(error => {
            console.log(error);
        });
});

const getTemperature = async (baseURL, code, key) => {
    try {
        const url = `  ${baseURL}${code},us&APPID=${key}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

const postData = async (url, data) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return newDate;
    } catch (error) {
        throw new Error(error);
    }
}


const updateUI = async () => {
    try {
        const request = await fetch('http://localhost:8080/all');
        const allData = await request.json();
        document.querySelector('#date').textContent = allData.date;
        document.querySelector('#temp').textContent = allData.temperature;
        document.querySelector('#content').textContent = allData.user_response;
    } catch (error) {
        console.error('Error:', error);
    }
}
