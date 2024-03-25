<template>
  <div>
    <weather-weathercurrent-component/>
    <weather-weatherfuture-component/>
  </div>
</template>

<script setup>
  import { GetCookie } from "assets/js/CookieStorage.js";

  const cityCurrent = ref('')
  const { $bus } = useNuxtApp()

  onMounted(() => {
    if (GetCookie('currentCity')) {
      cityCurrent.value = GetCookie('currentCity')

      $bus.emit('sendCityValue', cityCurrent.value)
    }
    $bus.on('getCity', (cityUpdate) => {
      cityCurrent.value = cityUpdate

      $bus.emit('sendCityValue', cityCurrent.value)
    })
  })
</script>

<style scoped>

</style>