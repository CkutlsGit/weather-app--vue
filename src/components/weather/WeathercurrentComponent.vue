<template>
  <div class="weather-current text-white">
    <h1>{{ cityCurrent }}</h1>
    <h1>{{ WeatherinCity.summary }}</h1>
    <h1>{{ WeatherinCity.temperature }}</h1>
    <h1>{{ WeatherinCity.icon_num }}</h1>
  </div>
</template>

<script>
import {onMounted, ref, reactive, watch} from "vue";
import {eventBus} from "@/main";
import {GetCurrentWeather} from "../../../composables/WeatherAPI";

export default {
  props: ['city'],
  setup(props) {
    const cityCurrent = ref('')
    const WeatherinCity = reactive({
      summary: '',
      temperature: '',
      icon_num: ''
    })

    watch(() => props.city, async newValue => {
      cityCurrent.value = newValue
      const response = await GetCurrentWeather(cityCurrent.value)

      WeatherinCity.summary = response.data.current.summary
      WeatherinCity.temperature = response.data.current.temperature
      WeatherinCity.icon_num = response.data.current.icon_num
    })

    onMounted(() => {
      eventBus.on('getcity', async (cityUpdate) => {
        cityCurrent.value = cityUpdate
        const response = await GetCurrentWeather(cityUpdate)

        WeatherinCity.summary = response.data.current.summary
        WeatherinCity.temperature = response.data.current.temperature
        WeatherinCity.icon_num = response.data.current.icon_num
      })
    })



    return { cityCurrent, WeatherinCity }
  }
}
</script>

<style>

</style>