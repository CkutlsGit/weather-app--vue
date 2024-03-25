import axios from "axios";

export default defineEventHandler( async (event) => {

    const { city } = getQuery(event)

    const options = {
        method: 'GET',
        url: 'https://ai-weather-by-meteosource.p.rapidapi.com/daily',
        params: {
            place_id: city,
            language: 'en',
            units: 'metric'
        },
        headers: {
            'X-RapidAPI-Key': '6a3322dd6amsh0b99e3eb3aa1b2cp1b4ea2jsnfd98a3c5d3b8',
            'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options)
        return response.data
    }
    catch (error) {
        console.error(error)
    }
})