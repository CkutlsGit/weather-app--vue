<template>
  <div class="weather-current">
    <h1 class="text-white">{{ cityCurrent }}</h1>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import {eventBus} from "@/main";

export default {
  props: ['city'],
  setup(props) {
    const cityCurrent = ref('')

    watch(() => props.city, (newValue) => {
      cityCurrent.value = newValue
    })

    onMounted(() => {
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