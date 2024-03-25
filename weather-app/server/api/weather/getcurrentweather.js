import axios from "axios";

export default defineEventHandler( async (event) => {

    const { city } = getQuery(event)
    const { APIKey, APIHost } = useRuntimeConfig()

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
            'X-RapidAPI-Key': `${ APIKey }`,
            'X-RapidAPI-Host': `${ APIHost }`
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