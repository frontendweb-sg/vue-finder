import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { appRoutes } from './routes/routes'

// create app instance
const app = createApp(App)

// plugins
app.use(appRoutes)
app.use(createPinia())

// mount app
app.mount('#app')
