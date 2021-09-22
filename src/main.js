import { createApp } from 'vue'
import VueFeather from 'vue-feather'

import App from './App.vue'
import router from './router'
import store from './store'
import TheHeader from './components/TheHeader.vue'
import Button from './components/UI/Button.vue'
import Card from './components/UI/Card.vue'
import TheSider from './components/TheSider.vue'
import AppPopup from './components/UI/Popup.vue'

const app = createApp(App)

app.component('the-header', TheHeader)
app.component('base-button', Button)
app.component('base-card', Card)
app.component('the-sider', TheSider)
app.component('popup', AppPopup)

app.component(VueFeather.name, VueFeather)

app.use(store)
app.use(router)
app.mount('#app')
