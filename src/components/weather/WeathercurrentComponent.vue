<template>
  <div class="weather-current">
    <h1 class="text-white">{{ cityCurrent }}</h1>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import {eventBus} from "@/main";
import {GetCurrentWeather} from "../../../composables/WeatherAPI";

export default {
  props: ['city'],
  setup(props) {
    const cityCurrent = ref('')
    const WeatherinCity = ref('')

    watch(() => props.city, async newValue => {
      cityCurrent.value = newValue

      const response = await GetCurrentWeather(cityCurrent.value)
      const data = {
        summary: response.data.current.summary,
        temperature: response.data.current.temperature,
        icon_num: response.data.current.icon_num
      }

      WeatherinCity.value = data

      console.log(WeatherinCity)
    })

    onMounted(() => {
      eventBus.on('getcity', async (cityUpdate) => {
        cityCurrent.value = cityUpdate

        const response = await GetCurrentWeather(cityUpdate)
        const data = {
          summary: response.data.current.summary,
          temperature: response.data.current.temperature,
          icon_num: response.data.current.icon_num
        }

        WeatherinCity.value = data
      })
    })



    return { cityCurrent, WeatherinCity }
  }
}
</script>

<style>

</style>