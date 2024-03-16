import { createApp } from 'vue'
import App from './App.vue'
import mitt from "mitt";

import '@/assets/css/tailwind/tailwind.css'
import '@/assets/css/global.css'

const app = createApp(App)

export const eventBus = mitt()

app.mount('#app')
app.provide(eventBus)
