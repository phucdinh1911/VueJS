import './assets/main.css'
import './icons/boxicons-2.1.4/css/boxicons.min.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
