<template>
  <header class="header bg-dark-blue">
    <div class="header__content flex justify-between items-center px-16 py-8 text-white max-sm:flex-col">
      <div class="header__logo">
        <h1 class="capitalize text-2xl max-sm:my-2">weather vue</h1>
      </div>
      <div class="header__location">
        <button
            class="text-xl bg-cyan-900 px-2 py-2 rounded-md hover:text-gray-400 ease-in duration-300 max-sm:px-1 max-sm:py-1 max-sm:text-lg"
            @click="clickBtn = true"
            v-if="cityId === ''"
        >
          Choose a Location
        </button>
        <h1 @click="clickBtn = true" class="text-xl bg-cyan-900 px-2 py-2 rounded-md hover:text-gray-400 ease-in duration-300 max-sm:px-1 max-sm:py-1 max-sm:text-lg capitalize cursor-pointer">{{ cityId }}</h1>
      </div>
    </div>
  </header>
  <inputcity-component v-if="clickBtn" @closeinput="closeInput" @getcity="getCityId"></inputcity-component>
</template>

<script>
import InputcityComponent from "@/components/InputcityComponent.vue";

import { ref, onMounted } from 'vue'
import { GetCookie } from "../../composables/CookieStorage";

export default {
  components: { InputcityComponent },
  setup() {
    const clickBtn = ref(false)
    const cityId = ref('')

    onMounted(() => {
      if(GetCookie('currentcity')) {
        cityId.value = GetCookie('currentcity')
      }
    })

    function closeInput() {
      clickBtn.value = false
    }

    function getCityId(cityIdGet) {
      cityId.value = cityIdGet
      clickBtn.value = false
      console.log(cityId.value)
    }

    return { clickBtn, cityId,closeInput, getCityId }
  }
}
</script>

<style>

</style>