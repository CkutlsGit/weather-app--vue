<template>
  <div>
    <header-component></header-component>
    <weather-component></weather-component>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import WeatherComponent from "@/components/WeatherComponent.vue";

export default {
  components: { WeatherComponent, HeaderComponent }

}
</script>

<style>

</style>