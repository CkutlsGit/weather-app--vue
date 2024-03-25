<template>
  <div v-if="cityCurrent !== ''" class="weather-current flex justify-center">
    <div class="weather-current__content bg-dark-blue text-center text-white my-16 w-2/12 rounded-md max-sm:w-6/12">
      <h2 class="text-lg font-bold capitalize my-2">{{ cityCurrent }}</h2>
      <div class="weather-current__info flex flex-col justify-center text-base font-medium">
        <img class="mx-auto w-12 h-12" :src="imgSrc" :alt="WeatherinCity.summary">
        <h2 class="mt-1">{{ WeatherinCity.summary }}</h2>
        <h2 class="my-2">{{ WeatherinCity.temperature }} °C</h2>
      </div>
    </div>
  </div>
  <div v-else class="text-white text-2xl font-bold text-center w-96 bg-dark-blue rounded-md py-6 px-6 mx-auto my-24 max-sm:w-52 max-sm:text-xl">Choose a Location to receive data</div>
</template>

<script setup>
  const { $bus } = useNuxtApp()
  const cityCurrent = ref('')
  const WeatherinCity = reactive({
    summary: '',
    temperature: '',
    icon_num: ''
  })
  const imgSrc = ref('')

  onMounted(() => {
    $bus.on('sendCityValue',async (cityValue) => {
      cityCurrent.value = cityValue
      const data = await $fetch(`/api/weather/getcurrentweather?city=${ cityValue }`)
      console.log(data)

      WeatherinCity.summary = data.current.summary
      WeatherinCity.temperature = data.current.temperature.toFixed(0)
      WeatherinCity.icon_num = data.current.icon_num

      // imgSrc.value = require('@/assets/img/icons-weather' + WeatherinCity.icon_num + '.png')
    })
  })
</script>

<style scoped>

</style>