<template>
  <div class="weather-future">
    <div class="weather-future__content">
      <h2>{{ cityCurrent }}</h2>
      <ul>
        <li v-for="weatherDate in WeatherDatesinCity" :key="weatherDate.id">
          <h2>{{ weatherDate.date }}</h2>
          <div class="weather-info">
            <img :src="weatherDate.icon_path" alt="weather">
            <h2>{{ weatherDate.temperature }}</h2>
          </div>
        </li>
      </ul>
    </div>
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
    let WeatherDatesinCity = reactive({})

    watch(() => props.city, async newValue => {
      cityCurrent.value = newValue
      const response = await GetDatesWeather(newValue)

      let data = []

      for (let i = 0; i < 7; i++) {
        data.push({
          id: i,
          date: response.data.daily.data[i].day,
          temperature: response.data.daily.data[i].temperature.toFixed(0),
          icon_path: require('@/assets/img/icons-weather/' + response.data.daily.data[i].icon + '.png')
        })
      }

      WeatherDatesinCity = Object.assign(WeatherDatesinCity, data)
      console.log(WeatherDatesinCity)
    })

    onMounted(() => {
      eventBus.on('getcity', async (cityUpdate) => {
        cityCurrent.value = cityUpdate
        const response = await GetDatesWeather(cityUpdate)

        let data = []

        for (let i = 0; i < 7; i++) {
          data.push({
            id: i,
            date: response.data.daily.data[i].day,
            temperature: response.data.daily.data[i].temperature.toFixed(0),
            icon_path: require('@/assets/img/icons-weather/' + response.data.daily.data[i].icon + '.png')
          })
        }

        WeatherDatesinCity = Object.assign(WeatherDatesinCity, data)
      })
    })

    return { cityCurrent, WeatherDatesinCity }
  }
}
</script>

<style></style>