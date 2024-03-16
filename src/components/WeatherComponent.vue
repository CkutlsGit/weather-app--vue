<template>
  <main class="weather">
    <div class="weather__content">
      <weathercurrent-component :city="cityCurrent"></weathercurrent-component>
      <weatherfuture-component :city="cityCurrent"></weatherfuture-component>
    </div>
  </main>
</template>

<script>
import WeathercurrentComponent from "@/components/weather/WeathercurrentComponent.vue";
import WeatherfutureComponent from "@/components/weather/WeatherfutureComponent.vue";

import { ref, onMounted } from "vue";
import { GetCookie } from "../../composables/CookieStorage";
import {eventBus} from "@/main";
export default {
  components: {WeatherfutureComponent, WeathercurrentComponent },
  setup() {
    const cityCurrent = ref('')

    onMounted(() => {
      if (GetCookie('currentcity')) {
        cityCurrent.value = GetCookie('currentcity')
      }
      eventBus.on('getcity', (cityUpdate) => {
        cityCurrent.value = cityUpdate
      })
    })

    return { cityCurrent }
  }
}
</script>

<style>

</style>