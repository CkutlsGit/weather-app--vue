<template>
  <div class="input-city absolute left-1/2 -translate-x-1/2 top-48 bg-dark-blue text-white rounded-md w-96 h-48 max-sm:w-48 max-sm:h-24">
    <div class="input-city__content flex flex-col">
      <button
          class="text-right px-5 py-3 capitalize text-red-600 font-medium hover:text-red-400 ease-in duration-300"
          @click="closeInput"
      >
        close
      </button>
      <input type="text" v-model="cityName" class="bg-gray-500 font-medium rounded-md">
      <button
          class="my-5 px-5 py-2 bg-emerald-800 rounded-md capitalize font-medium hover:bg-emerald-500 ease-in duration-300"
          @click="clickSubmitBtn"
      >
        submit
      </button>
    </div>
  </div>
</template>

<script setup>
  import { SetCookie } from "assets/js/CookieStorage.js";

  const cityName = ref('')
  const correctCityId = ref('')
  const { $bus } = useNuxtApp()

  function closeInput() {
    $bus.emit('closeInput')
  }

  async function clickSubmitBtn() {
    if (cityName.value !== '') {
      const data = await $fetch(`/api/getcity/${ cityName.value }`)
      correctCityId.value = data[0].place_id

      SetCookie('currentCity', correctCityId.value)
      $bus.emit('getCity', correctCityId.value)
    }
  }
</script>

<style scoped>

</style>