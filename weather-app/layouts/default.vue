<template>
  <div v-show="!isLoaded" class="absolute left-1/2 -translate-x-1/2 top-1/4">
    <div class="loader w-14 h-14"></div>
  </div>
  <div v-show="isLoaded">
    <header-component/>
    <div>
      <weather-component/>
      <slot></slot>
    </div>
    <footer-component/>
  </div>
</template>

<script setup>
  const isLoaded = ref(false)

  setTimeout(() => {
    isLoaded.value = true
  }, 900)

</script>

<style scoped>
.loader {
  border-radius: 50%;
  background: conic-gradient(#0000 10%,#474bff);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 9px),#000 0);
  animation: loader-animation 1s infinite linear;
}
@keyframes loader-animation {
  to {
    transform: rotate(1turn);
  }
}
</style>