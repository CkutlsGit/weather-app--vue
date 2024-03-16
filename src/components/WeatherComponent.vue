<template>
  <main class="weather">
    <div class="weather__content">
      <weathercurrent-component v-if="cityCurrent" :city="cityCurrent"></weathercurrent-component>
      <weatherfuture-component v-if="cityCurrent" :city="cityCurrent"></weatherfuture-component>
    </div>
  </main>
</template>

<script>
import WeathercurrentComponent from "@/components/weather/WeathercurrentComponent.vue";
import WeatherfutureComponent from "@/components/weather/WeatherfutureComponent.vue";

import { ref, onMounted } from "vue";
import { GetCookie } from "../../composables/CookieStorage";
export default {
  components: {WeatherfutureComponent, WeathercurrentComponent },
  setup() {
    const cityCurrent = ref('')

    onMounted(() => {
      if (GetCookie('currentcity')) {
        cityCurrent.value = GetCookie('currentcity')
      }
    })

    return { cityCurrent }
  }
}
</script>

<style>

</style>