<template>
  <div v-if="cityCurrent !== ''" class="weather-future">
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

<script setup>
  const cityCurrent = ref('')
  let WeatherDatesinCity = reactive({})

  const { $bus } = useNuxtApp()

  onMounted(() => {
    $bus.on('sendCityValue',async (cityValue) => {
      cityCurrent.value = cityValue
      const data = await $fetch(`/api/weather/getfutureweather?city=${ cityValue }`)
      let datesArray = []

      for (let i = 0; i < 7; i++) {
        datesArray.push({
          id: i,
          date: data.daily.data[i].day,
          temperature: data.daily.data[i].temperature.toFixed(0),
          icon_path: `icons-weather/${data.daily.data[i].icon}.png`
        })
      }

      WeatherDatesinCity = Object.assign(WeatherDatesinCity, datesArray)
    })
})
</script>

<style scoped>
</style>