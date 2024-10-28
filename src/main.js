import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

if (process.env.NODE_ENV === 'development') {
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
}

app.use(createPinia())
app.use(router)

app.mount('#app')
