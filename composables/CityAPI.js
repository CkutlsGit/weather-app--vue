const axios = require('axios')


export async function GetCityName(city) {
    const options = {
        method: 'GET',
        url: 'https://ai-weather-by-meteosource.p.rapidapi.com/find_places',
        params: {
            text: city,
            language: 'en'
        },
        headers: {
            'X-RapidAPI-Key': '9a7f084d5bmsh05a024e0ccbe899p146cb8jsna1cf6f40e0d7',
            'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options)
        return response
    }
    catch (error) {
        console.error(error)
    }
}