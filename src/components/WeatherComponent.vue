<template>
  <main class="weather">
    <div class="weather__content">
      <weathercurrent-component :city="cityCurrent"></weathercurrent-component>
    </div>
  </main>
</template>

<script>
import WeathercurrentComponent from "@/components/weather/WeathercurrentComponent.vue";
import { ref, onMounted } from "vue";
import { GetCookie } from "../../composables/CookieStorage";
export default {
  components: { WeathercurrentComponent },
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