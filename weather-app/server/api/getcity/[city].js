import axios from "axios";

export default defineEventHandler( async (event) => {

    const { city } = event.context.params
    const { APIKey, APIHost } = useRuntimeConfig()

    const options = {
        method: 'GET',
        url: 'https://ai-weather-by-meteosource.p.rapidapi.com/find_places',
        params: {
            text: city,
            language: 'en'
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
