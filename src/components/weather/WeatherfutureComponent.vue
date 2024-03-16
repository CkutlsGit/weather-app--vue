<template>
  <div class="weather-future">

  </div>
</template>

<script>
import {onMounted, reactive, ref, watch} from "vue";
import {eventBus} from "@/main";
import {GetDatesWeather} from "../../../composables/WeatherAPI";

export default {
  props: ['city'],
  setup(props) {
    const cityCurrent = ref('')
    const WeatherDatesinCity = reactive({})

    watch(() => props.city, async newValue => {
      cityCurrent.value = newValue
      const response = await GetDatesWeather(newValue)

      let data = []

      for (let i = 0; i < 7; i++) {
        data.push({
          date: response.data.daily.data[i].day,
          summary: response.data.daily.data[i].summary,
          temperature: response.data.daily.data[i].temperature,
          icon_path: require('@/assets/img/icons-weather/' + response.data.daily.data[i].icon + '.png')
        })
      }

      Object.assign(WeatherDatesinCity, data)
      console.log(WeatherDatesinCity)
    })

    onMounted(() => {
      eventBus.on('getcity', async (cityUpdate) => {
        cityCurrent.value = cityUpdate
        const response = await GetDatesWeather(cityUpdate)

        let data = []

        for (let i = 0; i < 7; i++) {
          data.push({
            date: response.data.daily.data[i].day,
            summary: response.data.daily.data[i].summary,
            temperature: response.data.daily.data[i].temperature,
            icon_path: require('@/assets/img/icons-weather/' + response.data.daily.data[i].icon + '.png')
          })
        }

        Object.assign(WeatherDatesinCity, data)
      })
    })

    return { cityCurrent, WeatherDatesinCity }
  }
}
</script>

<style></style>