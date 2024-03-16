<template>
  <div>
    <header-component></header-component>
    <weather-component></weather-component>
    <footer-component></footer-component>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import WeatherComponent from "@/components/WeatherComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: { FooterComponent, WeatherComponent, HeaderComponent }

}
</script>

<style>

</style>