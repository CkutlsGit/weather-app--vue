const axios = require('axios')

export async function GetCurrentWeather(city) {
    const options = {
        method: 'GET',
        url: 'https://ai-weather-by-meteosource.p.rapidapi.com/current',
        params: {
            place_id: city,
            timezone: 'Europe/Moscow',
            language: 'en',
            units: 'metric'
        },
        headers: {
            'X-RapidAPI-Key': '9a7f084d5bmsh05a024e0ccbe899p146cb8jsna1cf6f40e0d7',
            'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options)
        return response
    }
    catch (error) {
        console.error(error)
    }
}

export async function GetDatesWeather(city) {
    const options = {
        method: 'GET',
        url: 'https://ai-weather-by-meteosource.p.rapidapi.com/daily',
        params: {
            place_id: city,
            language: 'en',
            units: 'metric'
        },
        headers: {
            'X-RapidAPI-Key': '9a7f084d5bmsh05a024e0ccbe899p146cb8jsna1cf6f40e0d7',
            'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options)
        return response
    }
    catch (error) {
        console.error(error)
    }
}