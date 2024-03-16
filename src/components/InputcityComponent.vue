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

<script>
import { ref } from 'vue'
import { GetCityName } from "../../composables/CityAPI";
import { SetCookie } from "../../composables/CookieStorage";
import {eventBus} from "@/main";

export default {
  setup(props, { emit }) {
    const cityName = ref('')
    const correctCityId = ref('')


    function closeInput() {
      emit('closeinput')
    }
    async function clickSubmitBtn() {
      if (cityName.value !== '') {
        const response = await GetCityName(cityName.value)
        correctCityId.value = response.data[0].place_id

        SetCookie('currentcity', correctCityId.value)

        eventBus.emit('getcity', correctCityId.value)
      }
    }

    return { cityName, clickSubmitBtn, correctCityId, closeInput }
  }
}
</script>

<style>

</style>