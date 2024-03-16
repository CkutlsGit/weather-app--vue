<template>
  <div class="weather-current flex justify-center">
    <div class="weather-current__content bg-dark-blue text-center text-white my-16 w-2/12 rounded-md max-sm:w-6/12">
      <h2 class="text-lg font-bold capitalize my-2">{{ cityCurrent }}</h2>
      <div class="weather-current__info flex flex-col justify-center text-base font-medium">
        <img class="mx-auto w-12 h-12" :src="imgSrc" :alt="WeatherinCity.summary">
        <h2 class="mt-1">{{ WeatherinCity.summary }}</h2>
        <h2 class="my-2">{{ WeatherinCity.temperature }} °C</h2>
      </div>
    </div>
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
    const imgSrc = ref('')

    watch(() => props.city, async newValue => {
      cityCurrent.value = newValue
      const response = await GetCurrentWeather(newValue)

      WeatherinCity.summary = response.data.current.summary
      WeatherinCity.temperature = response.data.current.temperature.toFixed(0)
      WeatherinCity.icon_num = response.data.current.icon_num

      imgSrc.value = require('@/assets/img/icons-weather/' + WeatherinCity.icon_num + '.png')
    })

    onMounted(() => {
      eventBus.on('getcity', async (cityUpdate) => {
        cityCurrent.value = cityUpdate
        const response = await GetCurrentWeather(cityUpdate)

        WeatherinCity.summary = response.data.current.summary
        WeatherinCity.temperature = response.data.current.temperature.toFixed(0)
        WeatherinCity.icon_num = response.data.current.icon_num

        imgSrc.value = require('@/assets/img/icons-weather/' + WeatherinCity.icon_num + '.png')
      })
    })

    return { cityCurrent, WeatherinCity, imgSrc }
  }
}
</script>

<style>

</style>