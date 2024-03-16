<template>
  <div v-if="city" class="weather-future">
    <div class="weather-future__content flex justify-center w-8/12 bg-dark-blue rounded-md mx-auto py-2 max-xl:w-10/12 max-lg:w-4/12">
      <ul class="flex text-base text-white max-lg:flex-col max-sm:text-sm">
        <li v-for="weatherDate in WeatherDatesinCity" :key="weatherDate.id" class="mx-12 max-lg:my-2">
          <h2 class="my-2 max-sm:text-xs">{{ weatherDate.date }}</h2>
          <div class="weather-info flex flex-col justify-center text-center">
            <img class="mx-auto" :src="weatherDate.icon_path" alt="weather">
            <h2 class="font-medium my-2">{{ weatherDate.temperature }} °C</h2>
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